import express from 'express';
import * as user_controller from '../controllers/user_controller.js';
const router = express.Router();
import passport from 'passport';
import '../utils/passport';

// create user

router.post('/signup', user_controller.create_user);

// login user

router.post(
  '/login',
  passport.authenticate('local'),
  user_controller.login_user
);

// logout user

router.delete('/logout', user_controller.logout_user);

export default router;
