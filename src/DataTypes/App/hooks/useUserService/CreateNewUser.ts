import { UserDataToCreateNewOne } from '../../../Data/User/UserDataToCreateNewOne';

export enum CreateNewUserStatus {
	ok,
	wrongPassword,
	wrongNickName,
	wrongLogin,
}

export interface CreateNewUserI {
  data: UserDataToCreateNewOne
}

export type CreateNewUserR = {
	status: CreateNewUserStatus;
};
