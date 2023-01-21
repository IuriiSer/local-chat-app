import { useState } from 'react';
import {
  NewUser,
  User,
  UserDataToUpdate,
  UserFieldsErrorDescription,
  UserOpenData,
} from '../../DataTypes/User/User.D';
import convertOpenUserData from '../../lib/converters/users/convertOpenUserData';
import Interfaces from '../../lib/interfaces';
import { GetUsersI } from '../../lib/interfaces/users/lib/getUsers.D';
import signinPrototype from './signinPrototype';
import { LoginI } from './signinPrototype.D';
import signupPrototype from './signupPrototype';
import updatePrototype from './update';
import {
  UserServiceMessage,
  UserServiceResponce,
  UserServiceStatus,
  UseUserService,
} from './useUserService.D';
const { user: UserInterface } = Interfaces;

const useUserService = (): UseUserService => {
  const [user, setUser] = useState<User | null>(null);

  /* SIGIN logic */
  const tryToSignin = signinPrototype(UserInterface.getUsers, setUser);
  const signin = ({ login, password }: LoginI): UserServiceResponce => {
    if (user) return { status: UserServiceStatus.error, message: UserServiceMessage.alreadyAuth };
    return tryToSignin({ login, password });
  };
  /* END */

  /* LOGOUT logic */
  const logout = () => {
    UserInterface.eraseCache();
    setUser(null);
  };
  /* END */

  /* SIGNUP / REGISTRATION logic */
  const tryToSignup = signupPrototype(UserInterface.addNewUser, setUser);
  const signup = (newUser: NewUser): UserServiceResponce => {
    if (user) return { status: UserServiceStatus.error, message: UserServiceMessage.alreadyAuth };
    if (newUser.password !== newUser.passwordRepeat)
      return {
        status: UserServiceStatus.error,
        track: [
          { field: 'password', err: UserFieldsErrorDescription.passwordIsNotSame },
          { field: 'passwordRepeat', err: UserFieldsErrorDescription.passwordIsNotSame },
        ],
      };
    if (getUsers({ query: { userLogin: newUser.login } }))
      return {
        status: UserServiceStatus.error,
        track: [{ field: 'nickName', err: UserFieldsErrorDescription.loginIsBusy }],
      };
    return tryToSignup(newUser);
  };
  /* END */

  /* UPDATE user info logic */
  const tryToUpdate = updatePrototype(UserInterface.updateUserData, setUser);
  const update = (newData: UserDataToUpdate): UserServiceResponce => {
    if (!user) return { status: UserServiceStatus.error, message: UserServiceMessage.notAuth };
    return tryToUpdate(user, newData);
  };
  /* END */

  /* GET USERS open info logic */
  const getUsers = ({ query }: GetUsersI): UserOpenData | UserOpenData[] | null => {
    const users = UserInterface.getUsers({ query });
    if (!users) return null;
    if (Array.isArray(users)) return users.map(convertOpenUserData);
    return convertOpenUserData(users);
  };
  /* END */

  return { update, signup, signin, logout, authorizedUser: user, getUsers };
};

export default useUserService;
