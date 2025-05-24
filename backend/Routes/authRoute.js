
import { Router } from 'express';
import signUpController from '../Controllers/authController/signup.js';
import loginController from '../Controllers/authController/login.js';
import logoutController from '../Controllers/authController/logout.js';
import verifyUser from '../Controllers/authController/verifyUser.js';


const router = Router();


router.post('/signup', signUpController);
router.post('/login', loginController);
router.post('/logout', logoutController);
router.get('/verify', verifyUser);


export default router;