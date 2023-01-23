import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SideBarMenuI } from './SideBarMenu.D';
import { Grid } from '@mui/material';
import AccountBadger from '../AccountBadger/AccountBadger';
import MessengerChatList from '../MessengerChatList/MessengerChatList';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideBarMenu = ({ open, handleDrawerClose }: SideBarMenuI) => {
  const theme = useTheme();
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
      <DrawerHeader>
        <Grid container sx={{ gap: theme.spacing(1), alignItems: 'center' }}>
          <Grid item sx={{ flexGrow: 1 }}>
            <AccountBadger />
          </Grid>
          <Grid item>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </DrawerHeader>
      <Divider />
      <MessengerChatList />
    </Drawer>
  );
};

export default SideBarMenu;
