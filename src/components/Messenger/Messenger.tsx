import React from 'react';
import { UserChatExtended } from '../../DataTypes/User/User.D';
import useActiveChatManager from '../../hooks/useActiveChatManager';
import useChatsManager from '../../hooks/useChatsManager';
import MessengerUI from './MessengerUI';

const Messanger = () => {
  const { chatsData } = useChatsManager();
  return (
    <>
      <AddActiveChatManager chatsData={chatsData} />
    </>
  );
};

const AddActiveChatManager = ({ chatsData }: { chatsData: UserChatExtended[] }) => {
  const { messages, sentMessage, sentMessageReaction } = useActiveChatManager();
  return (
    <>
      <MessengerUI
        chatsData={chatsData}
        messages={messages}
        sentMessage={sentMessage}
        sentMessageReaction={sentMessageReaction}
      />
    </>
  );
};

export default Messanger;
