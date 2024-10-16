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
        .isString().withMessage('Name must be a string!')
        .trim()
        .isLength({
            min: 5,
            max: 30
        }).withMessage('Name must be in the range of 5-30 characters!'),

        body('description')
        .isString().withMessage('Description must be a string!')
        .trim()
        .isLength({
            min: 10,
            max: 300
        }).withMessage('Description must be in the range of 5-30 characters!'),

        body('type')
        .notEmpty().withMessage('Room type is required!')
        .isString().withMessage('Room type must be a string!'),

        body('pricePerNight')
        .isInt({min: 0}).withMessage('Price per night must be a postive integer!'),

        body('totalQuantity')
        .isInt({min: 1}).withMessage('Total no. of rooms must be a positive integer greater than 0!'),

        body('roomNumbersList')
        .isArray().withMessage('Room Numbers list must be an array!')
        .custom((value, {req}) => {
            if(value.length !== Number.parseInt(req.body.totalQuantity)){
                throw new Error('No. of rooms in room numbers list must match total no. of rooms field!');
            }
            
            return true;
        }),
        
        body('roomNumbersList.*')
        .isInt({min: 0}).withMessage('Room Number must be an positive integer!'),

        body('capacityPerRoom')
        .notEmpty().withMessage('Capacity per room is required!')
        .custom(value => {
            console.log(value, typeof value);
            const obj = JSON.parse(value);
            console.log(obj, typeof obj);
            if(typeof obj !== 'object'){
                throw new Error('Capacity per room should be an object!');
            }
        }),
        
        body('facilities')
        .optional()
        .isArray().withMessage('Facilities must be an array!'),

        body('facilties.*')
        .isString().withMessage('Facility must be a string!')
    ],
    addRoom
);


export default router;