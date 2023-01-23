import { useRef, useEffect, useState, useCallback } from 'react';
import { Chat, ChatID } from '../../DataTypes/Chat/Chat.D';
import { User, UserID } from '../../DataTypes/User/User.D';
import Interfaces from '../../lib/interfaces';
import {
  Action,
  ActionType,
  BroadcastEents,
  BroadcastInterface,
} from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import { ChatServiceStatus, UseChatService } from './useChatService.D';
import { v4 as uuidv4 } from 'uuid';
import { MessageID } from '../../DataTypes/Message/Message.D';

const Channel = 'local-chat';

const useChatService = (user: User | null): UseChatService => {
  const [activeChatID, _setActiveChatID] = useState<ChatID | null>(null);
  const [chatServiceStatus, setChatServiceStatus] = useState<ChatServiceStatus>(
    ChatServiceStatus.offline,
  );
  /**
   * Logic to open new bcInterface when user will authorize
   */
  const bcInterface = useRef<BroadcastInterface | null>(null);
  useEffect(() => {
    if (!user) {
      if (bcInterface.current) {
        bcInterface.current.close();
        setChatServiceStatus(ChatServiceStatus.offline);
      }
      return;
    }
    console.group();
    console.log('open broadcastChanel');
    console.log('for user');
    console.log(user);
    console.groupEnd();

    setChatServiceStatus(ChatServiceStatus.online);
    bcInterface.current = Interfaces.broadcastPrototype(Channel);

    return () => {
      if (bcInterface.current) {
        bcInterface.current.close();
        setChatServiceStatus(ChatServiceStatus.offline);
      }
    };
  }, [user]);

  /**
   * Set ACtive chat handler
   */
  const setActiveChatID = useCallback(
    (chatID: ChatID): void => {
      if (chatID && chatID === activeChatID) return;
      _setActiveChatID(chatID);
    },
    [activeChatID],
  );

  /**
   * Logic to get all User chats data
   */
  const getChats = useCallback((): Chat[] | null => {
    if (!user) return null;
    return Interfaces.chat.getByQuery({ chatIDs: user.chats.map((chat) => chat._id) });
  }, [user]);

  /**
   * Hook to subscribe to Broadcast.omMessage events
   * @param action Action that will fire on actionType event
   * @param actionType ActionType
   */
  const useSubscribe = (action: Action, actionType: ActionType) => {
    useEffect(() => {
      if (!bcInterface.current) return;
      const _id = uuidv4();
      bcInterface.current.subscribe({ _id, actionType, action });

      console.group();
      console.log('New subscriber');
      console.log(`For ${actionType} messages`);
      console.log(action);
      console.groupEnd();

      return () => {
        if (!bcInterface.current) return;
        bcInterface.current.unsubscribe({ idToUnsubscribe: _id, actionType });
      };
    }, []);
  };

  /**
   * Logic to create new chat and fire event in bcInterface
   */
  const createNewChat = useCallback(
    (toUserID: UserID) => {
      if (!user || !bcInterface.current) return;
      const newChat = {
        _id: uuidv4(),
        users: [user._id, toUserID],
        messages: [] as MessageID[],
        owner: user._id,
      };
      Interfaces.chat.addNew(newChat);
      bcInterface.current.sentData({
        event: BroadcastEents.userHasInvitedToChat,
        content: { chatID: newChat._id, from: user._id, to: toUserID },
      });
    },
    [user],
  );

  const exitFromChat = useCallback(
    (chatID: ChatID) => {
      if (!user) return;
      const res = Interfaces.chat.getByQuery({ chatIDs: [chatID] });
      if (!res) return;
      const [chatData] = res;

      const newChatUsers = chatData.users.filter((userInChat) => userInChat !== user._id);
      if (newChatUsers.length === chatData.users.length) return;

      Interfaces.chat.updateData({ ...chatData, users: newChatUsers });
    },
    [user],
  );

  return {
    getChats,
    setActiveChatID,
    activeChatID,
    chatServiceStatus,
    useSubscribe,
    createNewChat,
    exitFromChat,
  };
};

export default useChatService;
