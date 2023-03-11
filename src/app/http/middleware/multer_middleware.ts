import dotenv from 'dotenv';
import {IMainRequest} from '../requests/main_request';
import multer from 'multer';
import path from 'path';

const savePath = path.join(__dirname, '../../public/uploads/temp');

const multerMiddleware = (name: string, maxCount: number) => {
  const storage = multer.diskStorage({
    destination(req: IMainRequest, file, callback) {
      callback(null, savePath);
    },
    filename(req, file, callback) {
      callback(null, file.originalname);
    },
  });
  return multer({storage}).fields([{name, maxCount}]);
};

export default multerMiddleware;
