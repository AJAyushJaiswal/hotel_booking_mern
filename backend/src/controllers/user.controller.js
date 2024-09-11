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
    const refreshToken = await user.generateRefreshToken();
    
    if(!accessToken){
        throw new ApiError(500, "Error generating access token!");
    }
    
    if(!refreshToken){
        throw new ApiError(500, "Error generating refresh token!");
    } 
    
    user.refreshToken = refreshToken;
    const saveResult = await user.save();
    
    if(!saveResult){
        throw new ApiError(500, "Error saving the refresh token in the database!");
    }
    
    return {accessToken, refreshToken}
};


const registerUser = asyncHandler(async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body;
    
    if([firstName, lastName, email, password].some(field => field?.trim() == '')){
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
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: true
    }
    
    res.status(201)
    .cookie("accessToken", accessToken, {...options, maxAge: accessTokenMaxAge})
    .cookie("refreshToken", refreshToken, {...options, maxAge: refreshTokenMaxAge})
    .json(new ApiResponse(201, {user, accessToken, refreshToken}, "User registered successfully!"));
});


export {
    registerUser
}