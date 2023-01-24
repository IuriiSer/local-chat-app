import { ChatID } from '../../DataTypes/Chat/Chat.D';
import { UserChatExtended, UserID } from '../../DataTypes/User/User.D';

export enum ChatServiceStatus {
  online = 'online',
  offline = 'offline',
}

export interface GetChatsI {
  checkInStoradge?: boolean;
}

export type UseChatService = {
  activeChatID: ChatID | null;
  setActiveChatID: (chatID: ChatID) => void;
  getChats: (args?: GetChatsI) => UserChatExtended[] | null;
  createNewChat: (toUserID: UserID) => void;
  exitFromChat: (chatID: ChatID) => void;
};
