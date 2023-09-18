import express from 'express';
const router = express.Router();
import * as comment_controller from '../controllers/comment_controller.js';

// create comment

router.post('/', comment_controller.create_comment);

// update comment

router.put('/:id', comment_controller.update_comment);

// delete comment (only by admin)

router.delete('/:id', comment_controller.delete_comment);

// get comments for post

router.get('/:id', comment_controller.get_comments);
