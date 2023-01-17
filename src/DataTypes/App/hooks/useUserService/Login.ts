import { User, UserLogin, UserPassword } from '../../../Data/User/User';

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
