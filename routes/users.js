import express from 'express';
const router = express.Router();
import * as user_controller from '../controllers/user_controller.js';

// get user

router.get('/', user_controller.get_user);

// create user

router.post('/', user_controller.create_user);

// update user

router.put('/', user_controller.update_user);

export default router;
