import {Router} from 'express';
import {verifyAccessToken} from '../middlewares/auth.middleware.js';
import {createHotel} from '../controllers/hotel.controller.js';
import {body} from 'express-validator';
import {upload} from '../middlewares/multer.middleware.js';
import {validateImage} from '../middlewares/fileImageValidation.middleware.js';


const router = Router();

router.route('/add').post(
    verifyAccessToken, 
    upload.array('images', 6),
    validateImage,
    [
        body('name')
        .notEmpty().withMessage('Hotel name is required!'),

        body('address')
        .notEmpty().withMessage('Address is required!')
        .isLength({max: 50}).withMessage('Address can\'t be more than 50 characters!'),

        body('city')
        .notEmpty().withMessage('City is required!'),

        body('country')
        .isIn(['India', 'Sri Lanka', 'US', 'UK', 'Japan', 'South Korea', 'UAE', 'Egypt', 'South Africa', 'Maldives', 'Bahamas']).withMessage('Invalid country option! Select from the listed countries'),

        body('type')
        .isIn(['budget', 'boutique', 'luxury', 'resort', 'apartment', 'spa', 'vacation', 'business', 'hostel']).withMessage('Invalid hotel type! Select from the listed hotel types'),

        body('description')
        .notEmpty().withMessage('Description is required!')
        .isLength({max: 200}).withMessage('Description can\'t be more than 200 characters!'),

        body('starRating')
        .trim()
        .isIn([1, 2, 3, 4, 5, '']).withMessage('Star rating can only be an integer in range of 1-5!')
        .optional(),

        body('contactNo').notEmpty().withMessage('Contact no. is required!'),

        body('email')
        .isEmail().withMessage('Invalid email format!')
        .optional(),

        body('facilities').optional()
    ], 
    createHotel
);


export default router;