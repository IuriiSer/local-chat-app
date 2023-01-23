import React, { useContext, useState } from 'react';
import List from '@mui/material/List';
import ChatPreview from '../ChatPreview/ChatPreview';
import AppContext from '../AppContext/AppContext';
import { Chat, ChatID } from '../../DataTypes/Chat/Chat.D';
import { UserChat } from '../../DataTypes/User/User.D';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import subscribers from '../../lib/subscribers';
import { ActionType } from '../../lib/interfaces/broadcastChannel/BroadcastInterface.D';

const getLastSeenTime = (userChats: UserChat[], chatID: ChatID): Date => {
  const chatData = userChats.find((chat) => chat._id === chatID);
  return chatData?.lastSeen || new Date();
};

const MessengerChatList = () => {
  const {
    userService: { authorizedUser },
    chatService: { getChats, useSubscribe },
  } = useContext(AppContext);
  const updateChats = () => getChats() || [];
  const [chats, setChats] = useState<Chat[]>(updateChats());
  const theme = useTheme();

  if (!authorizedUser) return <></>;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useSubscribe(
    subscribers.forNewChats(authorizedUser._id, () => setChats(updateChats())),
    ActionType.recieve,
  );

  return (
    <>
      <List>
        {Boolean(chats.length) &&
          chats.map((chat) => (
            <ChatPreview
              key={chat._id}
              chat={chat}
              lastSeen={getLastSeenTime(authorizedUser.chats, chat._id)}
            />
          ))}
      </List>
      {!Boolean(chats.length) && (
        <Grid container direction='column' sx={{ padding: theme.spacing(1) }}>
          <Typography sx={{ textAlign: 'center' }}>You don`t have opened chats</Typography>
          <Typography sx={{ textAlign: 'center' }}>
            Type a nickname to start new conversion
          </Typography>
        </Grid>
      )}
      <Divider />
    </>
  );
};

export default MessengerChatList;
