import { useContext, useState, useEffect, useCallback } from 'react';
import { UserChatExtended } from '../DataTypes/User/User.D';
import { NewMessage, ActionType } from '../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import subscribers from '../lib/subscribers';
import AppContext from '../components/AppContext/AppContext';

interface UseChatsManager {
  chatsData: UserChatExtended[];
}

/**
 * Hook to keep actual chat data
 * Used data used in sidebar element
 * @returns UserChatExtended[]
 */
const useChatsManager = (): UseChatsManager => {
  // get required Context
  const {
    bcService: { useSubscribe },
    chatService: { getChats },
    userService: { authorizedUser, updateUserState },
  } = useContext(AppContext);
  // init chats data buffer
  const [chatsData, setChatsData] = useState<UserChatExtended[]>(() => getChats() || []);

  // hook to upload chat data for first render
  useEffect(() => {
    const chats = getChats({ checkInStoradge: true });
    if (!chats) return;
    setChatsData(chats);
  }, [authorizedUser, getChats]);

  // method to directly update current chats data
  // it need to prevent rerenders depends on User global state
  const updateChats = useCallback((data: NewMessage) => {
    setChatsData((currChatState) => {
      const {
        content: { chatID, message },
      } = data;
      return currChatState.map((chatData) => {
        if (chatData._id !== chatID || !chatData.chat) return chatData;
        chatData.chat.messages.push(message._id);
        return chatData;
      });
    });
  }, []);

  // init subscriber for newChat invites
  useSubscribe(
    subscribers.forNewChats(authorizedUser?._id || '', updateUserState),
    ActionType.recieve,
  );

  // init subscriber for newMessages to count unreaded
  useSubscribe(
    subscribers.forNewMessages(
      chatsData.map((chatData) => chatData._id),
      updateChats,
    ),
    ActionType.recieve,
  );

  return { chatsData };
};

export default useChatsManager;
