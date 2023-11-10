import express from 'express';
const router = express.Router();
import * as user_controller from '../controllers/user_controller.js';
import passport from 'passport';

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
