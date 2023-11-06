import express from 'express';
const router = express.Router();
import * as user_controller from '../controllers/user_controller.js';

// create user

router.post('/signup', user_controller.create_user);

// login user

router.post('/', user_controller.login_user);

// logout user

router.post('/logout', user_controller.logout_user);

export default router;
