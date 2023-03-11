import {
  HttpStatusCode,
  IBaseResourceModel,
} from '../../models/resource_models/IBaseResourceModel';
import moment from 'moment';
import {Response} from 'express';

class BaseResource {
  static exec(res: Response, data: IBaseResourceModel) {
    const response: IBaseResourceModel = {
      data: data.data,
      isSuccess: data.isSuccess,
      message: data.message,
      status: data.status,
      timestamp: moment().utc().format('YYYY-MM-DDTHH:mm:ssZZ'),
    };
    res.status(response.status!).json(response);
  }

  static success(res: Response, data: IBaseResourceModel) {
    data.isSuccess = true;
    data.status = HttpStatusCode.OK;
    if (!data.data) data.data = null;
    if (!data.message) data.message = '200 OK!';
    this.exec(res, data);
  }
}

export {BaseResource};
