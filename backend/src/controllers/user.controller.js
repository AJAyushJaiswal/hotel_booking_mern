import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';


const accessTokenMaxAge = 30 * 60 * 1000;
const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000;


const generateAccessAndRefreshTokens = async function(userId){
    const user = await User.findById(userId);
    
    if(!user){
        throw new ApiError(500, "User not found!");
    }
    
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    
    if(!accessToken){
        throw new ApiError(500, "Error generating access token!");
    }
    
    if(!refreshToken){
        throw new ApiError(500, "Error generating refresh token!");
    } 
    
    return {accessToken, refreshToken};
}


const registerUser = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;
    
    if([firstName, lastName, email, password].some(field => !field?.trim())){
        throw new ApiError(400, "All fields are required!");
    }
    
    const userExists = await User.exists({email});     
    if(userExists){
        throw new ApiError(403, "User with this email already exists!");
    }
    
    const user = await User.create({firstName, lastName, email, password});    

    if(!user){
        throw new ApiError(500, "Error registering the user!");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
    
    delete user._doc.password;
    delete user._doc.__v;
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    }
    
    res.status(201)
    .cookie("accessToken", accessToken, {...options, maxAge: accessTokenMaxAge})
    .cookie("refreshToken", refreshToken, {...options, maxAge: refreshTokenMaxAge})
    .json(new ApiResponse(201, {user, accessToken, refreshToken}, "User registered successfully!"));
});



const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    
    if(!email?.trim()){
        throw new ApiError(400, "Email is required!");
    }

    if(password?.trim()){
        throw new ApiError(400, "Password is required!");
    }

    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(401, "Invalid credentails!");        
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid credentials!");
    }
    
    const {accessToken, refreshToken} = generateAccessAndRefreshTokens(user._id);   
    
    delete user._doc.password;
    delete user._doc.__v;
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    }

    res.status(200)
    .cookie("accessToken", accessToken, {...options, maxAge: accessTokenMaxAge})
    .cookie("refreshToken", refreshToken, {...options, maxAge: refreshTokenMaxAge})
    .json(new ApiResponse(200, {user, accessToken, refreshToken}));
})



const logoutUser = asyncHandler(async (req, res) => {
    const result = await User.updateOne({_id: req.user.id}, {$unset: {refreshToken: 1}}); 

    if(result.modifiedCount === 0){
        throw new ApiError(500, "Error logging out!");
    }
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    }
    
    res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully!"));
})



const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    
    if(!incomingRefreshToken.trim()){
        throw new ApiError(401, "Unauthorised request!");
    }
    
    try{
        const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        if(!decodedRefreshToken){
            throw new ApiError(403, "Invalid refresh token!");
        }
        
        const user = await User.findById(decodedRefreshToken._id).select('-__v -password').lean();

        if(!user || user.refreshToken !== incomingRefreshToken){
            throw new ApiError(403, "Invalid refresh token!");
        }
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);
        
        delete user._doc.refreshToken;
        
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        }
        
        res.status(200)
        .cookie("accessToken", accessToken, {...options, maxAge: accessTokenMaxAge})
        .cookie("refreshToken", refreshToken, {...options, maxAge: refreshTokenMaxAge})
        .json(new ApiResponse(200, {user, accessToken, refreshToken}), "Access token refreshed successfully!");
    }
    catch(error){
        if(error instanceof jwt.TokenExpiredError){
            throw new ApiError(403, "Invalid refresh token!");            
        }
        else if(error instanceof jwt.JsonWebTokenError){
            throw new ApiError(403, "Invalid refresh token!");
        }

        throw new ApiError(error?.statusCode || 500, error?.message || "Error refreshing access token!");
    }
    
})



export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}