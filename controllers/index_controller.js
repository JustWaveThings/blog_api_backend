/* GET home page. */
import asyncHandler from 'express-async-handler';

export const index = asyncHandler(async (req, res, next) => {
  res.json({ title: 'Blog API Backend lalalalala' });
});
