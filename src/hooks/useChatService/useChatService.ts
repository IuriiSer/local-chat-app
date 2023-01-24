import { useState, useCallback } from 'react';
import { ChatID, ChatInStorage } from '../../DataTypes/Chat/Chat.D';
import { isTrueFormatUser, isUser, User, UserChat, UserChatExtended, UserID } from '../../DataTypes/User/User.D';
import Interfaces from '../../lib/interfaces';
import {
  BroadcastAnyMessage,
  BroadcastEents,
} from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import { GetChatsI, UseChatService } from './useChatService.D';
import { v4 as uuidv4 } from 'uuid';
import { MessageID } from '../../DataTypes/Message/Message.D';
import findChatWithSameUsers from './lib/findChatWithSameUsers';

const useChatService = (
  user: User | null,
  updateUserState: () => void,
  sentData: ((data: BroadcastAnyMessage) => void),
): UseChatService => {
  const [activeChatID, _setActiveChatID] = useState<ChatID | null>(null);

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
  const getChats = useCallback(
    (args?: GetChatsI): UserChatExtended[] | null => {
      if (!user) return null;
      let userChats = user.chats;
      if (args?.checkInStoradge) {
        const userInStorage = Interfaces.user.getByQuery({ query: { userLogin: user.login } });
        if (userInStorage && !Array.isArray(userInStorage)) userChats = userInStorage.chats;
      }
      const chatData =
        Interfaces.chat.getByQuery({ chatIDs: userChats.map((chat) => chat._id) }) || [];
      const chatCache = {} as ChatInStorage;
      chatData.forEach((chat) => {
        chatCache[chat._id] = chat;
      });
      return user.chats
        .map((chatData) => ({ ...chatData, chat: chatCache[chatData._id] }))
        .filter((chatData) => !!chatData.chat);
    },
    [user],
  );

  /**
   * Logic to create new chat and fire event in bcInterface
   */
  const createNewChat = useCallback(
    (toUserID: UserID) => {
      // validation do we can to create chat
      if (!user) return;
      const rawData = Interfaces.user.getByQuery({ query: { userIDs: [toUserID] } });
      if (!Array.isArray(rawData)) return;
      if (!rawData.length) return;
      const [toUserData] = rawData;
      if (!isUser(toUserData, ['_id']) || isTrueFormatUser(toUserData)) return;
      // validate do we already have chat
      const chatIdWithSameUsers = findChatWithSameUsers(getChats() || [], toUserData._id);
      if (chatIdWithSameUsers) {
        setActiveChatID(chatIdWithSameUsers);
        return;
      }
      // creating new chat
      const newChat = {
        _id: uuidv4(),
        users: [user._id, toUserID],
        messages: [] as MessageID[],
        owner: user._id,
      };
      const newUserChat = { _id: newChat._id, lastSeen: new Date() } as UserChat;
      // update data in storage
      Interfaces.chat.addNew(newChat);
      const newUserData = { ...user, chats: [...user.chats, newUserChat] };
      const newToUserData = { ...toUserData, chats: [...toUserData.chats, newUserChat] };
      Interfaces.user.updateData({ user: newUserData });
      Interfaces.user.updateData({ user: newToUserData });

      // fire the action
      sentData({
        event: BroadcastEents.userHasInvitedToChat,
        content: { chatID: newChat._id, from: user._id, to: toUserID },
      });

      // update state
      updateUserState();
      setActiveChatID(newChat._id);
    },
    [user, sentData],
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

      updateUserState();
    },
    [user],
  );

  return {
    getChats,
    setActiveChatID,
    activeChatID,
    createNewChat,
    exitFromChat,
  };
};

export default useChatService;
