import userByIDs from './userByIDs';
import userByLogin from './userByLogin';
import userByNickName from './userByNickName';

const queryBy = {
	nickName: userByNickName,
	login: userByLogin,
	IDs: userByIDs,
};

export default queryBy;
