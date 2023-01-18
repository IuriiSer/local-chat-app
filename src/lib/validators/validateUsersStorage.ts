import { isUsersInStorage, UsersInStorage } from '../../DataTypes/User/User.D';
import {
	ValidateUsersStorageI,
	ValidateUsersStorageR,
} from './validateUsersStorage.D';

const validateUsersStorage = ({ users, writeDataInStorage }: ValidateUsersStorageI): ValidateUsersStorageR => {
	if (!users || !isUsersInStorage(users)) {
		writeDataInStorage({ newData: {} });
		return {} as UsersInStorage;
	}
	return users;
};

export default validateUsersStorage;
