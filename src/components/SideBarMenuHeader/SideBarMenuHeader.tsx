import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Grid } from '@mui/material';
import PersonalAccountBadge from '../PersonalAccountBadge/PersonalAccountBadge';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const SideBarMenuHeader = ({ handleDrawerClose }: { handleDrawerClose: () => void }) => {
  const theme = useTheme();
  return (
    <DrawerHeader>
      <Grid container sx={{ gap: theme.spacing(1), alignItems: 'center' }}>
        <Grid item sx={{ flexGrow: 1 }}>
          <PersonalAccountBadge />
        </Grid>
        <Grid item>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </DrawerHeader>
  );
};

export default SideBarMenuHeader;
