import Post from '../models/posts';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

/* export const post_list_overview = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find({ published: true }, 'title subtitle published_timestamp updated_timestamp created_timestamp comment_count post_age').sort({ published_timestamp: -1 }).exec();
    console.log(posts);
    res.json(posts);
  } catch (err) {
    next(err);
  }
}); */

// create placeholders for all needed routes for posts

// GET all posts overview
const post_list_overview = asyncHandler(async (req, res, next) => {
  res.json('NOT IMPLEMENTED: post_list_overview');
});

export { post_list_overview };
