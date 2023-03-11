/* eslint-disable @typescript-eslint/no-explicit-any */
import {IMainRequest} from '../requests/main_request';
import {Response} from 'express';
import {TblEmployeeResource} from '../resources/TblEmployeeResource';
import {listEmployeeServices} from '../../services/ListEmployeeService';
import {ErrorResourceModel} from '../../models/resource_models/ErrorResourceModel';
import {
  HttpStatusCode,
  IBaseResourceModel,
} from '../../models/resource_models/IBaseResourceModel';
import {BaseResource} from '../resources/BaseResource';
import {compareSync, hashSync} from 'bcrypt';
import {TblCredentialRepository} from '../../repositories/CredentialRepository';
import {ITblCredentialRepositoryFindOutput} from '../../models/repository_models/ITblCredentialRepositoryModel';
import {generateTokenUser} from '../../config/jwt_config';

const listEmployee = async (req: IMainRequest, res: Response) => {
  const dataEmployee = await listEmployeeServices();
  res.json(TblEmployeeResource.success(res, {data: dataEmployee.data.data}));
};

const postData = async (req: IMainRequest, res: Response) => {
  res.json(TblEmployeeResource.success(res, {data: 'Data Insert !'}));
};

const register = async (req: IMainRequest, res: Response) => {
  const registerBody = req.body;

  const password = hashSync(registerBody.password, 10);

  const savingData: ITblCredentialRepositoryFindOutput = {
    user_name: registerBody.user_name,
    password: password,
  };

  await Promise.all([TblCredentialRepository.create(savingData)]);

  const response: IBaseResourceModel = {
    data: {
      email: savingData.user_name,
    },
    message: 'Registered !.',
  };

  return BaseResource.success(res, response);
};

const login = async (req: IMainRequest, res: Response) => {
  const registerBody = req.body;
  const JWT_TOKEN_VALIDITY = Math.round(5 * 60 * 60);
  const today = new Date().getTime();

  const user = await TblCredentialRepository.findOne({
    q: {user_name: registerBody.user_name},
  });

  if (!user) {
    throw new ErrorResourceModel(
      'Invalid credentials !.',
      HttpStatusCode.UNAUTHORIZED,
      'UNAUTHORIZED'
    );
  }

  const validPassword = compareSync(registerBody.password, user.password!);
  console.log('validPassword', validPassword);
  if (!validPassword) {
    throw new ErrorResourceModel(
      'Invalid credentials !.',
      HttpStatusCode.UNAUTHORIZED,
      'UNAUTHORIZED'
    );
  }

  const token = await generateTokenUser({
    sub: user.id!.toString(),
    iat: Number(today.toString().substring(0, 10)),
    exp: Number(
      Math.round(today + JWT_TOKEN_VALIDITY * 1000)
        .toString()
        .substring(0, 10)
    ),
  });

  const response: IBaseResourceModel = {
    data: {
      id: user.id,
      token: token,
    },
    message: 'Login !.',
  };
  return BaseResource.success(res, response);
};

export {listEmployee, postData, register, login};
