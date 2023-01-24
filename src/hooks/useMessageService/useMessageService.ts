import { useCallback } from 'react';
import { ChatID } from '../../DataTypes/Chat/Chat.D';
import { User } from '../../DataTypes/User/User.D';
import Interfaces from '../../lib/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Message, MessageID } from '../../DataTypes/Message/Message.D';
import {
  BroadcastAnyMessage,
  BroadcastEents,
} from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import { UseMessageService } from './useMessageService.D';

const useMessageService = (
  user: User | null,
  sentData: ((data: BroadcastAnyMessage) => void) | null,
): UseMessageService => {
  const getMessage = useCallback(
    (messageID: MessageID): Message | null => {
      if (!user) return null;
      const messages = Interfaces.message.getByQuery({ messageIDs: [messageID] });
      if (!messages.length) return null;
      const [message] = messages;
      return message;
    },
    [user],
  );

  const getMessages = useCallback(
    (chatID: ChatID): Message[] => {
      if (!user) return [];
      if (!user.chats.some((chat) => chat._id === chatID)) return [];
      const chatArr = Interfaces.chat.getByQuery({ chatIDs: [chatID] });
      if (!Array.isArray(chatArr) || !chatArr.length) return [];
      const [chat] = chatArr;
      return Interfaces.message.getByQuery({ messageIDs: chat.messages });
    },
    [user],
  );

  const addMessage = useCallback(
    (chatID: string, messageText: string): Message | null => {
      if (!user || !sentData) return null;
      if (!user.chats.some((chat) => chat._id === chatID)) return null;
      const newMessage = {
        _id: uuidv4(),
        data: {},
        owner: user._id,
        sentDate: new Date(),
      } as Message;
      newMessage.data = { text: messageText };
      const chatToModify = Interfaces.chat.getByQuery({ chatIDs: [chatID] });
      if (!Array.isArray(chatToModify) || !chatToModify.length) return null;
      const [chat] = chatToModify;
      Interfaces.chat.updateData({ ...chat, messages: [...chat.messages, newMessage._id] });
      Interfaces.message.addNew(newMessage);
      sentData({ event: BroadcastEents.newMessage, content: { chatID, message: newMessage } });
      return newMessage;
    },
    [user, sentData],
  );

  const updateMessage = useCallback(() => {}, []);

  return { getMessages, getMessage, addMessage };
};

export default useMessageService;
