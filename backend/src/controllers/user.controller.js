import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js';



const accessTokenMaxAge = 30 * 60 * 1000;
const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000;


const generateAccessAndRefreshTokens = async function(userId){
    const user = await User.findById(userId);
    
    if(!user){
        throw new ApiError(500, "User not found!");
    }
    
    const accessToken = await user.generateAccessToken();
    const refreshedUser = await user.generateRefreshToken();
    
    if(!accessToken){
        throw new ApiError(500, "Error generating access token!");
    }
    
    if(!refreshedUser){
        throw new ApiError(500, "Error generating refresh token!");
    } 
    
    return {accessToken, refreshedUser};
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

    const {accessToken, refreshedUser} = await generateAccessAndRefreshTokens(user._id);
    
    const refreshToken = refreshedUser.refreshToken;
    
    delete refreshedUser._doc.password;
    delete refreshedUser._doc.__v;
    delete refreshedUser._doc.refreshToken;
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    }
    
    res.status(201)
    .cookie("accessToken", accessToken, {...options, maxAge: accessTokenMaxAge})
    .cookie("refreshToken", refreshToken, {...options, maxAge: refreshTokenMaxAge})
    .json(new ApiResponse(201, {user: refreshedUser, accessToken, refreshToken}, "User registered successfully!"));
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
    
    const {accessToken, refreshedUser} = generateAccessAndRefreshTokens(user._id);   
    const refreshToken = refreshedUser.refreshToken;
    
    delete refreshedUser._doc.password;
    delete refreshedUser._doc.__v;
    delete refreshedUser._doc.refreshToken;
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    }

    res.status(200)
    .cookie("accessToken", accessToken, {...options, maxAge: accessTokenMaxAge})
    .cookie("refreshToken", refreshToken, {...options, maxAge: refreshTokenMaxAge})
    .json(new ApiResponse(200, {user:refreshedUser, accessToken, refreshToken}));
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



export {
    registerUser
}