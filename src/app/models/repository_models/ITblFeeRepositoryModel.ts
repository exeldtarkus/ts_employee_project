import {IRepositoryParam} from '../../repositories/IRepository';

interface ITblFeeRepositoryFindParam extends IRepositoryParam {
  q?: {
    id?: number;
    employee_id?: number;
  };
  sort?: string;
  order?: string;
  limit?: number;
  page?: number;
  size?: number;
  count?: boolean;
}

interface ITblFeeRepositoryFindOutput {
  id?: number;
  employee_id?: number;
  amount_fee?: number;
  tgl_fee?: string;
}

export {ITblFeeRepositoryFindParam, ITblFeeRepositoryFindOutput};
