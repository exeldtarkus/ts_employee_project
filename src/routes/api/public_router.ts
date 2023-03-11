import express from 'express';

import * as publicController from '../../app/http/controllers/public_controller';
import wrap from '../../app/http/middleware/wrapper_middleware';
import authMiddleware from '../../app/http/middleware/auth_middleware';

const router = express.Router();

router.get(
  '/list_employee',
  wrap(authMiddleware),
  wrap(publicController.listEmployee)
);
router.post(
  '/post_data',
  wrap(authMiddleware),
  wrap(publicController.postData)
);

router.post('/register', wrap(publicController.register));
router.post('/login', wrap(publicController.login));

export {router as publicRouter};
