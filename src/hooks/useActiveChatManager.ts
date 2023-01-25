import { useContext, useState, useEffect, useCallback } from 'react';
import { Message, MessageID, MessageMetafields } from '../DataTypes/Message/Message.D';
import {
  NewMessage,
  ActionType,
  MessageGetReaction,
} from '../lib/interfaces/broadcastChannel/BroadcastInterface.D';
import subscribers from '../lib/subscribers';
import AppContext from '../components/AppContext/AppContext';
import getUpdatedMessageForNewReaction from '../lib/helpers/getMessageDataForNewReaction';
import { Unified } from '../DataTypes/Message/MessageReaction.D';
import _ from 'lodash';

export type SetMessage = React.Dispatch<React.SetStateAction<Message[]>>;
export type SentMessage = (messageText: string, messageMetafields?: MessageMetafields) => void;
export type SentMessageReaction = (emojiID: Unified, messageID: MessageID) => void;

type UseActiveChatManager = {
  messages: Message[];
  sentMessage: SentMessage;
  sentMessageReaction: SentMessageReaction;
};

const useActiveChatManager = (): UseActiveChatManager => {
  const {
    bcService: { useSubscribe },
    messageService: { getMessages, sentMessage: serviceSentMessage, sentReaction },
    userService: { authorizedUser },
    chatService: { activeChatID },
  } = useContext(AppContext);

  const [messages, setMessages] = useState<Message[]>([] as Message[]);

  // update message for new active chat
  useEffect(() => {
    if (!authorizedUser || !activeChatID) {
      setMessages([]);
      return;
    }
    const messagesFromStoradge = getMessages(activeChatID);
    setMessages(messagesFromStoradge);
  }, [authorizedUser, activeChatID, getMessages]);

  // Logic to sent data
  // BEGIN
  // **********************
  // handle to sent messages
  const sentMessage = useCallback(
    (messageText: string, messageMetafields?: MessageMetafields) => {
      if (!activeChatID) return;
      if (!messageText.trim()) return;
      const newMessage = serviceSentMessage(activeChatID, messageText.trim(), messageMetafields);
      if (!newMessage) return;
      setMessages((prev) => [...prev, newMessage]);
    },
    [activeChatID, serviceSentMessage],
  );

  // handle to sent reaction
  const sentMessageReaction = useCallback(
    (emojiID: Unified, messageID: MessageID) => {
      if (!activeChatID || !authorizedUser) return;
      // get message to update
      const message = messages.find((messageInState) => messageInState._id === messageID);
      if (!message) return;
      // add reaction
      const newReaction = { emojiID, userID: authorizedUser._id };
      const updatedMessage = getUpdatedMessageForNewReaction(_.cloneDeep(message), newReaction);
      // sent data and update storadge
      sentReaction(activeChatID, updatedMessage, newReaction);
    },
    [activeChatID, authorizedUser, messages, sentReaction],
  );
  // **********************
  // END

  // Logic for subscribers
  // BEGIN
  // **********************
  // logic to add messages in state on MessageEvent
  const addMessageOnNewMessageEvent = useCallback((data: NewMessage) => {
    setMessages((prev) => [...prev, data.content.message]);
  }, []);

  // logic to add reaction in state on MessageGetReaction
  const addReactionOnGetNewEvent = useCallback(
    (data: MessageGetReaction) => {
      const messagesCloned = _.cloneDeep(messages);
      const message = messagesCloned.find(
        (messageInState) => messageInState._id === data.content.messageID,
      );

      console.log('file: useActiveChatManager.ts:91 ~ message', message);

      if (!message) return;
      const newReaction = {
        emojiID: data.content.reaction.emojiID,
        userID: data.content.reaction.userID,
      };
      getUpdatedMessageForNewReaction(message, newReaction);
      console.log('file: useActiveChatManager.ts:102 ~ message', message);
      setMessages(messagesCloned);
    },
    [messages],
  );

  useSubscribe(
    subscribers.forNewMessages(activeChatID || '', addMessageOnNewMessageEvent),
    ActionType.recieve,
  );

  useSubscribe(
    subscribers.forMessageGetReaction(activeChatID || '', addReactionOnGetNewEvent),
    ActionType.recieve,
  );
  // this a kind od majic :D We can subscribe for sending messages))
  // for example whe we send emoji and track it to update messages state
  useSubscribe(
    subscribers.forMessageGetReaction(activeChatID || '', addReactionOnGetNewEvent),
    ActionType.send,
  );
  // **********************
  // END

  return { messages, sentMessage, sentMessageReaction };
};

export default useActiveChatManager;
