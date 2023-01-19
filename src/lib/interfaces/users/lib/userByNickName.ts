import { isUser } from '../../../../DataTypes/User/User.D';
import { UserByNickNameI, UserByNickNameR } from './UsersByNickName.D';

const userByNickName = ({ users, userNickName }: UserByNickNameI): UserByNickNameR => {
	return users.find((user) => isUser(user, ['nickName']) && user.nickName === userNickName) || null;
};

export default userByNickName;
