import Comments from '../models/comments';
import Post from '../models/posts';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

// create comment

export const create_comment = [
  // validate and sanitize fields
  body('name', 'Name required').trim().isLength({ min: 1 }).escape(),
  body('body', 'Body required').trim().isLength({ min: 4 }).escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    const comment = await new Comments({
      name: req.body.name,
      body: req.body.body,
      parent_post: req.params.id,
      reported: false,
      published_timestamp: Date.now(),
    });

    if (!errors.isEmpty()) {
      return res.json({ errors });
    }

    await comment.save();

    // need to add comment to post comment array
    const addPost = await Post.findById(req.params.id);
    addPost.comment_array.push(comment._id);
    await addPost.save();

    res.json({ status: 200 });
  }),
];

// update comment // save until I have a comment form... to handle likes

export const update_comment = asyncHandler(async (req, res) => {
  res.json({ title: 'Update Comment' });
});

// delete comment (only by admin)

export const delete_comment = asyncHandler(async (req, res) => {
  const comment = await Comments.findByIdAndRemove(req.params.commentid);
  if (comment && comment._id.toString() === req.params.commentid) {
    res.json({ message: 'Comment Successfully Deleted.' });
  } else {
    res.json({ message: 'There was an error.' });
  }
});
