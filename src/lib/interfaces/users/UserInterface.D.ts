import { User } from '../../../DataTypes/User/User.D';
import { GetUsersI, GetUsersR } from './lib/getUsers.D';

export type GetUsers = ({ query }: GetUsersI) => GetUsersR;
export type AddNewUser = ({ user }: { user: User }) => User;
export type UpdateUserData = ({ user }: { user: User }) => User;
// some duplication but it necessary becuse a big semantic difference
// in another case the logic will be different
