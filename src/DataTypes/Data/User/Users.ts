import { User, UserID } from './User';

export type UsersInStorage = { [key: UserID]: User };

export const isUsersInStorage = (toCheck: any): toCheck is UsersInStorage => {
	return typeof (toCheck as UsersInStorage) === 'object';
};
