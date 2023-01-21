import { User, NewUser, UserFieldError } from '../../../DataTypes/User/User.D';
import { GetUsersI, GetUsersR } from './lib/getUsers.D';

export type GetUsers = ({ query }: GetUsersI) => GetUsersR;
export type AddNewUser = ({ user }: { user: User }) => User;
export type UpdateUserData = ({ user }: { user: User }) => User;
// some duplication but it necessary becuse a big semantic difference
// in another case the logic will be different

// UserInterface Prototype
// have 3 methods publick
export abstract class UserInterfacePrototype {
  abstract getUsers: GetUsers;
  // get user/s by differnet query
  abstract addNewUser: AddNewUser;
  // add new user to the storage
  abstract updateUserData: UpdateUserData;
  // update the user by his id

  abstract eraseCache: () => void;
  // method to erase cache
}
