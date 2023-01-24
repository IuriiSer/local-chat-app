import { UserID } from '../../DataTypes/User/User.D';
import {
  BroadcastAnyMessage,
  isInvitedToChat,
} from '../interfaces/broadcastChannel/BroadcastInterface.D';

const subscribeForNewChats =
  (userID: UserID, updateChats: () => void) => (data: BroadcastAnyMessage) => {
    if (!isInvitedToChat(data)) return;
    if (data.content.to !== userID) return;
    updateChats();

    console.group('EVENT NewChats');
    console.log('ReciverUser', userID);
    console.log('BroadcastAnyMessage', data);
    console.groupEnd();
  };

export default subscribeForNewChats;
