import {ApiError} from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
    if(process.env.NODE_ENV !== 'production'){
        console.log(err);        
    }

    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors
        });
    }
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error!",
        errors: []
    });
}

export {errorHandler}