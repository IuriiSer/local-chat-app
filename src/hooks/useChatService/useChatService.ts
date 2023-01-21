import { useRef, useEffect, useState } from 'react';
import { ChatID } from '../../DataTypes/Chat/Chat.D';
import { User } from '../../DataTypes/User/User.D';
import Interfaces from '../../lib/interfaces';
import { BroadcastInterface } from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import { ChatServiceStatus } from './useChatService.D';

const Channel = 'local-chat';

const useChatService = (user: User | null) => {
  const [activeChatID, _setActiveChatID] = useState<ChatID | null>(null);
  const [chatServiceStatus, setChatServiceStatus] = useState<ChatServiceStatus>(
    ChatServiceStatus.offline,
  );
  const channel = useRef<BroadcastInterface | null>(null);

  const setActiveChatID = (chatID: ChatID): void => {
    if (chatID && chatID === activeChatID) return;
    _setActiveChatID(chatID);
  };

  useEffect(() => {
    if (!user) {
      if (channel.current) {
        channel.current.close();
        channel.current = null;
        setChatServiceStatus(ChatServiceStatus.offline);
      }
      return;
    }
    console.group();
    console.log('open broadcastChanel');
    console.log('for user');
    console.log(user)
    console.groupEnd();
    
    setChatServiceStatus(ChatServiceStatus.online);
    channel.current = Interfaces.broadcastPrototype(Channel, user.chats);
    
    return () => {
      if (channel.current) {
        channel.current.close();
        channel.current = null;
        setChatServiceStatus(ChatServiceStatus.offline);
      }
    };
  }, [user]);

  return { setActiveChatID, activeChatID, chatServiceStatus };
};

export default useChatService;
