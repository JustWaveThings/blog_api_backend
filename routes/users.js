import express from 'express';
const router = express.Router();
import * as user_controller from '../controllers/user_controller.js';

// create user

router.post('/signup', user_controller.create_user);

// login user

router.post('/login', user_controller.login_user);

// redirect to login page

router.get('/login', user_controller.redirect_to_login);

// logout user

router.delete('/logout', user_controller.logout_user);

export default router;
