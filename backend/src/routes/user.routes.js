import {Router} from 'express';
import {registerUser, loginUser, logoutUser, refreshAccessToken, validateToken} from '../controllers/user.controller.js';
import {verifyAccessToken} from '../middlewares/auth.middleware.js';
import {body} from 'express-validator';


const router = Router();

router.route('/register').post([
        body('firstName')
        .isString().withMessage('Firstname must be a string!')
        .trim()
        .isLength({ min: 2 }).withMessage('Firstname must be at least 2 characters long!')
        .matches(/^[A-Za-z]+$/).withMessage('Firstname must contain only alphabetic characters!'),

        body('lastName')
        .isString().withMessage('Lastname must be a string!')
        .trim()
        .isLength({ min: 2 }).withMessage('Lastname must be at least 2 characters long!')
        .matches(/^[A-Za-z]+$/).withMessage('Lastname must contain only alphabetic characters!'),

        body('email')
        .isString().withMessage('Email must be a string!')
        .trim()
        .isEmail().withMessage('Invalid email format!'),

        body('password')
        .isString().withMessage('Password must be a string!')
        .trim()
        .isLength({min: 8}, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/).withMessage('Password must contain at least a uppercase letter, a lowercase letter, a number, and a special character!')
], registerUser);
    
router.route('/token').post(refreshAccessToken);


router.route('/login').post([
        body('email')
        .isString().withMessage('Email must be a string!')
        .trim()
        .isEmail().withMessage('Invalid email format!'),

        body('password')
        .isString().withMessage('Password must be a string!')
        .trim()
        .isLength({min: 8}, 'Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/).withMessage('Password must contain at least a uppercase letter, a lowercase letter, a number, and a special character!')
], loginUser);

router.route('/logout').post(verifyAccessToken, logoutUser);

router.route('/validate_token').get(verifyAccessToken, validateToken);


export default router;