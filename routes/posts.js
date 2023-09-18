import express from 'express';
const router = express.Router();
import * as post_controller from '../controllers/post_controller';

router.get('/', post_controller.post_list_overview);

export default router;
