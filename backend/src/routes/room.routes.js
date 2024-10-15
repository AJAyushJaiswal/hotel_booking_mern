import {Router} from 'express';
import {verifyAccessToken} from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
import {validateImage} from '../middlewares/fileImageValidation.middleware.js';
import {body} from 'express-validator';
import {addRoom} from '../controllers/room.controller.js';


const router = Router();

router.route('/h/:hotelId').post(
    verifyAccessToken, 
    upload.array('imageFiles', 6),
    validateImage,
    [
        body('name')
        .notEmpty().withMessage('Name is required!')
        .isLength({
            min: 5,
            max: 30
        }),

        body('description')
        .notEmpty().withMessage('Description is required!')
        .isLength({
            min: 10,
            max: 300
        }),

        body('type')
        .notEmpty().withMessage('Room type is required!'),

        body('pricePerRoom')
        .isInt({min: 0}).withMessage('Price can\'t be less than 0!'),

        body('totalQuantity')
        .isInt({min: 1}).withMessage('Total no. of rooms of can\'t be less than 1!'),

        body('roomNumbersList')
        .isArray().withMessage('Room Numbers list must be an array!')
        .custom((value, {req}) => {
            if(value.length !== req.body.totalQuantity){
                throw new Error('No. of Room Numbers must be same as total no. of rooms!');
            }
            
            return true;
        }),

        body('capacityPerRoom')
        .notEmpty().withMessage('Capacity per room is required!'),
        
        body('capacityPerRoom.adults')
        .isInt({min: 1}).withMessage('Room should have capacity for at least one adult!'),

        body('capacityPerRoom.children')
        .optional()
        .isInt({min: 0}).withMessage('Children capacity per room can\'t be negative!'),

        body('facilities')
        .optional()
        .isArray().withMessage('Facilities must be an array!'),

        body('facilties.*')
        .isString().withMessage('Every facility must be a string!')
    ],
    addRoom
);


export default router;