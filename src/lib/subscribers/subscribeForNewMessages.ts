import { ChatID } from '../../DataTypes/Chat/Chat.D';
import {
  BroadcastAnyMessage,
  isNewMessage,
  NewMessage,
} from '../interfaces/broadcastChannel/BroadcastInterface.D';

const subscribeForNewMessages =
  (chatID: ChatID | ChatID[], updateMessages: (data: NewMessage) => void) =>
  (data: BroadcastAnyMessage) => {
    if (!isNewMessage(data)) return;
    // we can subscribes for new messages in few chats
    if (Array.isArray(chatID) && !chatID.some((subChatID) => subChatID === data.content.chatID))
      return;
    if (typeof chatID === 'string' && data.content.chatID !== chatID) return;
    updateMessages(data);

    console.group('EVENT NewMessages');
    console.log('Fire for Chat/s', chatID);
    console.log('BroadcastAnyMessage', data);
    console.groupEnd();
  };

export default subscribeForNewMessages;
