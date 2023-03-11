import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        create table if not exists tbl_employee
        (
            employee_id          int auto_increment primary key,
            employee_name        varchar(50) null,
            employee_manager_id  int(11) null
        );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
      DROP TABLE tbl_employee;
`);
}
