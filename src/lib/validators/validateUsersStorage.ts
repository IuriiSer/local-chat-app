import { isUsersInStorage, UsersInStorage } from '../../DataTypes/Data/User/Users';
import { ValidateUsersStorageI, ValidateUsersStorageR } from '../../DataTypes/App/lib/validators/ValidateUsersStorage';

const validateUsersStorage = ({ users, writeDataInStorage }: ValidateUsersStorageI): ValidateUsersStorageR => {
	if (!isUsersInStorage(users) || !users) {
		writeDataInStorage({ newData: {} });
		return {} as UsersInStorage;
	}
  return users;
};

export default validateUsersStorage;
