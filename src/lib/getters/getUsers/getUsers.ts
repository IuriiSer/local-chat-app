import getDataFromStorage from '../getDataFromStorage/getDataFromStorage';
import { isUsersInStorage, UsersInStorage } from '../../../DataTypes/Data/User/Users';
import { GetUsersI, GetUsersR, isQueryByLogin, isQueryByIDs, isQueryByNickName } from '../../../DataTypes/App/lib/getters/getUsers/GetUsers';
import userByLogin from './userByLogin';
import { User } from '../../../DataTypes/Data/User/User';
import userByIDs from './userByIDs';
import convertOpenUserData from '../../converters/users/convertOpenUserData';
import validateUsersStorage from '../../validators/validateUsersStorage';


// by login, ID
// const getUsers = ({ query }: GetUsersI) => User
const getUsers = ({ query }: GetUsersI): GetUsersR => {
	const { dataInStorage, writeDataInStorage } =
		getDataFromStorage<UsersInStorage>({ fieldName: 'users' });

	const users =  validateUsersStorage({ users: dataInStorage, writeDataInStorage });
	
	if (isQueryByLogin(query)) return userByLogin({ users: Object.values(users), queryLogin: query });
	
	if (isQueryByIDs(query)) return userByIDs({ users, IDs: query}).map(convertOpenUserData);
	
	if (isQueryByNickName(query)) {
		// ! ADD converter
		return {};
	}


	return null;
};

export default getUsers;
