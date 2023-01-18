import { version as uuidVersion, validate as uuidValidate } from 'uuid';
import { ChatID } from '../Chat/Chat.D';

export type UserID = string;
	// standart ID
export type UserLogin = string;
	// the login to auth in user account
export type UserNickName = string;
	// the nickname to show in chat and etc
export type UserPassword = string;
	// user password to auth logining
export type UserChat = {
	_id: ChatID;
		// chat id the user take apart
	lastSeen: Date;
		// lastseen time need to show a count of unreaded messages
};

export type User = {
	_id: UserID;
	login: UserLogin;
	nickName: UserNickName;
	password: UserPassword;
	chats: UserChat[];
};

export type NewUser = Omit<User, '_id' | 'chat'>;
	// data to create new user

export type UserNewData = Partial<Omit<User, '_id' | 'chats'>> & Pick<User, '_id'>;
	// data to update existed user
	// like the NewUser but _id is required

export type UserOpenData = Omit<User, 'password' | 'chats' | 'session' | 'login'>;
	// open user data that can be showed in front

export type UsersInStorage = { [key: UserID]: User };
	// representaion of user in localStorage
	// why object ->
	// localStorage is slow and we will often send request to get UserOpenData
	// it more faster to get data from {} by ID
	// then use [].find() by id

/* TYPE GUARDS */
// 'cause every user have access to storage, we shoud every time to check do our data from localStorage is
// in requested format. We don`t need every time format in default server/client schema
// but in this task it was necessary
export const isUser = (toCheck: any, requiredFields: string[] | null): toCheck is User => {
	if (typeof (toCheck as User) !== 'object') return false;
	return !!!requiredFields?.some((field) => !toCheck[field]);
};

export const isUsersInStorage = (toCheck: any): toCheck is UsersInStorage => {
	return typeof (toCheck as UsersInStorage) === 'object';
};

export const isUserNickName = (toCheck: any): toCheck is UserNickName => {
	return typeof (toCheck as UserNickName) === 'string' && toCheck.length < 20;
};

export const isUserID = (toCheck: any): toCheck is UserID => {
	return (
		typeof (toCheck as UserNickName) === 'string' &&
		uuidValidate(toCheck) &&
		uuidVersion(toCheck) === 4
	);
};
