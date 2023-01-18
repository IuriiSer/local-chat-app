import { User } from '../../../DataTypes/User/User.D';
import { UserOpenData } from '../../../DataTypes/User/User.D';

const convertOpenUserData = (user: User): UserOpenData => {
	return {
		_id: user._id,
		nickName: user.nickName,
	};
};

export default convertOpenUserData;
