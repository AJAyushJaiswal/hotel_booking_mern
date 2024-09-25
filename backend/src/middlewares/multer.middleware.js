import multer from 'multer';
import {v4 as uuidv4} from 'uuid';


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, './public/temp');
    }
});


export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});