import { UserInterfacePrototype } from './UserInterface.D';
import { User, UsersInStorage } from '../../../DataTypes/User/User.D';
import convertOpenUserData from '../../converters/users/convertOpenUserData';
import validateUsersStorage from '../../validators/validateUsersStorage';
import Drivers from '../../drivers';
import { StorageDriverR } from '../../drivers/storage/StorageDriver.D';
import {
  isQueryByLogin,
  isQueryByIDs,
  isQueryByNickName,
  GetUsersR,
  GetUsersI,
} from './lib/getUsers.D';
import queryBy from './lib';

export class UserInterface extends UserInterfacePrototype {
  private storageDriver: StorageDriverR<UsersInStorage>;

  constructor() {
    super();
    this.storageDriver = Drivers.storage.driver({ fieldName: 'users' });
  }

  private getAllUsers(): UsersInStorage {
    return validateUsersStorage({
      users: this.storageDriver.getDataInStorage(),
      writeDataInStorage: this.storageDriver.writeDataInStorage,
    });
  }

  getUsers = ({ query }: GetUsersI): GetUsersR => {
    const users = this.getAllUsers();

    if (isQueryByLogin(query))
      return queryBy.login({ users: Object.values(users), userLogin: query.userLogin });

    if (isQueryByIDs(query))
      return queryBy.IDs({ users, userIDs: query.userIDs }).map(convertOpenUserData);

    if (isQueryByNickName(query)) {
      const user = queryBy.nickName({
        users: Object.values(users),
        userNickName: query.userNickName,
      });
      return user && convertOpenUserData(user);
    }

    return null;
  };

  addNewUser = ({ user }: { user: User }): User => {
    this.storageDriver.addDataInStorage({ newData: { [user._id]: user } });
    return user;
  };

  updateUserData = ({ user }: { user: User }): User => {
    this.storageDriver.addDataInStorage({ newData: { [user._id]: user } });
    return user;
  };
}

const userInterface = new UserInterface();
export default userInterface;
