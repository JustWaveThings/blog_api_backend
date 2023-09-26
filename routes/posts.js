import express from 'express';
const router = express.Router();
import * as post_controller from '../controllers/post_controller';
import * as comment_controller from '../controllers/comment_controller';

// get all posts overview (no body, just metadata)
router.get('/', post_controller.post_list_overview);

// get single post (with body and comments)

router.get('/:id', post_controller.post_detail);

// create post

router.post('/', post_controller.create_post);

// update post

router.put('/:postid', post_controller.update_post);

// delete post

router.delete('/:postid', post_controller.delete_post);

// create a comment

router.post('/:postid/comment', comment_controller.create_comment);

// update comment (so it can be flagged as inappropriate / update likes)

router.put('/:postid/comment/:commentid', comment_controller.update_comment);

// delete comment

router.delete('/:postid/comment/:commentid', comment_controller.delete_comment);

export default router;
