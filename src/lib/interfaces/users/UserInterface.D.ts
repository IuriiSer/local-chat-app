import { User, NewUser, UserFieldError } from '../../../DataTypes/User/User.D';
import { GetUsersI, GetUsersR } from './lib/getUsers.D';

// UserInterface Prototype
// have 3 methods publick
export abstract class UserInterfacePrototype {
	abstract getUsers({ query }: GetUsersI): GetUsersR;
		// get user/s by differnet query
	abstract addNewUser({ newUser }: { newUser: NewUser }): User | UserFieldError[];
		// add new user to the storage
	abstract updateUserData({ user }: { user: User }): User | UserFieldError[];
		// update the user by his id
}
