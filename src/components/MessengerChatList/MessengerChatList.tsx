import React, { useContext, useState } from 'react';
import List from '@mui/material/List';
import ChatPreview from '../ChatPreview/ChatPreview';
import { UserChat } from '../../DataTypes/User/User.D';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

type MessengerChatListI = {
  chats: UserChat[];
};

const MessengerChatList = ({ chats }:MessengerChatListI) => {
  const theme = useTheme();

  return (
    <>
      <List>
        {Boolean(chats.length) &&
          chats.map((chatData) => (
            <ChatPreview
              key={chatData._id}
              messages={chatData.chat?.messages || []}
              chat={chatData}
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
    </>
  );
};

export default MessengerChatList;
