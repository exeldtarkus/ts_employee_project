import {NextFunction, Response} from 'express';
import {IMainRequest} from '../requests/main_request';

const wrapperMiddleware =
  (fn: Function) => (req: IMainRequest, res: Response, next: NextFunction) => {
    try {
      const result = fn(req, res, next);
      return result.catch(next);
    } catch (err) {
      return next(err);
    }
  };

export default wrapperMiddleware;
