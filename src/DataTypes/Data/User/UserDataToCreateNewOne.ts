import { User } from './User';

export type UserDataToCreateNewOne = Omit<User, '_id' | 'chats'>;
