import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MessengerHeader from '../MessengerHeader/MessengerHeader';
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import ChatWindow from '../ChatWindow/ChatWindow';

const Main = styled('main')(({ theme }) => ({
  padding: theme.spacing(0, 3, 2),
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

export default function Messenger() {
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
      <SideBarMenu open={open} handleDrawerClose={handleDrawerClose} />
      <Main>
        <DrawerHeader />
        <ChatWindow />
      </Main>
    </Box>
  );
}
