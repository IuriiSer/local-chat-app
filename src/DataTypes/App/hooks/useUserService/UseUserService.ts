import { User } from '../../../Data/User/User';
import { LoginI, LoginR } from './Login';

export type useUserService = {
  user: User | null;
	createNewUser: Function;
	updateUserData: Function;
	login: ({ login, password }: LoginI) => LoginR;
	logout: Function;
}