import {Knex} from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    INSERT  INTO tbl_employee(employee_name, employee_manager_id)
    VALUES  ('Mary', null),
            ('Fred', 1),
            ('Mary', 2),
            ('Vilo', 3),
            ('Mora', 2),
            ('Bill', 5),
            ('John', 6),
            ('George', 1),
            ('Chilla', 8),
            ('Moya', 8),
            ('Silvy', 1),
            ('Hans', 11),
            ('Michael', 11),
            ('Richard', 11)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DELETE FROM tbl_employee');
}
