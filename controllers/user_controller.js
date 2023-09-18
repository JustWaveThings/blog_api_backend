import User from '../models/users';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

export const get_user = asyncHandler(async (req, res, next) => {
  res.json({ title: 'get user' });
});

export const create_user = asyncHandler(async (req, res, next) => {
  res.json({ title: 'create user' });
});

export const update_user = asyncHandler(async (req, res, next) => {
  res.json({ title: 'update user' });
});
