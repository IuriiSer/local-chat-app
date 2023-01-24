import { ChatID } from '../../../DataTypes/Chat/Chat.D';
import { Message, MessageID, MessageData } from '../../../DataTypes/Message/Message.D';
import { MessageNewReaction } from '../../../DataTypes/Message/MessageReaction.D';
import { UserID } from '../../../DataTypes/User/User.D';

export type BroadcastInterface = {
  subscribe: Subscribe;
  unsubscribe: ({ idToUnsubscribe, actionType }: UnsubscribeI) => void;
  close: () => void;
  sentData: (data: BroadcastAnyMessage) => void;
};

export type Subscribe = (subscriber: BroadcastSubscriber) => void;
export type BroadcastSubscriberID = string;

export type Action = (data: BroadcastAnyMessage) => void;

export enum ActionType {
  recieve = 'recieve',
  send = 'send',
}

export type BroadcastSubscriber = {
  _id: BroadcastSubscriberID;
  actionType: ActionType;
  action: Action;
};

export type Subscribers = {
  forRecieving: BroadcastSubscriber[];
  forSending: BroadcastSubscriber[];
};

export interface UnsubscribeI {
  idToUnsubscribe: BroadcastSubscriberID;
  actionType: ActionType;
}

// Broadcast messages DESCRIPTION
// ******************************

// Broadcast messages types
// BEGIN
export enum BroadcastEents {
  newMessage = 'newMessage',
  messageHasEdited = 'editedMessage',
  messageGetReaction = 'messageGetReaction',
  userHasInvitedToChat = 'userHasInvitedToChat',
}
// END

// Broadcast messages types
// BEGIN
type NewMessageContent = {
  chatID: ChatID;
  message: Message;
};

type MessageHasEditedContent = {
  chatID: ChatID;
  messageID: MessageID;
  messageData: MessageData;
};

type MessageGetReactionContent = {
  chatID: ChatID;
  messageID: MessageID;
  Reaction: MessageNewReaction;
};

type InvitedToChatContent = {
  from: UserID;
  to: UserID;
  chatID: ChatID;
};

// All possible Contents
type BroadcastContents =
  | NewMessageContent
  | MessageHasEditedContent
  | MessageGetReactionContent
  | InvitedToChatContent;
// END

// Broadcast events types
// BEGIN
type BroadcastMessagePrototype<E extends BroadcastEents, C> = {
  event: E;
  content: C;
};

// ALL possible message
export type BroadcastAnyMessage = BroadcastMessagePrototype<BroadcastEents, BroadcastContents>;

// MessageGetReaction message
export type MessageGetReaction = BroadcastMessagePrototype<
  BroadcastEents.messageGetReaction,
  MessageGetReactionContent
>;

// MessageGetReaction message
export type NewMessage = BroadcastMessagePrototype<BroadcastEents.newMessage, NewMessageContent>;

// MessageGetReaction message
export type MessageHasEdited = BroadcastMessagePrototype<
  BroadcastEents.messageHasEdited,
  MessageHasEditedContent
>;

// MessageGetReaction message
export type InvitedToChat = BroadcastMessagePrototype<
  BroadcastEents.userHasInvitedToChat,
  InvitedToChatContent
>;
// END

// Guards
// BEGIN
export const isBroadcastAnyMessage = (toCheck: any): toCheck is BroadcastAnyMessage => {
  return toCheck.event && toCheck.content;
};

export const isMessageGetReaction = (
  toCheck: BroadcastAnyMessage,
): toCheck is MessageGetReaction => {
  return toCheck.event === BroadcastEents.messageGetReaction;
};

export const isNewMessage = (toCheck: BroadcastAnyMessage): toCheck is NewMessage => {
  return toCheck.event === BroadcastEents.newMessage;
};

export const isMessageHasEdited = (toCheck: BroadcastAnyMessage): toCheck is MessageHasEdited => {
  return toCheck.event === BroadcastEents.messageHasEdited;
};

export const isInvitedToChat = (toCheck: BroadcastAnyMessage): toCheck is InvitedToChat => {
  return toCheck.event === BroadcastEents.userHasInvitedToChat;
};
// END
