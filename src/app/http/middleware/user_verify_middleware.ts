import {Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import {ErrorResourceModel} from '../../models/resource_models/ErrorResourceModel';
import {IMainRequest} from '../requests/main_request';

const jwt = require('jsonwebtoken');
dotenv.config();

const userVerify = async (
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
  const userId: number = req.params.id
    ? Number(req.params.id)
    : Number(req.query.id);

  const tokenUser = jwt.decode(token);
  if (tokenUser.user_id !== userId) {
    throw new ErrorResourceModel('Invalid User.', 401);
  }
  return next();
};

export default userVerify;
