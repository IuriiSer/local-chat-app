import { User, UserNickName } from '../../../../DataTypes/User/User.D';

export interface UserByNickNameI {
	users: User[];
	userNickName: UserNickName;
}

export type UserByNickNameR = User[];
