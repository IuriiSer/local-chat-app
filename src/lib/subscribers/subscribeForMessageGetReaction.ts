import { ChatID } from '../../DataTypes/Chat/Chat.D';
import {
  BroadcastAnyMessage,
  isMessageGetReaction,
  MessageGetReaction,
} from '../interfaces/broadcastChannel/BroadcastInterface.D';

const subscribeForMessageGetReaction =
  (chatID: ChatID, updateMessages: (data: MessageGetReaction) => void) =>
  (data: BroadcastAnyMessage) => {
    if (!isMessageGetReaction(data)) return;
    if (data.content.chatID !== chatID) return;
    updateMessages(data);

    console.group('EVENT MessageGetReaction');
    console.log('Fire for Chat', chatID);
    console.log('MessageGetReaction', data);
    console.groupEnd();
  };

export default subscribeForMessageGetReaction;
