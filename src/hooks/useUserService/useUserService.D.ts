import { ServiceResponce } from '../../DataTypes/ServiceResponce.D';
import { NewUser, User, UserFieldError } from '../../DataTypes/User/User.D';
import { LoginI, LoginR } from './login.D';

export type Logout = () => void;

export enum UserServiceStatus {
  ok,
  error,
}

export enum UserServiceMessage {
  ok = 'ok',
  error = 'error',
  wrongInput = 'wrongInput',
  alreadyAuth = 'you are already authorized',
}

export type UserServiceResponce = ServiceResponce<
  UserServiceStatus,
  UserServiceMessage,
  UserFieldError[] | null
>;

export type UseUserService = {
  authorizedUser: User | null;
  signin: (newUser: NewUser) => UserServiceResponce;
  update: Function;
  logout: Logout;
  login: ({ login, password }: LoginI) => LoginR;
};

export type SetUserState = React.Dispatch<React.SetStateAction<User | null>>;
