import { UserID } from '../User/User.D';
import { MessageReaction } from './MessageReaction.D';

export type MessageID = string;

export type MessageData = {
	text: string;
		// now we have only text, but this data structure allows us
		// quikly add new fields
};

export type Message = {
	_id: MessageID;
		// the message id
	data: MessageData;
		// the message data -> text, photos, etc
	owner: UserID;
		// the user ID who sent the message
	reactions: MessageReaction[];
		// all reactions for the message
	isModified: Boolean;
		// shows do the message was modified
	isHided: Boolean;
		// shows did message deleted (hided)
	sentDate: Date;
		// sent date
};
