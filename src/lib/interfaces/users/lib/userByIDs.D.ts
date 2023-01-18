import { User, UserID } from '../../../../DataTypes/User/User.D';
import { UsersInStorage } from '../../../../DataTypes/User/User.D';

export interface UsersByIDsI {
	users: UsersInStorage;
	userIDs: UserID[];
}

export type UsersByIDsR = User[];
