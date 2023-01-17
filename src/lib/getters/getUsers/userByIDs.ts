import { UsersByIDsI, UsersByIDsR } from '../../../DataTypes/App/lib/getters/getUsers/UserByIDs';
import { User, isUser, isUserID } from '../../../DataTypes/Data/User/User';

const userByIDs = ({ users, IDs }: UsersByIDsI): UsersByIDsR => {
	const res = [] as User[];
	
	IDs.forEach((id) => {
		if (!isUserID(id)) return;
		if (isUser(users[id], ['id', 'nickname'])) res.push(users[id]);
	});
	
	return res;
};

export default userByIDs;
