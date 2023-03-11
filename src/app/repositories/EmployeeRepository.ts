/* eslint-disable @typescript-eslint/no-explicit-any */
import {employeeDBConnection as db} from '../config/knex/knex_config';
import {IRepository} from './IRepository';
import {
  ITblEmployeeRepositoryFindOutput,
  ITblEmployeeRepositoryFindParam,
} from '../models/repository_models/ITblEmployeeRepositoryModel';

const table = 'tbl_employee';
const alias = 'te';
const tableAlias = `${table} as ${alias}`;

class TblEmployeeRepository implements IRepository {
  static find(param?: ITblEmployeeRepositoryFindParam) {
    const query = db<ITblEmployeeRepositoryFindOutput>(tableAlias).select('*');
    const orderBy: Array<any> = [
      {column: `${alias}.employee_id`, order: 'asc'},
    ];

    if (param) {
      if (param.sort && param.order) {
        orderBy.pop();
        orderBy.push({column: param.sort, order: param.order});
      }

      if (param.page && param.size) {
        query.offset((param.page - 1) * param.size).limit(param.size);
      }

      if (param.q?.employee_id) {
        query.andWhere('employee_id', param.q.employee_id);
      }
    }

    query.orderBy(orderBy);
    // console.log('[LOG-QUERY] - TblEmployeeRepository :', query.toQuery());
    return query;
  }

  static findOne(
    param: ITblEmployeeRepositoryFindParam
  ): Promise<ITblEmployeeRepositoryFindOutput | undefined> {
    return this.find(param).first();
  }

  static findAll(
    param?: ITblEmployeeRepositoryFindParam
  ): Promise<Array<ITblEmployeeRepositoryFindOutput>> {
    return this.find(param);
  }

  static count(param: ITblEmployeeRepositoryFindParam): Promise<any> {
    param.count = true;

    const builder = db
      .count('t.bid as count')
      .from(db.raw(`(${this.find(param).toQuery()}) as t`))
      .first();

    return builder;
  }
}

export {TblEmployeeRepository};
