import Comments from '../models/comments';
import Post from '../models/posts';
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

// create comment

export const create_comment = asyncHandler(async (req, res) => {
  // create comment and save to db
  console.log(req.body);

  const comment = await new Comments({
    name: req.body.name,
    body: req.body.body,
    parent_post: req.params.id,
    reported: false,
    published_timestamp: Date.now(),
  });

  await comment.save();

  // need to add comment to post comment array

  const post = await Post.findById(req.params.id);
  post.comment_array.push(comment._id);
  const postDb = await post.save();

  // res.status(200).redirect(`http:/localhost:3000/posts/${req.params.id}`);
  res.json({ status: 200 });
});

// update comment // save until I have a comment form... don't forget handling likes

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
