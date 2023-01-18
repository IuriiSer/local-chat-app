import { UsersByIDsI, UsersByIDsR } from './userByIDs.D';
import { User, isUser, isUserID } from '../../../../DataTypes/User/User.D';

const userByIDs = ({ users, userIDs }: UsersByIDsI): UsersByIDsR => {
	const res = [] as User[];
	
	userIDs.forEach((id) => {
		if (!isUserID(id)) return;
		if (isUser(users[id], ['id', 'nickname'])) res.push(users[id]);
	});
	
	return res;
};

export default userByIDs;
