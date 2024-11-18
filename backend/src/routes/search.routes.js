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
        .isInt({min: 1}).withMessage('Page number must be an integer greater than 1!')
    ],
    searchHotelRooms
);

router.route('/h/:hotelId').get(getHotel);


export default router;