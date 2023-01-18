import { UserByLoginI, UserByLoginR } from './UsersByLogin.D';
import { isUser } from '../../../../DataTypes/User/User.D';

const userByLogin = ({ users, userLogin }: UserByLoginI): UserByLoginR => {
	return users.find((user) => isUser(user, ['login']) && user.login === userLogin) || null;
};

export default userByLogin;
