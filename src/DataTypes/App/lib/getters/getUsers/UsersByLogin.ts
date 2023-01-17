import { User, UserLogin } from '../../../../Data/User/User';

export interface UserByLoginI {
	users: User[];
	queryLogin: UserLogin;
}

export type UserByLoginR = User | null;
