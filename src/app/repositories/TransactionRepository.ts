/* eslint-disable @typescript-eslint/no-explicit-any */
import {employeeTransactionDBConnection as db} from '../config/knex/knex_config';
import {IRepository} from './IRepository';
import {
  ITblTransaksiRepositoryFindOutput,
  ITblTransaksiRepositoryFindParam,
} from '../models/repository_models/ITblTransactionRepositoryModel';

const table = 'tbl_transaksi';
const alias = 'tt';
const tableAlias = `${table} as ${alias}`;

class TblTransactionRepository implements IRepository {
  static find(param?: ITblTransaksiRepositoryFindParam) {
    const query = db<ITblTransaksiRepositoryFindOutput>(tableAlias).select('*');
    const orderBy: Array<any> = [{column: `${alias}.id`, order: 'asc'}];

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
    console.log('[LOG-QUERY] - TblTransactionRepository :', query.toQuery());
    return query;
  }

  static findOne(
    param: ITblTransaksiRepositoryFindParam
  ): Promise<ITblTransaksiRepositoryFindOutput | undefined> {
    return this.find(param).first();
  }

  static findAll(
    param?: ITblTransaksiRepositoryFindParam
  ): Promise<Array<ITblTransaksiRepositoryFindOutput>> {
    return this.find(param);
  }

  static count(param: ITblTransaksiRepositoryFindParam): Promise<any> {
    param.count = true;

    const builder = db
      .count('t.bid as count')
      .from(db.raw(`(${this.find(param).toQuery()}) as t`))
      .first();

    return builder;
  }

  static create(data: ITblTransaksiRepositoryFindOutput, t: any = null): any {
    const q = db<any>(table);

    if (t) {
      q.transacting(t);
    }

    return q.insert(data);
  }

  static update(
    data: ITblTransaksiRepositoryFindOutput,
    where: ITblTransaksiRepositoryFindParam
  ): any {
    const query = db(table).update(data);

    if (where.q!.id) {
      query.where('id', where.q!.id);
    }

    // console.log('[LOG-QUERY] - ', query.toQuery());
    return query;
  }
}

export {TblTransactionRepository};
