/* eslint-disable @typescript-eslint/no-explicit-any */
import {employeeTransactionLogDBConnection as db} from '../config/knex/knex_config';
import {IRepository} from './IRepository';
import {
  ITblLogRepositoryFindOutput,
  ITblLogRepositoryFindParam,
} from '../models/repository_models/ITblLogRepositoryModel';

const table = 'tbl_log_transaksi';
const alias = 'tlt';
const tableAlias = `${table} as ${alias}`;

class TblLogRepository implements IRepository {
  static find(param?: ITblLogRepositoryFindParam) {
    const query = db<ITblLogRepositoryFindOutput>(tableAlias).select('*');
    const orderBy: Array<any> = [{column: `${alias}.id`, order: 'asc'}];

    if (param) {
      if (param.sort && param.order) {
        orderBy.pop();
        orderBy.push({column: param.sort, order: param.order});
      }

      if (param.page && param.size) {
        query.offset((param.page - 1) * param.size).limit(param.size);
      }
    }

    query.orderBy(orderBy);
    console.log('[LOG-QUERY] - TblLogRepository :', query.toQuery());
    return query;
  }

  static findOne(
    param: ITblLogRepositoryFindParam
  ): Promise<ITblLogRepositoryFindOutput | undefined> {
    return this.find(param).first();
  }

  static findAll(
    param?: ITblLogRepositoryFindParam
  ): Promise<Array<ITblLogRepositoryFindOutput>> {
    return this.find(param);
  }

  static count(param: ITblLogRepositoryFindParam): Promise<any> {
    param.count = true;

    const builder = db
      .count('t.bid as count')
      .from(db.raw(`(${this.find(param).toQuery()}) as t`))
      .first();

    return builder;
  }

  static create(data: ITblLogRepositoryFindOutput, t: any = null): any {
    const q = db<any>(table);

    if (t) {
      q.transacting(t);
    }

    return q.insert(data);
  }

  static update(
    data: ITblLogRepositoryFindOutput,
    where: ITblLogRepositoryFindParam
  ): any {
    const query = db(table).update(data);

    if (where.q!.id) {
      query.where('id', where.q!.id);
    }

    // console.log('[LOG-QUERY] - ', query.toQuery());
    return query;
  }
}

export {TblLogRepository};
