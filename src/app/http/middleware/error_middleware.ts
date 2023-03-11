/* eslint-disable @typescript-eslint/no-unused-vars */
import {Response, NextFunction} from 'express';
import {ErrorResourceModel} from '../../models/resource_models/ErrorResourceModel';
import {log} from '../../utils/log_util';
import {IMainRequest} from '../requests/main_request';

function handleError(
  err: TypeError | ErrorResourceModel,
  req: IMainRequest,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  log(req.uuid!, 'handle-error', JSON.stringify(err));

  if (!(err instanceof ErrorResourceModel)) {
    customError = new ErrorResourceModel('Internal server error!', 500);
  }

  return res
    .status((customError as ErrorResourceModel).status)
    .send(customError);
}

export default handleError;
