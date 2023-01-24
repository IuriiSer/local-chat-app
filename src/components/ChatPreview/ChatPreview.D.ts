import { MessageID } from '../../DataTypes/Message/Message.D';
import { UserChat } from '../../DataTypes/User/User.D';

export interface ChatPreviewI {
  chat: UserChat;
  messages: MessageID[]
}
