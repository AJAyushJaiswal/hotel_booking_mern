import {fileTypeFromBuffer} from 'file-type';
import { ApiError } from '../utils/ApiError.js';


const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

// validating if files are images or not by checking their mimetype
const validateImage = async (req, res, next) => {
    try{
        for(let file of req.files){
            const meta = await fileTypeFromBuffer(file.buffer); 

            if(!meta || !allowedMimeTypes.includes(meta?.mime)){
                throw new ApiError(400, 'Files can only be of types - JPEG/JPG/PNG/AVIF!');
            }
        }
    }
    catch(error){
        if(error instanceof ApiError){
            return res.status(400).json({
                success: false, 
                message: error.message,
                errors: error.errors
            });
        }
        else{
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error!',
                errors: []
            });                        
        }
    }

    next();
}


export {validateImage}