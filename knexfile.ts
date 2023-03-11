import type {Knex} from 'knex';
import {employeeDB} from './src/app/config/database_config';

// Update with your config settings.

const config: {[key: string]: Knex.Config} = {
  development: {
    client: 'mysql2',
    connection: {
      user: employeeDB.username,
      host: employeeDB.host,
      database: employeeDB.db,
      port: 3307,
      password: employeeDB.password,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
  },
};

module.exports = config;
