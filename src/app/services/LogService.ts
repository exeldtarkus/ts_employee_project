/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import dotenv from 'dotenv';
import {ITblLogRepositoryFindOutput} from '../models/repository_models/ITblLogRepositoryModel';

dotenv.config();

const apiClient = axios.create({
  baseURL: process.env.PRIVATE_SERVICE,
  timeout: 1000 * 10,
  validateStatus: () => true,
});

const sendLog = (data: ITblLogRepositoryFindOutput): any => {
  return apiClient.post('/api/private/postlog', data);
};

export {sendLog};
