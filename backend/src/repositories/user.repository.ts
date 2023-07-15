import {inject} from '@loopback/context';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Userdb} from '../models/userdb.model';

export class UserRepository extends DefaultCrudRepository<
  Userdb,
  typeof Userdb.prototype.id
> {
  
  userdb: any;
  constructor(@inject('datasources.user') dataSource: UserDataSource) {
    super(Userdb, dataSource);
  }
  async verifyCode(email: string, verificationCode: string): Promise<boolean> {
    
    const user = await this.userdb.findOne({ email });
    if (user && user.verificationCode === verificationCode) {

      return true;
    }
    
    
    return false;
  }
  

}
