import User from '../models/users';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import '../utils/passport';
// create user

export const create_user = [
  // validate and sanitize fields
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),
  body('admin').trim().isBoolean().escape(),

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

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      admin: true,
    });
    const db = await user.save();
    return res.json({ message: `User - ${db.username} created successfully` });
  }),
];

// login user

export const login_user = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  });

  res.json({
    message: `login user route hit successfully`,
  });
});

// logout user

export const logout_user = asyncHandler(async (req, res, next) => {
  res.json({
    message: `logout user route hit successfully`,
  });
});
