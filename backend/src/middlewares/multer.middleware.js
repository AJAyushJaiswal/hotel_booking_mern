import multer from 'multer';
import {ApiError} from '../utils/ApiError.js';


// there is not separate mime type for 'jpg'
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

const storage = multer.memoryStorage({});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: async (req, file, cb) => {
        // this fn is only useful for checking file extension as multer decides mimetype on the basis of file extension
        if(!allowedMimeTypes.includes(file.mimetype)){
            cb(new ApiError(400, 'Files can only be of types - JPEG/JPG/PNG/AVIF!'), false);
        }

        cb(null, true);
    }
});