import { isUser, User } from '../../DataTypes/User/User.D';
import { GetUsers } from '../../lib/interfaces/users/UserInterface.D';
import { LoginI, LoginR, LoginStatus } from './login.D';

const loginPrototype =
  (getUsers: GetUsers, setUser: React.Dispatch<React.SetStateAction<User | null>>) =>
  ({ login, password }: LoginI): LoginR => {
    const query = { userLogin: login };
    const user = getUsers({ query }) as User | null;

    if (!user) return { status: LoginStatus.wrongLoginOrPassword };
    if (!isUser(user, ['password'])) return { status: LoginStatus.wrongLoginOrPassword };
    if (user.password !== password) return { status: LoginStatus.wrongLoginOrPassword };
    setUser(user);
    return { status: LoginStatus.ok };
  };

export default loginPrototype;
