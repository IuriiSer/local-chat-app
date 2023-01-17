import { User } from './User';

export type UserOpenData = Omit<User, 'password' | 'chats' | 'session' | 'login'>;
