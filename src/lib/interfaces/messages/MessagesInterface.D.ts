import { Message, MessageID } from '../../../DataTypes/Message/Message.D';

export type GetMessage = (query: MessagesQuery) => Message[];
export type WriteMessage = (message: Message) => void;
export type UpdateMessageData = (message: Message) => void;

export interface MessagesQuery {
  messageIDs: MessageID[];
}
