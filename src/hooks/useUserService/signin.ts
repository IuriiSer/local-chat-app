import { isNewUser, NewUser, User } from '../../DataTypes/User/User.D';
import { AddNewUser } from '../../lib/interfaces/users/UserInterface.D';
import { SetUserState, UserServiceMessage, UserServiceResponce, UserServiceStatus } from './useUserService.D';
import { v4 as uuidv4 } from 'uuid';

const signinPrototype = (addUser: AddNewUser, setUser: SetUserState) => (newUser: NewUser): UserServiceResponce => {
  const user = {
    _id: uuidv4(),
    chats: [],
    ...newUser,
  } as User;

  const errs = isNewUser(user);
  if (errs) return { status: UserServiceStatus.error, track: errs, message: UserServiceMessage.wrongInput };

  addUser({ user });
  setUser(user);
  return { status: UserServiceStatus.ok };
};

export default signinPrototype;
