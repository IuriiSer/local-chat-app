import { UserID } from '../User/User.D';
import { MessageID } from '../Message/Message.D';

export type ChatID = string;

export type Chat = {
	_id: ChatID;
		// Hold chat ID
	users: UserID[];
		// Hold all users IDs that joined to the chat
	messages: MessageID[];
		// Hold all messages IDs that sent in the chat
	owner: UserID;
		// The owner of chat
	managers: UserID[];
		// Users who can approve new applications to join the chat
};
