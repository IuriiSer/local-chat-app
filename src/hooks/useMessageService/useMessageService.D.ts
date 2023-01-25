import { ChatID } from '../../DataTypes/Chat/Chat.D';
import { Message, MessageID, MessageMetafields } from '../../DataTypes/Message/Message.D';
import { MessageNewReaction } from '../../DataTypes/Message/MessageReaction.D';

export type UseMessageService = {
  getMessages: (chatID: ChatID) => Message[];
  getMessage: (messageID: MessageID) => Message | null;
  sentMessage: (chatID: string, messageText: string, extraData?: MessageMetafields) => Message | null;
  sentReaction: (chatID: string, message: Message, reaction: MessageNewReaction) => void;
    // you should pass updated message data
};

// info about messages type are in interface
