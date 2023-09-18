import Post from '../models/posts';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

// get all posts overview (no body, just metadata)
export const post_list_overview = asyncHandler(async (req, res) => {
  res.json({ title: 'Post List Overview' });
});

// get single post (with body and comments)

export const post_detail = asyncHandler(async (req, res) => {
  res.json({ title: 'Post Detail' });
});

// create post

export const create_post = asyncHandler(async (req, res) => {
  res.json({ title: 'Create Post' });
});

// update post

export const update_post = asyncHandler(async (req, res) => {
  res.json({ title: 'Update Post' });
});

// delete post

export const delete_post = asyncHandler(async (req, res) => {
  res.json({ title: 'Delete Post' });
});
