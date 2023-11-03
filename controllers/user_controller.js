import User from '../models/users';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

// get user

export const get_user = asyncHandler(async (req, res, next) => {
  if (req.session.viewCount) {
    console.log('viewCount exists');
    req.session.viewCount++;
  } else {
    console.log('viewCount does not exist');
    req.session.viewCount = 1;
  }
  //  await req.session.save(); // save the session after updating the view count
  console.log(req.session);
  // const users = await User.find({}).select('username admin -_id').exec();
  return res.json({
    message: `login user route hit succesfully ${req.session.viewCount} times`,
  });
});

// create user

export const create_user = [
  // validate and sanitize fields
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),
  body('admin').trim().isBoolean().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const userExists = User.findOne({ username: req.body.username });

    if (!errors.isEmpty()) {
      return res.json({ errors });
    }

    if (userExists) {
      return res.json({ message: 'User already exists, update user instead' });
    }
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      admin: req.body.admin,
    });
    const db = await user.save();
    return res.json({ message: `User -${db.username} created successfully` });
  }),
];

// update user

export const update_user = [
  // validate and sanitize fields
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),
  body('admin').trim().isBoolean().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ errors });
    }
    const userExists = await User.findOne({ username: req.body.username });
    if (!userExists) {
      return res.json({ message: 'User does not exist, create user instead' });
    }
    const db = await User.findByIdAndUpdate(req.params.userid, req.body);
    return res.json({ message: `User -${db.username}- updated successfully` });
  }),
];

// login user

export const login_user = asyncHandler(async (req, res, next) => {
  console.log(req.session);
  req.session.viewCount ? req.session.viewCount++ : (req.session.viewCount = 1);
  res.json({
    message: `login user route hit succesfully ${req.session.viewCount} times`,
  });
});
