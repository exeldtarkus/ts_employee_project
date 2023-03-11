import {Request} from 'express';
import moment from 'moment';

interface IMainRequest extends Request {
  sub?: number;
  userId?: number;
  credId?: number;
  uuid?: string;
  datetime?: moment.Moment;
  datetimeUtc?: moment.Moment;
}

export {IMainRequest};
