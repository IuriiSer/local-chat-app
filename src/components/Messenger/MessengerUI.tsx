import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MessengerHeader from '../MessengerHeader/MessengerHeader';
import ChatSideBarManager from '../ChatSideBarManager/ChatSideBarManager';
import ChatWindow from '../ChatWindow/ChatWindow';
import { UserChatExtended } from '../../DataTypes/User/User.D';
import { Message } from '../../DataTypes/Message/Message.D';
import { SentMessage, SentMessageReaction } from '../../hooks/useActiveChatManager';

const Main = styled('main')(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface MessengerUII {
  chatsData: UserChatExtended[];
  messages: Message[];
  sentMessage: SentMessage;
  sentMessageReaction: SentMessageReaction;
}

export default function MessengerUI({ chatsData, messages, sentMessage, sentMessageReaction }: MessengerUII) {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MessengerHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <ChatSideBarManager chatsData={chatsData} open={open} handleDrawerClose={handleDrawerClose} />
      <Main>
        <DrawerHeader />
        <ChatWindow messages={messages} sentMessage={sentMessage} sentMessageReaction={sentMessageReaction}/>
      </Main>
    </Box>
  );
}
