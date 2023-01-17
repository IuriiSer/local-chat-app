import { UserID } from '../User/User';

type emojiID = string;

export type MessageReaction = {
	emoji: emojiID;
	users: UserID[];
};
