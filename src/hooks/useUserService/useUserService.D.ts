import { User } from '../../DataTypes/User/User.D';
import { LoginI, LoginR } from './login.D';

export type useUserService = {
  user: User | null;
	createNewUser: Function;
	updateUserData: Function;
	login: ({ login, password }: LoginI) => LoginR;
	logout: Function;
}