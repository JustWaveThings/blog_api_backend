import Post from '../models/posts';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

// GET all posts overview
export const post_list_overview = asyncHandler(async (req, res) => {
  res.json({ title: 'Post List Overview' });
});
