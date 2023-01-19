import { LoginI, LoginR, LoginStatus } from './login.D';

const login = ({ login, password }: LoginI): LoginR => {
	const query = { userLogin: login };
	// const user = getUsers({ query });

	// if (!user) return { status: LoginStatus.wrongLoginOrPassword };
	// if (!isUser(user, ['password'])) return { status: LoginStatus.wrongLoginOrPassword };
	// if (user.password !== password) return { status: LoginStatus.wrongLoginOrPassword };
	return { status: LoginStatus.ok };
};

export default login;
