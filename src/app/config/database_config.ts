import dotenv from 'dotenv';

dotenv.config();

const employeeDB = {
  host: process.env.DB_HOST,
  host_read: process.env.DB_HOST_READ,
  port: process.env.DB_HOST_PORT,
  db: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const employeeTransactionDB = {
  host: process.env.DB_HOST,
  host_read: process.env.DB_HOST_READ,
  port: process.env.DB_HOST_PORT,
  db: process.env.DB_TRANSACTION,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const employeeTransactionLogDB = {
  host: process.env.DB_HOST,
  host_read: process.env.DB_HOST_READ,
  port: process.env.DB_HOST_PORT,
  db: process.env.DB_TRANSACTION_LOG,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const credentialDB = {
  host: process.env.DB_HOST,
  host_read: process.env.DB_HOST_READ,
  port: process.env.DB_HOST_PORT,
  db: process.env.DB_CREDENTIAL,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

export {
  employeeDB,
  employeeTransactionDB,
  employeeTransactionLogDB,
  credentialDB,
};
