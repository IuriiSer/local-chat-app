import { isUser } from '../../../../DataTypes/User/User.D';
import { UserByNickNameI, UserByNickNameR } from './UsersByNickName.D';

const userByNickName = ({ users, userNickName }: UserByNickNameI): UserByNickNameR => {
  const regexp = new RegExp(userNickName);
  return users.filter((user) => isUser(user, ['nickName']) && regexp.test(user.nickName));
};

export default userByNickName;
