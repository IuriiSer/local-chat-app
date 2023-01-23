import {
  getFieldValidators,
  isCustomTrue,
  isUser,
  User,
  UserFieldsErrorDescription,
} from '../../DataTypes/User/User.D';
import { GetUsers } from '../../lib/interfaces/users/UserInterface.D';
import { LoginI, LoginStatus } from './signinPrototype.D';
import { UserServiceResponce, UserServiceStatus } from './useUserService.D';

const trueLoginValidators = getFieldValidators(['isTrueLogin', 'isTruePassword']);
if (!trueLoginValidators)
  throw new Error('Empty valodator. src/hooks/useUserService/signinPrototype.ts');

const signinPrototype =
  (getUsers: GetUsers, setUser: React.Dispatch<React.SetStateAction<User | null>>) =>
  ({ login, password }: LoginI): UserServiceResponce => {
    const query = { userLogin: login };
    const user = getUsers({ query }) as User | null;

    const inputErrors = isCustomTrue({ login, password } as User, trueLoginValidators);
    if (inputErrors)
      return {
        status: UserServiceStatus.error,
        track: inputErrors,
      };
    if (!user)
      return {
        status: UserServiceStatus.error,
        track: [
          {
            field: 'login',
            err: UserFieldsErrorDescription.wrongSigninLogin,
          },
        ],
      };
    if (!isUser(user, ['password'])) throw new Error(LoginStatus.errorInStorage);
    if (user.password !== password)
      return {
        status: UserServiceStatus.error,
        track: [
          {
            field: 'password',
            err: UserFieldsErrorDescription.wrongSigninPassword,
          },
        ],
      };
    setUser(user);
    return { status: UserServiceStatus.ok };
  };

export default signinPrototype;
