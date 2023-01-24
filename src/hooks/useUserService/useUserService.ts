import { useState, useCallback, useMemo } from 'react';
import {
  isTrueFormatUser,
  isUser,
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
  const tryToSignin = useMemo(() => signinPrototype(UserInterface.getByQuery, setUser), []);
  const signin = useCallback(
    ({ login, password }: LoginI): UserServiceResponce => {
      if (user) return { status: UserServiceStatus.error, message: UserServiceMessage.alreadyAuth };
      return tryToSignin({ login, password });
    },
    [tryToSignin, user],
  );
  /* END */

  /* LOGOUT logic */
  const logout = () => {
    UserInterface.eraseCache();
    setUser(null);
  };
  /* END */

  /* GET USERS open info logic */
  const getUsers = useCallback(
    ({ query }: GetUsersI): UserOpenData | UserOpenData[] | null => {
      if (!user) return null;
      const users = UserInterface.getByQuery({ query });
      if (!users) return null;
      if (Array.isArray(users))
        return users.map(convertOpenUserData).filter((_user) => _user._id !== user._id);
      return (users._id !== user._id && convertOpenUserData(users)) || null;
    },
    [user],
  );
  /* END */

  /* SIGNUP / REGISTRATION logic */
  const tryToSignup = useMemo(() => signupPrototype(UserInterface.addNew, setUser), []);
  const signup = useCallback(
    (newUser: NewUser): UserServiceResponce => {
      if (user) return { status: UserServiceStatus.error, message: UserServiceMessage.alreadyAuth };
      if (newUser.password !== newUser.passwordRepeat)
        return {
          status: UserServiceStatus.error,
          track: [
            { field: 'password', err: UserFieldsErrorDescription.passwordIsNotSame },
            { field: 'passwordRepeat', err: UserFieldsErrorDescription.passwordIsNotSame },
          ],
        };
      if (Interfaces.user.getByQuery({ query: { userLogin: newUser.login } }))
        return {
          status: UserServiceStatus.error,
          track: [{ field: 'login', err: UserFieldsErrorDescription.loginIsBusy }],
        };
      return tryToSignup(newUser);
    },
    [user, tryToSignup],
  );
  /* END */

  /* UPDATE user info logic */
  const tryToUpdate = useMemo(() => updatePrototype(UserInterface.updateData, setUser), []);
  const update = useCallback(
    (newData: UserDataToUpdate): UserServiceResponce => {
      if (!user) return { status: UserServiceStatus.error, message: UserServiceMessage.notAuth };
      return tryToUpdate(user, newData);
    },
    [tryToUpdate, user],
  );
  /* END */

  /* Logic to diractly update user state  */
  const updateUserState = useCallback(() => {
    if (!user) return;
    const rawData = Interfaces.user.getByQuery({ query: { userIDs: [user._id] } });
    if (!Array.isArray(rawData)) return;
    if (!rawData.length) return;
    const [toUserData] = rawData;
    if (!isUser(toUserData, ['_id']) || isTrueFormatUser(toUserData)) return;
    setUser(toUserData);
  }, [user]);
  /* END */

  return { update, signup, signin, logout, authorizedUser: user, getUsers, updateUserState };
};

export default useUserService;
