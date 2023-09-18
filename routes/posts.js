import express from 'express';
const router = express.Router();
import * as post_controller from '../controllers/post_controller';

// get all posts overview (no body, just metadata)
router.get('/', post_controller.post_list_overview);

// get single post (with body and comments)

router.get('/:id', post_controller.post_detail);

// create post

router.post('/', post_controller.create_post);

// update post

router.put('/:id', post_controller.update_post);

// delete post

router.delete('/:id', post_controller.delete_post);

export default router;
