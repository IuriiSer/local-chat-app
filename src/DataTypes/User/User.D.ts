import { version as uuidVersion, validate as uuidValidate } from 'uuid';
import { Chat, ChatID } from '../Chat/Chat.D';
import { DataFormatError } from '../Errors.D';
import { MessageID } from '../Message/Message.D';
import { DataInStoradge } from '../StorageInterface.D';

export type UserID = string;
// standart ID
export type UserLogin = string;
// the login to auth in user account
export type UserNickName = string;
// the nickname to show in chat and etc
export type UserPassword = string;
// user password to auth logining
export type UserChat = {
  _id: ChatID;
  // chat id the user take apart
  lastSeen: Date;
  // lastseen time
  lastReadedMessageID?: MessageID
  // need to show a count of unreaded messages
  chat?: Chat;
  // chat data can be implemented in chat service
};

export  type UserChatExtended = UserChat & Required<Pick<UserChat, 'chat'>>;

export type User = {
  _id: UserID;
  login: UserLogin;
  nickName: UserNickName;
  password: UserPassword;
  passwordRepeat?: UserPassword;
  chats: UserChat[];
  newUser?: boolean;
};

export type NewUser = Omit<User, '_id' | 'chats'> & { passwordRepeat: UserPassword };
// data to create new user

export type UserDataToUpdate = Partial<Omit<User, '_id' | 'chats'>>;
// in this case UserDataToUpdate is same with NewUser but patrial

export type UserOpenData = Omit<User, 'password' | 'chats' | 'session' | 'login'>;
// open user data that can be showed in front

export type UsersInStorage = DataInStoradge<User>;
// representaion of user in localStorage
// why object ->
// localStorage is slow and we will often send request to get UserOpenData
// it more faster to get data from {} by ID
// then use [].find() by id

/* TYPE GUARDS */
// 'cause every user have access to storage, we shoud every time to check do our data from localStorage is
// in requested format. We don`t need every time format in default server/client schema
// but in this task it was necessary
// THE MOST validators are simple and just check do toCheck contains requerid fields
export const isUser = (toCheck: any, requiredFields: string[]): toCheck is User => {
  if (typeof (toCheck as User) !== 'object') return false;
  return !requiredFields.some((field) => !toCheck[field]);
};

export const isUsersInStorage = (toCheck: any): toCheck is UsersInStorage => {
  return typeof (toCheck as UsersInStorage) === 'object';
};

export const isUserNickName = (toCheck: string): toCheck is UserNickName => {
  const nickNameValidator = getFieldValidator('isTrueNickName');
  if (!nickNameValidator) return false;
  return !!nickNameValidator.validate({ nickName: toCheck } as User);
};

export const isUserID = (toCheck: string): toCheck is UserID => {
  const idValidator = getFieldValidator('isTrueID');
  if (!idValidator) return false;
  return !!!idValidator.validate({ _id: toCheck } as User);
};

/* FIELDS ERRORS */
// Errors codes
export enum UserFieldsErrorDescription {
  emptyID = 'Empty ID',
  wrongID = 'Wrong ID format',
  emptyLogin = 'Login is empty',
  wrongLogin = 'Login should starts with @ and contain a-z, 0-9, -, _',
  loginIsBusy = 'Lofin is busy',
  emptyNickName = 'NickName is empty',
  wrongNickName = 'NickName should contain a-z, 0-9, .',
  emptyPassword = 'Password is empty',
  wrongPassword = 'Password have wrong format',
  shortPassword = 'Password should have atleast 6 symbols',
  passwordDontIncludeSpecSymbols = 'Password should have spec symbols',
  passwordIsNotSame = 'Passwords shoul be equal',
  wrongSigninPassword = 'Wrong password',
  wrongSigninLogin = 'User with the login doesn`t exist',
  shortNickName = 'Nickname should be longer. Minimun 4 symbols'
}

export type UserFieldError = DataFormatError<UserFieldsErrorDescription>;
// format of field errors

type UserFieldValidator = {
  name: string;
  // the unique name of validator
  validate(user: User): UserFieldError | null;
  // method that validate field
};

const userFieldValidators: UserFieldValidator[] = [
  {
    name: 'isTrueLogin',
    validate(user: User): UserFieldError | null {
      const { login } = user;
      const field = 'login';
      if (!login) return { field, err: UserFieldsErrorDescription.emptyLogin };
      const regex = /^@([a-z0-9]+|(_|-[a-z0-9])+){1,}$/;
      if (!regex.test(login)) return { field, err: UserFieldsErrorDescription.wrongLogin };
      return null;
    },
  },
  {
    name: 'isTrueID',
    validate(user: User): UserFieldError | null {
      const { _id } = user;
      const field = '_id';
      if (!_id) return { field, err: UserFieldsErrorDescription.emptyID };
      if (!uuidValidate(_id)) return { field, err: UserFieldsErrorDescription.wrongID };
      if (uuidVersion(_id) !== 4) return { field, err: UserFieldsErrorDescription.wrongID };
      return null;
    },
  },
  {
    name: 'isTrueNickName',
    validate(user: User): UserFieldError | null {
      const { nickName } = user;
      const field = 'nickName';
      if (!nickName) return { field, err: UserFieldsErrorDescription.emptyNickName };
      if (nickName.length < 4) return { field, err: UserFieldsErrorDescription.shortNickName };
      const regex = /^([a-z0-9]+|(.[a-z0-9])+){1,}$/;
      if (!regex.test(nickName)) return { field, err: UserFieldsErrorDescription.wrongNickName };
      return null;
    },
  },
  {
    name: 'isTruePassword',
    validate(user: User): UserFieldError | null {
      const { password } = user;
      const field = 'password';
      if (!password) return { field, err: UserFieldsErrorDescription.emptyPassword };
      if (password.length < 6) return { field, err: UserFieldsErrorDescription.shortPassword };
      const specSymbolRegex = /.{0,}\W/;
      if (!specSymbolRegex.test(password))
        return { field, err: UserFieldsErrorDescription.passwordDontIncludeSpecSymbols };
      return null;
    },
  },
];

const getFieldValidator = (name: string): UserFieldValidator | null => {
  return userFieldValidators.find((validator) => validator.name === name) || null;
};

export const getFieldValidators = (names: string[]): UserFieldValidator[] | null => {
  const validators = {} as { [validatorName: string]: UserFieldValidator };
  userFieldValidators.forEach((validator) => {
    validators[validator.name] = validator;
  });
  const res = names.map((name) => validators[name] || null).filter((validator) => !!validator);
  if (!res.length) return null;
  return res;
};

export const isTrueFormatUser = (newUser: User): UserFieldError[] | null => {
  const dataErrors = [] as UserFieldError[];
  userFieldValidators.forEach(({ validate }) => {
    const err = validate(newUser);
    if (!err) return;
    dataErrors.push(err);
  });
  if (dataErrors.length) return dataErrors;
  return null;
};

export const isCustomTrue = (
  user: User,
  validators: UserFieldValidator[],
): UserFieldError[] | null => {
  const dataErrors = [] as UserFieldError[];
  validators.forEach(({ validate }) => {
    const err = validate(user);
    if (!err) return;
    dataErrors.push(err);
  });
  if (dataErrors.length) return dataErrors;
  return null;
};
