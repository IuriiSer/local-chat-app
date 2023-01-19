import { isTrueFormatUser, UserDataToUpdate, User } from '../../DataTypes/User/User.D';
import { UpdateUserData } from '../../lib/interfaces/users/UserInterface.D';
import { SetUserState, UserServiceMessage, UserServiceResponce, UserServiceStatus } from './useUserService.D';

const updatePrototype = (updateUser: UpdateUserData, setUser: SetUserState) => (authUser: User, newData: UserDataToUpdate): UserServiceResponce => {
  const user = {
    ...authUser,
    ...newData,
  } as User;

  const errs = isTrueFormatUser(user);
  if (errs) return { status: UserServiceStatus.error, track: errs, message: UserServiceMessage.wrongInput };

  updateUser({ user });
  setUser(user);
  return { status: UserServiceStatus.ok };
};

export default updatePrototype;
