import _ from 'lodash';
import { ChatID } from '../../../DataTypes/Chat/Chat.D';
import { UserChat, UserID } from '../../../DataTypes/User/User.D';

const findChatWithSameUsers = (userChats: UserChat[], userIdToFind: UserID): ChatID | null => {
  const requestedChat = userChats.filter(
    (chatData) =>
      chatData.chat!.users.length === 2 &&
      _.difference(chatData.chat!.users, [userIdToFind]).length === 1,
  );
  if (!requestedChat.length) return null;
  return requestedChat[0]._id;
};

export default findChatWithSameUsers;
