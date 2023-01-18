import { UserByNickNameI, UserByNickNameR } from '../../../DataTypes/App/lib/interfaces/users/UsersByNickName';
import { isUser } from '../../../DataTypes/Data/User/User';

const userByNickName = ({ users, userNickName }: UserByNickNameI): UserByNickNameR => {
	return users.find((user) => isUser(user, ['nickName']) && user.nickName === userNickName) || null;
};

export default userByNickName;
