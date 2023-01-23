import { Chat, ChatID } from '../../DataTypes/Chat/Chat.D';
import { UserID } from '../../DataTypes/User/User.D';
import { Action, ActionType } from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';

export type useMessageService = {};

export enum ChatServiceStatus {
  online = 'online',
  offline = 'offline',
}

export type UseChatService = {
  activeChatID: ChatID | null;
  chatServiceStatus: ChatServiceStatus;
  setActiveChatID: (chatID: ChatID) => void;
  getChats: () => Chat[] | null;
  useSubscribe: (action: Action, actionType: ActionType) => void;
  createNewChat: (toUserID: UserID) => void;
  exitFromChat: (chatID: ChatID) => void;
};
