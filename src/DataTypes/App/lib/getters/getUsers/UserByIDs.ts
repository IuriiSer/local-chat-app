import { User, UserID } from '../../../../Data/User/User';
import { UsersInStorage } from '../../../../Data/User/Users';

export interface UsersByIDsI {
	users: UsersInStorage;
	IDs: UserID[];
}

export type UsersByIDsR = User[];
