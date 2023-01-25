import { UserID } from '../User/User.D';

export type Unified = string;

export type MessageReaction = {
  emojiID: Unified;
  // the emoji ID
  users: UserID[];
  // users IDs who leavs the reaction
};

export type MessageNewReaction = {
  emojiID: Unified;
  // the emoji ID
  userID: UserID;
  // the user who leave the Reaction
};
