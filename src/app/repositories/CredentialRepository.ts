/* eslint-disable @typescript-eslint/no-explicit-any */
import {credentialDBConnection as db} from '../config/knex/knex_config';
import {IRepository} from './IRepository';
import {
  ITblCredentialRepositoryFindOutput,
  ITblCredentialRepositoryFindParam,
} from '../models/repository_models/ITblCredentialRepositoryModel';

const table = 'credential';
const alias = 'c';
const tableAlias = `${table} as ${alias}`;

class TblCredentialRepository implements IRepository {
  static find(param?: ITblCredentialRepositoryFindParam) {
    const query =
      db<ITblCredentialRepositoryFindOutput>(tableAlias).select('*');
    const orderBy: Array<any> = [{column: `${alias}.id`, order: 'asc'}];

    if (param) {
      if (param.sort && param.order) {
        orderBy.pop();
        orderBy.push({column: param.sort, order: param.order});
      }

      if (param.page && param.size) {
        query.offset((param.page - 1) * param.size).limit(param.size);
      }

      if (param.q?.user_name) {
        query.andWhere('user_name', param.q.user_name);
      }
    }

    query.orderBy(orderBy);
    console.log('[LOG-QUERY] - TblCredentialRepository :', query.toQuery());
    return query;
  }

  static findOne(
    param: ITblCredentialRepositoryFindParam
  ): Promise<ITblCredentialRepositoryFindOutput | undefined> {
    return this.find(param).first();
  }

  static findAll(
    param?: ITblCredentialRepositoryFindParam
  ): Promise<Array<ITblCredentialRepositoryFindOutput>> {
    return this.find(param);
  }

  static count(param: ITblCredentialRepositoryFindParam): Promise<any> {
    param.count = true;

    const builder = db
      .count('t.bid as count')
      .from(db.raw(`(${this.find(param).toQuery()}) as t`))
      .first();

    return builder;
  }

  static create(data: ITblCredentialRepositoryFindOutput, t: any = null): any {
    const q = db<any>(table);

    if (t) {
      q.transacting(t);
    }

    return q.insert(data);
  }

  static update(
    data: ITblCredentialRepositoryFindOutput,
    where: ITblCredentialRepositoryFindParam
  ): any {
    const query = db(table).update(data);

    if (where.q!.id) {
      query.where('id', where.q!.id);
    }

    // console.log('[LOG-QUERY] - ', query.toQuery());
    return query;
  }
}

export {TblCredentialRepository};
