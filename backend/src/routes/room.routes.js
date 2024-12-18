import {Router} from 'express';
import {verifyAccessToken} from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';
import {validateImage} from '../middlewares/fileImageValidation.middleware.js';
import {body} from 'express-validator';
import {addRoom, deleteRoom, getAllHotelRooms, getHotelRoom, updateRoom} from '../controllers/room.controller.js';


const router = Router();

router.use(verifyAccessToken);

router.route('/h/:hotelId')
.get(getAllHotelRooms)
.post(
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

        body('bedType')
        .notEmpty().withMessage('Bed type is required!')
        .isString().withMessage('Bed type must be a string!'),

        body('bedCount')
        .isInt({min: 1}).withMessage('Bed count must be a positive integer!'),

        body('pricePerNight')
        .isDecimal({min: 0}).withMessage('Price per night must be a postive integer(can be 0)!'),
        
        body('view')
        .isString().withMessage('View must be a string!')
        .trim()
        .isLength({
            min: 7,
            max: 20
        }).withMessage('View must be in the range of 8-20 characters!'),
        
        body('roomSize')
        .isDecimal({min: 1}).withMessage('Room size must at least be 1 square meter!'),

        body('totalQuantity')
        .isInt({min: 1}).withMessage('Total no. of rooms must be a positive integer greater than 0!'),

        body('roomNumbers')
        .isArray().withMessage('Room Numbers list must be an array!')
        .custom((value, {req}) => {
            if(value.length !== Number.parseInt(req.body.totalQuantity)){
                throw new Error('Room numbers array must match value in total no. of rooms field!');
            }
            
            return true;
        }),
        
        body('roomNumbers.*')
        .isInt({min: 0}).withMessage('Every Room Number must be an positive integer!'),
        
        body('adults')
        .isInt({min: 1}).withMessage('Adult capacity must be a positive integer greater than 0'),

        body('children')
        .isInt({min: 0}).withMessage('Child capacity must be a positive integer greater including 0'),

        body('facilities')
        .optional()
        .isArray().withMessage('Facilities must be an array!'),

        body('facilities.*')
        .isString().withMessage('Facility must be a string!')
    ],
    addRoom
);


router.route('/h/:hotelId/r/:roomId')
.get(getHotelRoom)
.put(
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

        body('bedType')
        .notEmpty().withMessage('Bed type is required!')
        .isString().withMessage('Bed type must be a string!'),

        body('bedCount')
        .isInt({min: 1}).withMessage('Bed count must be a positive integer!'),

        body('pricePerNight')
        .isDecimal({min: 0}).withMessage('Price per night must be a postive integer(can be 0)!'),
        
        body('view')
        .isString().withMessage('View must be a string!')
        .trim()
        .isLength({
            min: 7,
            max: 20
        }).withMessage('View must be in the range of 8-20 characters!'),
        
        body('roomSize')
        .isDecimal({min: 1}).withMessage('Room size must at least be 1 square meter!'),

        body('totalQuantity')
        .isInt({min: 1}).withMessage('Total no. of rooms must be a positive integer greater than 0!'),

        body('roomNumbers')
        .isArray().withMessage('Room Numbers list must be an array!')
        .custom((value, {req}) => {
            if(value.length !== Number.parseInt(req.body.totalQuantity)){
                throw new Error('Room numbers array must match value in total no. of rooms field!');
            }
            
            return true;
        }),
        
        body('roomNumbers.*')
        .isInt({min: 0}).withMessage('Every Room Number must be an positive integer!'),
        
        body('adults')
        .isInt({min: 1}).withMessage('Adult capacity must be a positive integer greater than 0'),

        body('children')
        .isInt({min: 0}).withMessage('Child capacity must be a positive integer greater including 0'),

        body('facilities')
        .optional()
        .isArray().withMessage('Facilities must be an array!'),

        body('facilities.*')
        .isString().withMessage('Facility must be a string!'),

        body('imagesUrls')
        .optional()
        .isArray().withMessage('Image urls must be an array'),
        
        body('imageUrls.*')
        .isString().withMessage('Every image url must be a string!')
    ],
    updateRoom
)
.delete(deleteRoom);


export default router;