import {Router} from 'express';
import {searchHotelRooms, getHotel} from '../controllers/search.controller.js';
import {query} from 'express-validator';
import {hotelTypesList} from '../constants/hotel.constants.js';


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
        
        query('searchCriteria')
        .isIn(['default', 'pricePerNightAsc', 'pricePerNightDesc', 'starRatingAsc', 'starRatingDesc']).withMessage('Invalid search criteria!'),
        
        query('minPricePerNight')
        .isDecimal({min: 1}).withMessage('Minimum price per night must be at least 1!')
        .optional(),

        query('maxPricePerNight')
        .isDecimal().withMessage('Maximum price per night must a number!')
        .optional(),

        query('sortCriteria')
        .notEmpty().withMessage('Sort criteria is required!')
        .isString().withMessage('Sort criteria must be a string!'),
            
        query('starRatings')
        .isArray().withMessage('Star ratings must be an array!')
        .optional(),
        
        query('starRatings.*')
        .isIn([0, 1, 2, 3, 4, 5]).withMessage('Star rating must be in range of 0-5!'),

        query('hotelTypes')
        .isArray().withMessage("Hotel types must be an array!")
        .optional(),

        query('hotelTypes.*')
        .isIn(hotelTypesList).withMessage("Invalid hotel type!"),

        query('roomViews')
        .isArray().withMessage("Room views must be an array!")
        .optional(),

        query('roomViews.*')
        .isString().withMessage("Room view must be a string!"),

        query('hotelFacilities')
        .isArray().withMessage("Hotel facilities must be an array!")
        .optional(),

        query('hotelFacilities.*')
        .isString().withMessage("Hotel facility must be a string!"),

        query('roomFacilities')
        .isArray().withMessage("Room facilities must be an array!")
        .optional(),

        query('roomFacilities.*')
        .isString().withMessage("Room facility must be a string!"),
    ],
    searchHotelRooms
);

router.route('/h/:hotelId').get(getHotel);


export default router;