import {Router} from 'express';
import {verifyAccessToken} from '../middlewares/auth.middleware.js';
import {getMyHotels, getHotel, createHotel, updateHotel, deleteHotel} from '../controllers/hotel.controller.js';
import {body} from 'express-validator';
import {upload} from '../middlewares/multer.middleware.js';
import {validateImage} from '../middlewares/fileImageValidation.middleware.js';
import {hotelTypesList, countriesList, countryCityObjectList} from '../constants/hotel.constants.js';


const router = Router();

router.route('/').get(verifyAccessToken, getMyHotels);

router.route('/:hotelId')
.get(verifyAccessToken, getHotel)
.put(
    verifyAccessToken, 
    upload.array('imageFiles', 6),
    validateImage,
    [
        body('name')
        .notEmpty().withMessage('Hotel name is required!')
        .isLength({min: 5, max: 50}).withMessage('Name must be between 5-50 characters!'),

        body('address')
        .notEmpty().withMessage('Address is required!')
        .isLength({min: 10, max: 80}).withMessage('Address must be between 10-80 characters!'),

        body('country')
        .isIn(countriesList).withMessage('Invalid country! Select a valid option'),

        body('city')
        .isString().notEmpty().withMessage('City is required!')
        .custom((value, {req}) => {
            const country = req.body.country;
            const cities = countryCityObjectList[country];
            
            if(!cities.includes(value)){
                throw new Error('Invalid city! Select a valid option');
            }

            return true;
        }),
        
        body('type')
        .isIn(hotelTypesList).withMessage('Invalid hotel type! Select a valid option'),

        body('description')
        .notEmpty().withMessage('Description is required!')
        .isLength({min: 50, max: 300}).withMessage('Description must be between 50-200 characters!'),

        body('starRating')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Star rating can only be an integer in range of 0-5!'),

        body('contactNo').notEmpty().withMessage('Contact no. is required!'),

        body('email')
        .optional(),

        body('facilities').optional(),

        body('images').optional()
    ], 
    updateHotel
)
.delete(verifyAccessToken, deleteHotel);


router.route('/add').post(
    verifyAccessToken, 
    upload.array('imageFiles', 6),
    validateImage,
    [
        body('name')
        .notEmpty().withMessage('Hotel name is required!')
        .isLength({min: 5, max: 50}).withMessage('Name must be between 5-50 characters!'),

        body('address')
        .notEmpty().withMessage('Address is required!')
        .isLength({min: 10, max: 80}).withMessage('Address must be between 10-80 characters!'),

        body('country')
        .isIn(countriesList).withMessage('Invalid country! Select a valid option'),

        body('city')
        .isString().notEmpty().withMessage('City is required!')
        .custom((value, {req}) => {
            const country = req.body.country;
            const cities = countryCityObjectList[country];
            
            if(!cities.includes(value)){
                throw new Error('Invalid city! Select a valid option');
            }

            return true;
        }),
        
        body('type')
        .isIn(hotelTypesList).withMessage('Invalid hotel type! Select a valid option'),

        body('description')
        .notEmpty().withMessage('Description is required!')
        .isLength({min: 50, max: 300}).withMessage('Description must be between 50-200 characters!'),

        body('starRating')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Star rating can only be an integer in range of 0-5!'),

        body('contactNo').notEmpty().withMessage('Contact no. is required!'),

        body('email')
        .optional(),

        body('facilities').optional()
    ], 
    createHotel
);


export default router;