import { UserInterfacePrototype } from './UserInterface.D';
import { User, UsersInStorage } from '../../../DataTypes/User/User.D';
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
  private cache: UsersInStorage;
    // the cache minus -> we don`t have mechanism to automatically validate data

  constructor() {
    super();
    this.storageDriver = Drivers.storage.driver({ fieldName: 'users' });
    this.cache = {};
  }

  private getAllUsers(): UsersInStorage {
    return validateUsersStorage({
      users: this.storageDriver.getDataInStorage(),
      writeDataInStorage: this.storageDriver.writeDataInStorage,
    });
  }

  getUsers = ({ query }: GetUsersI): GetUsersR => {
    const users = this.getAllUsers();

    if (isQueryByLogin(query)) {
      if (this.cache[query.userLogin]) return this.cache[query.userLogin];
      const user = queryBy.login({ users: Object.values(users), userLogin: query.userLogin });
      if (user) this.cache[query.userLogin] = user;
      return user;
    }

    if (isQueryByIDs(query)) {
      // 1 -> get cached User[]
      //   -> filter notCachedIDs
      const cachedUsers = [] as User[];
      const notCachedIDs = query.userIDs.filter((id) => {
        if (!this.cache[id]) return true;
        cachedUsers.push(this.cache[id]);
        return false;
      });
      // 2 -> get notCachedUser from slow storadge
      const notCachedUsers = queryBy.IDs({ users, userIDs: notCachedIDs });
      // 3 -> save their data into cache
      notCachedUsers.forEach((user) => {
        this.cache[user._id] = user;
      });
      return [...cachedUsers, ...notCachedUsers];
    }

    if (isQueryByNickName(query)) {
      if (this.cache[query.userNickName]) return this.cache[query.userNickName];
      const user = queryBy.nickName({
        users: Object.values(users),
        userNickName: query.userNickName,
      });
      if (user) this.cache[query.userNickName] = user;
      return user;
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

  eraseCache = (): void => {
    this.cache = {};
  };
}

const userInterface = new UserInterface();
export default userInterface;
