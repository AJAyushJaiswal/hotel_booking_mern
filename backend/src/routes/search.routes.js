import {Router} from 'express';
import {searchHotelRooms, getHotel} from '../controllers/search.controller.js';
import {query} from 'express-validator';


const router = Router();

router.route('')
.get(
    [
        query('location')
        .isString().withMessage('Location must be a string!'),

        query('adultCount')
        .isInt({min: 1}).withMessage('Adult count must be an integer greater than 1!'),

        query('childCount')
        .isInt({min: 0}).withMessage('Child count must be a positive integer!'),
        
        query('pageNumber')
        .isInt({min: 1}).withMessage('Page number must be an integer greater than 1!'),

        query('roomCount')
        .isInt({min: 1}).withMessage('Room count must be a positive integer!'),
        
        query('minPricePerNight')
        .isDecimal({min: 1}).withMessage('Minimum price per night must be at least 1!')
        .optional(),

        query('maxPricePerNight')
        .isDecimal().withMessage('Maximum price per night must a number!')
        .optional(),

        query('starRatings')
        .isArray().withMessage("Star ratings must be an array!")
        .optional(),

        query('hotelTypes')
        .isArray().withMessage("Hotel types must be an array!")
        .optional(),

        query('roomViews')
        .isArray().withMessage("Room views must be an array!")
        .optional(),

        query('hotelFacilities')
        .isArray().withMessage("Hotel facilities must be an array!")
        .optional(),

        query('roomFacilities')
        .isArray().withMessage("Room facilities must be an array!")
        .optional(),
    ],
    searchHotelRooms
);

router.route('/h/:hotelId').get(getHotel);


export default router;