import { isUser, User } from '../../DataTypes/User/User.D';
import { GetUsers } from '../../lib/interfaces/users/UserInterface.D';
import { LoginI, LoginR, LoginStatus } from './signinPrototype.D';
import { UserServiceMessage, UserServiceResponce, UserServiceStatus } from './useUserService.D';

const signinPrototype =
  (getUsers: GetUsers, setUser: React.Dispatch<React.SetStateAction<User | null>>) =>
  ({ login, password }: LoginI): UserServiceResponce => {
    const query = { userLogin: login };
    const user = getUsers({ query }) as User | null;

    if (!user)
      return { status: UserServiceStatus.error, message: LoginStatus.wrongLoginOrPassword };
    if (!isUser(user, ['password']))
      return { status: UserServiceStatus.error, message: LoginStatus.errorInStorage };
    if (user.password !== password)
      return { status: UserServiceStatus.error, message: LoginStatus.wrongLoginOrPassword };
    setUser(user);
    return { status: UserServiceStatus.ok };
  };

export default signinPrototype;
