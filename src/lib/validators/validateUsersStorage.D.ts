import { UsersInStorage } from '../../DataTypes/User/User.D';
import { WriteDataInStorage } from '../drivers/storage/StorageDriver.D';

export interface ValidateUsersStorageI {
	users: UsersInStorage | null;
	writeDataInStorage: WriteDataInStorage<UsersInStorage>;
}

export type ValidateUsersStorageR = UsersInStorage;
