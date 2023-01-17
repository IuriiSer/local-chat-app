import { UserID } from '../User/User';
import { MessageID } from '../Message/Message';

export type ChatID = string;

export type Chat = {
	_id: ChatID;
	users: UserID[];
	messages: MessageID[];
	owner: UserID;
	managers: UserID[];
};
