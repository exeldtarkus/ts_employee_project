/* eslint-disable @typescript-eslint/no-explicit-any */
import {knex} from 'knex';
import {
  employeeDB,
  employeeTransactionDB,
  employeeTransactionLogDB,
  credentialDB,
} from '../database_config';

const employeeDBConnection = knex({
  client: 'mysql2',
  connection: {
    host: employeeDB.host,
    user: employeeDB.username,
    port: 3307,
    password: employeeDB.password,
    database: employeeDB.db,
  },
});

const employeeTransactionDBConnection = knex({
  client: 'mysql2',
  connection: {
    host: employeeTransactionDB.host,
    user: employeeTransactionDB.username,
    port: 3307,
    password: employeeTransactionDB.password,
    database: employeeTransactionDB.db,
  },
});

const employeeTransactionLogDBConnection = knex({
  client: 'mysql2',
  connection: {
    host: employeeTransactionLogDB.host,
    user: employeeTransactionLogDB.username,
    port: 3307,
    password: employeeTransactionLogDB.password,
    database: employeeTransactionLogDB.db,
  },
});

const credentialDBConnection = knex({
  client: 'mysql2',
  connection: {
    host: credentialDB.host,
    user: credentialDB.username,
    port: 3307,
    password: credentialDB.password,
    database: credentialDB.db,
  },
});

export {
  employeeDBConnection,
  employeeTransactionDBConnection,
  employeeTransactionLogDBConnection,
  credentialDBConnection,
};
