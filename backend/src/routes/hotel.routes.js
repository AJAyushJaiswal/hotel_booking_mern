import {Router} from 'express';
import {createHotel} from '../controllers/hotel.controller.js';
import {body} from 'express-validator';



const router = Router();


router.route('/add').post(verifyAccessToken, [
    body('name')
    .notEmpty().withMessage('Hotel name is required!'),

    body('address')
    .isLength({max: 50}).withMessage('Address can\'t be more than 50 characters!'),

    body('city')
    .notEmpty().withMessage('City name is required!'),

    body('country')
    .isIn(['India', 'Sri Lanka', 'US', 'UK', 'Japan', 'South Korea', 'UAE', 'Egypt', 'South Africa', 'Maldives', 'Bahamas']).withMessage('Invalid option! Select from the listed countries'),

    body('type')
    .isIn(['budget', 'boutique', 'luxury', 'resort', 'apartment', 'spa', 'vacation', 'business', 'hostel']).withMessage('Invalid option! Select from the listed hotel types'),

    body('description')
    .isLength({max: 200}).withMessage('Description can\'t be more than 200 characters!'),

    body('starRating')
    .isIn([1, 2, 3, 4, 5]).withMessage('Star rating can only be an integer in range of 1-5!')
    .optional(),

    body('contactNo').notEmpty(),

    body('email')
    .isEmail().withMessage('Invalid email format!')
    .optional(),

    body('facilities').notEmpty()
], createHotel);



export default router;