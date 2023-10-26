import express from 'express';
const router = express.Router();
import * as post_controller from '../controllers/post_controller';
import * as comment_controller from '../controllers/comment_controller';

// get all posts overview
router.get('/', post_controller.author_post_list_overview);

// get single post (with comments)

router.get('/:id', post_controller.post_detail);

// create post

router.post('/post', post_controller.create_post);

// update post publish state

router.patch('/:id', post_controller.update_post);

// update whole post

router.put('/:id', post_controller.update_whole_post);

// delete post

router.delete('/:id', post_controller.delete_post);

// create a comment

router.post('/:id/comment', comment_controller.create_comment);

// delete comment

router.delete('/:postid/comment/:commentid', comment_controller.delete_comment);

export default router;
