import { LoginI, LoginR, LoginStatus } from './login.D';
import { isUser } from '../../DataTypes/User/User.D';
import getUsers from '../../lib/interfaces/users/getUsers';

const login = ({ login, password }: LoginI): LoginR => {
	const query = { userLogin: login };
	const user = getUsers({ query });

	if (!user) return { status: LoginStatus.wrongLoginOrPassword };
	if (!isUser(user, ['password'])) return { status: LoginStatus.wrongLoginOrPassword };
	if (user.password !== password) return { status: LoginStatus.wrongLoginOrPassword };

	return { status: LoginStatus.ok, user };
};

export default login;
