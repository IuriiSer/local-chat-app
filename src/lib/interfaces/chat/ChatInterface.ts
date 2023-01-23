import Drivers from '../../drivers';
import { StorageDriverR } from '../../drivers/storage/StorageDriver.D';
import { ChatInStorage, ChatsCache } from '../../../DataTypes/Chat/Chat.D';
import { StorageInterface } from '../../../DataTypes/StorageInterface.D';
import { AddNewChat, ChatQuery, GetChats, UpdateChatData } from './ChatInterface.D';
import { Chat } from '../../../DataTypes/Chat/Chat.D';

class ChatInterface extends StorageInterface<GetChats, AddNewChat, UpdateChatData> {
  private storageDriver: StorageDriverR<ChatInStorage>;
  private cache: ChatsCache;

  constructor() {
    super();
    this.storageDriver = Drivers.storage.driver({ fieldName: 'chats' });
    this.cache = {};
  }

  private getAll(): ChatInStorage {
    return this.storageDriver.getDataInStorage() || {};
  }

  getByQuery = (query: ChatQuery): Chat[] | null => {
    const chats = this.getAll();
    const res = [] as Chat[];
    query.chatIDs.forEach((chatID) => {
      const chat = chats[chatID];
      if (chat) res.push(chat);
    });
    return (res.length && res) || null;
  };

  addNew = (chat: Chat): Chat => {
    this.storageDriver.addDataInStorage({ newData: { [chat._id]: chat } });
    return chat;
  };

  updateData = (chat: Chat): Chat => {
    this.storageDriver.addDataInStorage({ newData: { [chat._id]: chat } });
    return chat;
  };

  eraseCache = (): void => {
    this.cache = {};
  };
}

const chatInterface = new ChatInterface();
export default chatInterface;
