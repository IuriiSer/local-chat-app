import { Chat, ChatID } from '../../../DataTypes/Chat/Chat.D';

export type GetChats = (query: ChatQuery) => Chat[] | Chat | null;
export type AddNewChat = (chat: Chat) => Chat;
export type UpdateChatData = (chat: Chat) => Chat;

export interface ChatQuery {
  chatIDs?: ChatID[];
}
