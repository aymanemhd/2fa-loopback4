import {inject} from '@loopback/context';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Userdb} from '../models/userdb.model';

export class UserRepository extends DefaultCrudRepository<
  Userdb,
  typeof Userdb.prototype.id
> {
  constructor(@inject('datasources.user') dataSource: UserDataSource) {
    super(Userdb, dataSource);
  }
}
