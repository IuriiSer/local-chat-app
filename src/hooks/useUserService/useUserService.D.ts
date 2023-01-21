import { ServiceResponce } from '../../DataTypes/ServiceResponce.D';
import {
  NewUser,
  User,
  UserDataToUpdate,
  UserFieldError,
  UserOpenData,
} from '../../DataTypes/User/User.D';
import { GetUsersI } from '../../lib/interfaces/users/lib/getUsers.D';
import { LoginI, LoginR } from './signinPrototype.D';

export type Logout = () => void;

export enum UserServiceStatus {
  ok = 'ok',
  error = 'error',
}

export enum UserServiceMessage {
  ok = 'ok',
  error = 'error',
  wrongInput = 'wrongInput',
  alreadyAuth = 'you are already authorized',
  notAuth = 'you are not authorized',
}

export type UserServiceResponce = ServiceResponce<
  UserServiceStatus,
  UserServiceMessage,
  UserFieldError[] | null
>;

export type Signup = (newUser: NewUser) => UserServiceResponce;
export type Signin = ({ login, password }: LoginI) => UserServiceResponce;

export type UseUserService = {
  authorizedUser: User | null;
  signup: Signup;
  update: (newData: UserDataToUpdate) => UserServiceResponce;
  logout: () => void;
  signin: Signin;
  getUsers: ({ query }: GetUsersI) => UserOpenData | UserOpenData[] | null;
};

export type SetUserState = React.Dispatch<React.SetStateAction<User | null>>;
