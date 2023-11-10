/* eslint-disable no-dupe-keys */
import User from '../models/users';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import '../utils/passport';

// create user
export const create_user = [
  // validate and sanitize fields
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const userExists = await User.findOne({
      username: req.body.username,
    }).exec();

    if (!errors.isEmpty()) {
      return res.json({ errors });
    }
    if (userExists) {
      return res.json({ message: 'User already exists.' });
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      try {
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
        });
        const db = await user.save();
        return res.json({
          message: `User - ${db.username} created successfully`,
        });
      } catch (err) {
        next(err);
      }
    });
  }),
];

// login user
export const login_user = function (req, res, next) {
  // log out a user if logged in so frontend and backend are in sync
  if (req.user) {
    req.logout(err => {
      if (err) {
        return next(err);
      }
    });
  }
  // return success status if
  res.status(200).json({ message: 'Login successful' });
  next();
};

// logout user
export function logout_user(req, res, next) {
  req.logout(err => {
    if (err) {
      return next(err);
    }
  });
  res.status(200).json('Logout successful');
}

// redirect to login page

export const redirect_to_login = (req, res) => {
  res.redirect('/');
};
