import getDataFromLocalStorage from '../../lib/getters/getDataFromStorage/getDataFromStorage';
import { isUsersInStorage, UsersInStorage } from '../../DataTypes/Data/User/Users';
import { LoginI, LoginR, LoginStatus } from '../../DataTypes/App/hooks/useUserService/Login';

const login = ({ login, password }: LoginI): LoginR => {
	const { dataInStorage, writeDataInStorage, eraseDataInStorage } =
		getDataFromLocalStorage<UsersInStorage>({ fieldName: 'users' });

	const users = dataInStorage;

	if (!isUsersInStorage(users) || !users) {
		eraseDataInStorage();
		writeDataInStorage({ newData: {} });
		return { status: LoginStatus.wrongLoginOrPassword };
	}

	const userToValidate = Object.values(users).find((el) => {});

	return { status: LoginStatus.ok };
};

export default login;
