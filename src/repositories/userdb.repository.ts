import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Userdb, UserdbRelations} from '../models';

export class UserdbRepository extends DefaultCrudRepository<
  Userdb,
  typeof Userdb.prototype.id,
  UserdbRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(Userdb, dataSource);
  }
}
