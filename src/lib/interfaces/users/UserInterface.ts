import { UserInterfacePrototype } from './UserInterface.D';
import { User, NewUser, UserNewData, UsersInStorage } from '../../../DataTypes/User/User.D';
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

class UserInterface extends UserInterfacePrototype {
	private storageDriver: StorageDriverR<UsersInStorage>;

	constructor() {
		super();
		this.storageDriver = Drivers.storage.driver({ fieldName: 'users' });
	}

	getUsers({ query }: GetUsersI): GetUsersR {
		const dataInStorage = this.storageDriver.getDataInStorage();
		const users = validateUsersStorage({
			users: dataInStorage,
			writeDataInStorage: this.storageDriver.writeDataInStorage,
		});

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
	}

  addNewUser({ newUser }: { newUser: NewUser }): User {}
  updateUserData({ newUserData }: { newUserData: UserNewData }): User {}
}

const userInterface = new UserInterface();
export default userInterface;
