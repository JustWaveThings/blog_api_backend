import express from 'express';

import post_controller from '../controllers/post_controller';

export default function router() {
  const router = express.Router();

  // GET all posts overview
  router.get('/', post_controller.post_list_overview);

  return router;
}
