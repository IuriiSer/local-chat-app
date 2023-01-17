import { UserByLoginI, UserByLoginR } from '../../../DataTypes/App/lib/getters/getUsers/UsersByLogin';
import { isUser } from '../../../DataTypes/Data/User/User';

const userByLogin = ({ users, queryLogin }: UserByLoginI): UserByLoginR => {
	return users.find((user) => isUser(user, ['login']) && user.login === queryLogin) || null;
};

export default userByLogin;
