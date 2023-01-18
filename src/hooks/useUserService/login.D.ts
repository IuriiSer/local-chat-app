import { User, UserLogin, UserPassword } from '../../DataTypes/User/User.D';

export enum LoginStatus {
	ok,
	wrongLoginOrPassword,
}

export interface LoginI {
	login: UserLogin;
	password: UserPassword;
}

export type LoginR = {
	status: LoginStatus;
	user?: User;
};
