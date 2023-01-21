import { isUserID, User, UserID, UserLogin, UserNickName } from '../../../../DataTypes/User/User.D';
import { UserOpenData } from '../../../../DataTypes/User/User.D';

// type of queries to get users
type GetUsersQuery = {
	userLogin?: UserLogin;
		// by the login -> RESULT WILL -> User
	userIDs?: UserID[];
		// by IDs -> RESULT WILL -> UserOpenData[]
	userNickName?: UserNickName;
		// by nickname -> RESULT WILL -> UserOpenData
};

export type GetUsersQueryByLogin = Required<Pick<GetUsersQuery, 'userLogin'>>;
export type GetUsersQueryByIDs = Required<Pick<GetUsersQuery, 'userIDs'>>;
export type GetUsersQueryByNickName = Required<Pick<GetUsersQuery, 'userNickName'>>;

export interface GetUsersI {
	query: GetUsersQuery;
}

export type GetUsersR = User | User[] | null;
	// types that can return method in UserInterface


/* GUARDS */
// 'cause difficult GetUsersQuery we should check what query we want to use
export const isQueryByLogin = (toCheck: GetUsersQuery): toCheck is GetUsersQueryByLogin => {
	return !!toCheck.userLogin && toCheck.userLogin.includes('@');
};

export const isQueryByNickName = (toCheck: GetUsersQuery): toCheck is GetUsersQueryByNickName => {
	return !!toCheck.userNickName && !toCheck.userNickName.includes('@');
};

export const isQueryByIDs = (toCheck: GetUsersQuery): toCheck is GetUsersQueryByIDs => {
	return Array.isArray(toCheck.userIDs) && toCheck.userIDs.every(isUserID);
};
