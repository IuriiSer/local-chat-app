import { User, UserID, UserLogin, UserNickName } from '../../../../Data/User/User';
import { UserOpenData } from '../../../../Data/User/UserOpenData';

type GetUsersQuery = UserLogin | UserID[] | UserNickName;

export interface GetUsersI {
	query: GetUsersQuery;
}

export type GetUsersR = User | UserOpenData[] | null;

export const isQueryByLogin = (toCheck: GetUsersQuery): toCheck is UserLogin => {
	return typeof (toCheck as UserLogin) === 'string' && toCheck.includes('@');
};

export const isQueryByNickName = (toCheck: GetUsersQuery): toCheck is UserNickName => {
	return typeof (toCheck as UserNickName) === 'string' && !toCheck.includes('@');
};

export const isQueryByIDs = (toCheck: GetUsersQuery): toCheck is UserID[] => {
	return Array.isArray(toCheck as UserID[]);
};
