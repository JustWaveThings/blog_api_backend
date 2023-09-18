import Comments from '../models/comments';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

// create comment

export const create_comment = asyncHandler(async (req, res) => {
  res.json({ title: 'Create Comment' });
});

// update comment

export const update_comment = asyncHandler(async (req, res) => {
  res.json({ title: 'Update Comment' });
});

// delete comment (only by admin)

export const delete_comment = asyncHandler(async (req, res) => {
  res.json({ title: 'Delete Comment' });
});

// get comments for post

export const get_comments = asyncHandler(async (req, res) => {
  res.json({ title: 'Get Comments for post' });
});
