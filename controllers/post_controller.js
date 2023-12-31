import Post from '../models/posts.js';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import validator from 'validator';

// get published posts
export const post_list_overview = asyncHandler(async (req, res) => {
  // exclude posts with the published flag set to false
  const posts = await Post.find({ published: true });
  res.json({ posts });
});

// get all posts published and unpublished for author view
export const author_post_list_overview = asyncHandler(async (req, res) => {
  const posts = await Post.find({});
  res.json({ posts });
});

// get single post (with body and comments)

export const post_detail = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    'comment_array',
    '-parent_post -__v, -reported'
  );

  res.json(post);
});

// create post

export const create_post = [
  // validate and sanitize fields
  body('title', 'Title required').trim().isLength({ min: 1 }).escape(),
  body('body', 'Body required').trim().isLength({ min: 1 }).escape(),
  body('subtitle', 'Subtitle required')
    .isLength({ min: 1, max: 3000 })
    .escape(),
  body('published').escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors });
    }
    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      subtitle: req.body.subtitle,
      published: req.body.published,
      created_timestamp: Date.now(),
    });
    const db = await post.save();
    res.json({ message: 'Post Successfully Created' });
  }),
];

// update post publish state

export const update_post = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { published: req.body.published },
    {
      new: true,
    }
  );
  res.json({ message: post });
});

// update whole post

export const update_whole_post = asyncHandler(async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      body: req.body.body,
      subtitle: req.body.subtitle,
      published: req.body.published,
    },
    {
      new: true,
    }
  );
  res.json({ message: post });
});

// delete post // admin route

export const delete_post = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);
  if (post && post._id.toString() === req.params.id) {
    res.json({ message: 'Post Successfully Deleted.' });
  } else {
    res.json({ message: 'There was an error.' });
  }
});
