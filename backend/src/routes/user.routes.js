import {Router} from 'express';
import {registerUser, loginUser, logoutUser, refreshAccessToken} from '../controllers/user.controller.js';
import {verifyAccessToken} from '../middlewares/auth.middleware.js';


const router = Router();

router.route('/register').post(registerUser);
router.route('/token').post(refreshAccessToken);

router.route('/login').post(loginUser);
router.route('/logout').post(verifyAccessToken, logoutUser);


export default router;