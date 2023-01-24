import { useContext, useState, useEffect, useCallback } from 'react';
import { Message } from '../DataTypes/Message/Message.D';
import { NewMessage, ActionType } from '../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import subscribers from '../lib/subscribers';
import AppContext from '../components/AppContext/AppContext';

export type SetMessage = React.Dispatch<React.SetStateAction<Message[]>>;

type UseActiveChatManager = {
  messages: Message[];
  setMessages: SetMessage;
};

const useActiveChatManager = (): UseActiveChatManager => {
  const {
    bcService: { useSubscribe },
    messageService: { getMessages },
    userService: { authorizedUser },
    chatService: { activeChatID },
  } = useContext(AppContext);

  const [messages, setMessages] = useState<Message[]>([] as Message[]);

  useEffect(() => {
    if (!authorizedUser || !activeChatID) {
      setMessages([]);
      return;
    }
    const messagesFromStoradge = getMessages(activeChatID);
    setMessages(messagesFromStoradge);
  }, [authorizedUser, activeChatID, getMessages]);

  const addMessage = useCallback((data: NewMessage) => {
    setMessages((prev) => [...prev, data.content.message]);
  }, []);

  useSubscribe(subscribers.forNewMessages(activeChatID || '', addMessage), ActionType.recieve);

  return { messages, setMessages };
};

export default useActiveChatManager;
