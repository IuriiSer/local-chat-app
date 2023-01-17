import { version as uuidVersion, validate as uuidValidate } from 'uuid';
import { ChatID } from '../Chat/Chat';

export type UserID = string;
export type UserSession = string;
export type UserLogin = string;
export type UserNickName = string;
export type UserPassword = string;

export type User = {
	_id: UserID;
	login: UserLogin;
	nickName: UserNickName;
	password: UserPassword;
	chats: ChatID[];
};

export const isUser = (toCheck: any, requiredFields: string[] | null): toCheck is User => {
	if (typeof (toCheck as User) !== 'object') return false;
	return !!!requiredFields?.some((field) => !toCheck[field]);
}

export const isUserNickName = (toCheck: any): toCheck is UserNickName => {
	return typeof (toCheck as UserNickName) === 'string' && toCheck.length < 20;
}

export const isUserID = (toCheck: any): toCheck is UserID => {
	return typeof (toCheck as UserNickName) === 'string' && uuidValidate(toCheck) && uuidVersion(toCheck) === 4;
}
