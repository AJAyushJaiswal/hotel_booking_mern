import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import {User} from "../models/user.model.js";


const verifyAccessToken = asyncHandler(async (req, _, next) => {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
    if(!accessToken){
        throw new ApiError(401, "Unauthorised request!");
    }
   
    try{
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if(!decodedAccessToken){
            throw new ApiError(401, "Unauthorised request!");
        }
        
        const user = await User.findById(decodedAccessToken._id).select('-password -refreshToken -__v');
        if(!user){
            throw new ApiError(401, "Unauthorised request!");            
        }
        
        req.user = user;
        next();
    }
    catch(error){
        console.log(error);
        if(error instanceof jwt.TokenExpiredError){
            if(process.env.NODE_ENV !== 'production'){
                console.log("Access token expired!");
            }
        }
        else if(error instanceof jwt.JsonWebTokenError){
            if(process.env.NODE_ENV !== 'production'){
                console.log("Invalid access token!");
            }
        }
        throw new ApiError(401, "Unauthorised request!");
    }
});


export {verifyAccessToken}