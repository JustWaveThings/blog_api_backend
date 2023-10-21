import Post from '../models/posts.js';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import validator from 'validator';

// get published posts overview (no body, just metadata)
export const post_list_overview = asyncHandler(async (req, res) => {
  // exclude posts with the published flag set to false
  const posts = await Post.find({ published: true }, '-body ');
  res.json({ posts });
});

// for author view
export const author_post_list_overview = asyncHandler(async (req, res) => {
  const posts = await Post.find('-body ');
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
    console.log(req.body);
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

// update post // save for later.... may wait until I have a form....

export const update_post = asyncHandler(async (req, res) => {
  // const post = await Post.findById(req.params.postid);
  res.json({ message: 'Update Post not yet implmented' });
});

// delete post // admin route

export const delete_post = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.postid);
  if (post && post._id.toString() === req.params.postid) {
    res.json({ message: 'Post Successfully Deleted.' });
  } else {
    res.json({ message: 'There was an error.' });
  }
});
