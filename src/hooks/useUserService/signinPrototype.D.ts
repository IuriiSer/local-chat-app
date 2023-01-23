import { User, UserLogin, UserPassword } from '../../DataTypes/User/User.D';

export enum LoginStatus {
  ok = 'ok',
  wrongLoginOrPassword = 'Wrong login or password',
  errorInStorage = 'Storage is damaged, this user don`t have required fields',
}

export interface LoginI {
  login: UserLogin;
  password: UserPassword;
}
