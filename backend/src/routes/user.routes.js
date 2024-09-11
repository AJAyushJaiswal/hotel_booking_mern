import {Router} from 'express';
import {registerUser, loginUser, logoutUser, refreshAccessToken} from '../controllers/user.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/refresh').post(refreshAccessToken);


router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);


export default router;