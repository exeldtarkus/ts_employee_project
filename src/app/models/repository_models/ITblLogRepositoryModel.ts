import {IRepositoryParam} from '../../repositories/IRepository';

interface ITblLogRepositoryFindParam extends IRepositoryParam {
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

interface ITblLogRepositoryFindOutput {
  id?: number;
  csv_filename?: string;
  Amount?: number;
  tgl_transaksi?: string;
  Total_record_failed?: number;
  Total_record_succes?: number;
  Faild_id_notes?: string;
  Upload_date?: string;
}

export {ITblLogRepositoryFindParam, ITblLogRepositoryFindOutput};
