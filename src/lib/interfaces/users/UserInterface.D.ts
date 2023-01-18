import { User, NewUser, UserNewData } from '../../../DataTypes/User/User.D';
import { GetUsersI, GetUsersR } from './lib/getUsers.D';

// UserInterface Prototype
// have 3 methods publick
export abstract class UserInterfacePrototype {
	abstract getUsers({ query }: GetUsersI): GetUsersR;
		// get user/s by differnet query
	abstract addNewUser({ newUser }: { newUser: NewUser }): User;
		// add new user to the storage
	abstract updateUserData({ newUserData }: { newUserData: UserNewData }): User;
		// update the user by his id
}
