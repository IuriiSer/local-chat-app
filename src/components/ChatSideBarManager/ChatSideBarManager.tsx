import React, { useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { ChatSideBarManagerI } from './ChatSideBarManager.D';
import MessengerChatList from '../MessengerChatList/MessengerChatList';
import SideBarMenuHeader from '../SideBarMenuHeader/SideBarMenuHeader';
import ChatSearch from '../ChatSearch/ChatSearch';
import AppContext from '../AppContext/AppContext';
const drawerWidth = 240;

const ChatSideBarManager = ({ open, handleDrawerClose, chatsData }: ChatSideBarManagerI) => {
  const {
    userService: { authorizedUser },
  } = useContext(AppContext);

  if (!authorizedUser) return <></>;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}>
      <SideBarMenuHeader handleDrawerClose={handleDrawerClose} />
      <Divider />
      <ChatSearch />
      <MessengerChatList chats={chatsData} />
      <Divider />
    </Drawer>
  );
};

export default ChatSideBarManager;
