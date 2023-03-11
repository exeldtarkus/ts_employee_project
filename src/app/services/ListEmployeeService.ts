/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const apiClient = axios.create({
  baseURL: process.env.PRIVATE_SERVICE,
  timeout: 1000 * 10,
  validateStatus: () => true,
});

const listEmployeeServices = (): any => {
  return apiClient.get('/api/private/list_employee');
};

export {listEmployeeServices};
