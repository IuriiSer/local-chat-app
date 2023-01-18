import { User, UserLogin } from '../../../../DataTypes/User/User.D';

export interface UserByLoginI {
	users: User[];
	userLogin: UserLogin;
}

export type UserByLoginR = User | null;
