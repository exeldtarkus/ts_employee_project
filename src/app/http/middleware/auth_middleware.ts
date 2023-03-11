/* eslint-disable @typescript-eslint/no-explicit-any */
import {Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import {ErrorResourceModel} from '../../models/resource_models/ErrorResourceModel';
import {IMainRequest} from '../requests/main_request';
import {HttpStatusCode} from '../../models/resource_models/IBaseResourceModel';

const jwt = require('jsonwebtoken');

dotenv.config();

const secret = process.env.JWT_SECRET;

const authMiddleware = async (
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

  console.log('token', token);

  jwt.verify(token, secret, {algorithm: 'HS512'}, (err: any, payload: any) => {
    if (err) {
      throw new ErrorResourceModel(
        'Token verification failed !.',
        HttpStatusCode.UNAUTHORIZED,
        (err as Error).message
      );
    } else {
      req.sub = Number(payload.sub);
      return payload;
    }
  });

  return next();
};

export default authMiddleware;
