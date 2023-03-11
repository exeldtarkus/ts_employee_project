import {IRepositoryParam} from '../../repositories/IRepository';

interface ITblCredentialRepositoryFindParam extends IRepositoryParam {
  q?: {
    id?: number;
    user_name?: number;
  };
  sort?: string;
  order?: string;
  limit?: number;
  page?: number;
  size?: number;
  count?: boolean;
}

interface ITblCredentialRepositoryFindOutput {
  id?: number;
  user_name?: string;
  password?: string;
}

export {ITblCredentialRepositoryFindParam, ITblCredentialRepositoryFindOutput};
