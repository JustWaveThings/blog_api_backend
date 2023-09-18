import User from '../models/users';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

export const index1 = asyncHandler(async (req, res, next) => {
  res.json({ title: 'user Overview' });
});

export const index2 = asyncHandler(async (req, res, next) => {
  res.json({ title: 'user Overview 2' });
});
