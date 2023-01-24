import Drivers from '../../drivers';
import { StorageDriverR } from '../../drivers/storage/StorageDriver.D';
import { ChatsCache } from '../../../DataTypes/Chat/Chat.D';
import { StorageInterface } from '../../../DataTypes/StorageInterface.D';
import { GetMessage, WriteMessage, UpdateMessageData, MessagesQuery } from './MessagesInterface.D';
import { Message, MessageInStorage } from '../../../DataTypes/Message/Message.D';

class MessageInterface extends StorageInterface<GetMessage, WriteMessage, UpdateMessageData> {
  private storageDriver: StorageDriverR<MessageInStorage>;
  private cache: ChatsCache;

  constructor() {
    super();
    this.storageDriver = Drivers.storage.driver({ fieldName: 'messages' });
    this.cache = {};
  }

  private getAll(): MessageInStorage {
    return this.storageDriver.getDataInStorage() || {};
  }

  getByQuery = (query: MessagesQuery): Message[] => {
    const messages = this.getAll();
    const res = [] as Message[];
    query.messageIDs.forEach((messageID) => {
      if (messages[messageID]) res.push(messages[messageID]);
    });

    return res;
  };

  addNew = (message: Message): void => {
    this.storageDriver.addDataInStorage({ newData: { [message._id]: message } });
  };

  updateData = (message: Message): void => {
    this.storageDriver.addDataInStorage({ newData: { [message._id]: message } });
  };

  eraseCache = (): void => {
    this.cache = {};
  };
}

const chatInterface = new MessageInterface();
export default chatInterface;
