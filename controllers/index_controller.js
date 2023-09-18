/* GET home page. */
import asyncHandler from 'express-async-handler';

export const index = asyncHandler(async (req, res, next) => {
  res.json({ title: 'homepage Overview' });
});

export const index2 = asyncHandler(async (req, res, next) => {
  res.json({ title: 'homepage Overview 2' });
});
