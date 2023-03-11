import {IRepositoryParam} from '../../repositories/IRepository';

interface ITblTransaksiRepositoryFindParam extends IRepositoryParam {
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

interface ITblTransaksiRepositoryFindOutput {
  id?: number;
  Employee_id?: number;
  Amount?: number | null;
  Tgl_transaksi?: string;
  countCrewMember?: number;
}

export {ITblTransaksiRepositoryFindParam, ITblTransaksiRepositoryFindOutput};
