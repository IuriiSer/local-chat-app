import { UserID } from '../User/User.D';

type EmojiID = string;

export type MessageReaction = {
	emoji: EmojiID;
		// the emoji ID
	users: UserID[];
		// users IDs who leavs the reaction
};
