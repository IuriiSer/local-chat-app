import { isTrueFormatUser, NewUser, User } from '../../DataTypes/User/User.D';
import { AddNewUser } from '../../lib/interfaces/users/UserInterface.D';
import {
  SetUserState,
  UserServiceMessage,
  UserServiceResponce,
  UserServiceStatus,
} from './useUserService.D';
import { v4 as uuidv4 } from 'uuid';

const signupPrototype =
  (addUser: AddNewUser, setUser: SetUserState) =>
  (newUser: NewUser): UserServiceResponce => {
    const user = {
      _id: uuidv4(),
      chats: [],
      newUser: true,
      ...newUser,
    } as User;

    const errs = isTrueFormatUser(user);
    if (errs)
      return {
        status: UserServiceStatus.error,
        track: errs,
        message: UserServiceMessage.wrongInput,
      };

    setUser(user);
    delete user.passwordRepeat;
    delete user.newUser;
    addUser({ user });
    return { status: UserServiceStatus.ok };
  };

export default signupPrototype;
