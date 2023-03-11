import {IRepositoryParam} from '../../repositories/IRepository';

interface ITblEmployeeRepositoryFindParam extends IRepositoryParam {
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

interface ITblEmployeeRepositoryFindOutput {
  employee_id?: number;
  employee_name?: string;
  employee_manager_id?: number | null;
  the_boss?: string;
  path_level?: number;
}

export {ITblEmployeeRepositoryFindParam, ITblEmployeeRepositoryFindOutput};
