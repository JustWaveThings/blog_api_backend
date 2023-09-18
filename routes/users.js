import express from 'express';
const router = express.Router();
import * as user_controller from '../controllers/user_controller.js';

router.get('/1', user_controller.index1);

router.get('/2', user_controller.index2);

export default router;
