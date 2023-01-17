import { UserID } from '../User/User';
import { MessageReaction } from './MessageReaction';

export type MessageID = string;
type MessageData = {
	text: string;
};

export type Message = {
	_id: MessageID;
	data: MessageData;
	owner: UserID;
	reactions: MessageReaction[];
	isModified: Boolean;
	isHided: Boolean;
	sentDate: Date;
};
