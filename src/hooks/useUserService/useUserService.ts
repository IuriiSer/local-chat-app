import { useState } from 'react';
import { NewUser, User, UserDataToUpdate } from '../../DataTypes/User/User.D';
import Interfaces from '../../lib/interfaces';
import loginPrototype from './login';
import signinPrototype from './signin';
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

  const login = loginPrototype(UserInterface.getUsers, setUser);
  const logout = () => setUser(null);

  const tryToSignin = signinPrototype(UserInterface.addNewUser, setUser);
  const signin = (newUser: NewUser): UserServiceResponce => {
    if (!user) return { status: UserServiceStatus.error, message: UserServiceMessage.alreadyAuth };
    return tryToSignin(newUser);
  };

	const tryToUpdate= updatePrototype(UserInterface.updateUserData, setUser)
	const update = (newData: UserDataToUpdate) => {
    if (!user) return { status: UserServiceStatus.error, message: UserServiceMessage.notAuth };
    return tryToUpdate(user, newData);
  };

  return { update, signin, login, logout, authorizedUser: user };
};

export default useUserService;
