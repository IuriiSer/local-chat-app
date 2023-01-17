import { UsersInStorage } from '../../../Data/User/Users';
import { WriteDataInStorage } from '../getters/getDataFromStorage/GetDataFromStorage';

export interface ValidateUsersStorageI {
	users: UsersInStorage | null;
	writeDataInStorage: WriteDataInStorage<UsersInStorage>;
}

export type ValidateUsersStorageR = UsersInStorage;
