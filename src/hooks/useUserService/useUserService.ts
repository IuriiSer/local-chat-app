import { useState, useCallback } from 'react';
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
  const signin = useCallback(
    ({ login, password }: LoginI): UserServiceResponce => {
      const tryToSignin = signinPrototype(UserInterface.getByQuery, setUser);
      if (user) return { status: UserServiceStatus.error, message: UserServiceMessage.alreadyAuth };
      return tryToSignin({ login, password });
    },
    [user],
  );
  /* END */

  /* LOGOUT logic */
  const logout = () => {
    UserInterface.eraseCache();
    setUser(null);
  };
  /* END */

  /* GET USERS open info logic */
  const getUsers = useCallback(({ query }: GetUsersI): UserOpenData | UserOpenData[] | null => {
    const users = UserInterface.getByQuery({ query });
    if (!users) return null;
    if (Array.isArray(users)) return users.map(convertOpenUserData);
    return convertOpenUserData(users);
  }, []);
  /* END */

  /* SIGNUP / REGISTRATION logic */
  const signup = useCallback(
    (newUser: NewUser): UserServiceResponce => {
      const tryToSignup = signupPrototype(UserInterface.addNew, setUser);
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
    },
    [user, getUsers],
  );
  /* END */

  /* UPDATE user info logic */
  const update = useCallback(
    (newData: UserDataToUpdate): UserServiceResponce => {
      const tryToUpdate = updatePrototype(UserInterface.updateData, setUser);
      if (!user) return { status: UserServiceStatus.error, message: UserServiceMessage.notAuth };
      return tryToUpdate(user, newData);
    },
    [user],
  );
  /* END */

  return { update, signup, signin, logout, authorizedUser: user, getUsers };
};

export default useUserService;
