import {Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import {ErrorResourceModel} from '../../models/resource_models/ErrorResourceModel';
import {IMainRequest} from '../requests/main_request';

dotenv.config();

const serverAuthMiddleware = async (
  req: IMainRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new ErrorResourceModel('Unauthorized.', 401);
  }

  const authorizationSplitted = authorization.split(' ');
  const tokenType: string = authorizationSplitted[0];

  if (tokenType !== 'Bearer') {
    throw new ErrorResourceModel('Wrong token type.', 401);
  }

  const token: string = authorizationSplitted[1];

  if (token !== process.env.SERVER_TOKEN) {
    throw new ErrorResourceModel('Token verification failed', 401);
  }

  return next();
};

export default serverAuthMiddleware;
