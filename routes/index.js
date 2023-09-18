import express from 'express';
const router = express.Router();
import * as index_controller from '../controllers/index_controller.js';

router.get('/', index_controller.index);

export default router;
