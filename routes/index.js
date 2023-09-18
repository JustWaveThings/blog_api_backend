import express from 'express';
const router = express.Router();
import index_controller from '../controllers/index_controller.js';

router.get('/', index_controller.index);

router.get('/2', index_controller.index2);

export default router;
