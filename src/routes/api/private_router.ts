import express from 'express';
import * as employeeController from '../../app/http/controllers/private_controller';
import wrap from '../../app/http/middleware/wrapper_middleware';
import multerMiddleware from '../../app/http/middleware/multer_middleware';

const router = express.Router();

router.get('/list_employee', wrap(employeeController.listEmployee));
router.post(
  '/postdata',
  multerMiddleware('file', 1),
  wrap(employeeController.trxEmployee)
);
router.post('/postlog', wrap(employeeController.saveLog));

export {router as privateRouter};
