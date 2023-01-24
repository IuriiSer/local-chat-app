import { ChatID } from "../../DataTypes/Chat/Chat.D";
import { Message, MessageID } from "../../DataTypes/Message/Message.D";

export type UseMessageService = {
  getMessages: (chatID: ChatID) => Message[];
  getMessage: (messageID: MessageID) => Message | null;
  addMessage: (chatID: string, messageText: string) => Message | null;
};
