import { User } from '../../../DataTypes/Data/User/User';
import { UserOpenData } from '../../../DataTypes/Data/User/UserOpenData';

const convertOpenUserData = (user: User): UserOpenData => {
	return {
		_id: user._id,
		nickName: user.nickName,
	};
};

export default convertOpenUserData;
