import express from 'express';
const router = express.Router();
import * as post_controller from '../controllers/post_controller';
import * as comment_controller from '../controllers/comment_controller';

// get all posts overview
router.get('/', post_controller.post_list_overview);

// get single post (with comments)

router.get('/:id', post_controller.post_detail);

// create a comment

router.post('/:id/comment', comment_controller.create_comment);

export default router;
