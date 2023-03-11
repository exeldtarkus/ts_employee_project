import {Response, NextFunction} from 'express';

import {IMainRequest} from './../requests/main_request';
import {v4 as uuidv4} from 'uuid';
import {now} from '../../utils/time_util';

const mainMiddleware = async (
  req: IMainRequest,
  res: Response,
  next: NextFunction
) => {
  req.uuid = uuidv4();
  req.datetime = now().add(7, 'hours');
  req.datetimeUtc = now();
  return next();
};

export default mainMiddleware;
