import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import UserAvatar from '../UserAvatar/UserAvatar';
import Typography from '@mui/material/Typography';
import { ChatPreviewI } from './ChatPreview.D';

const ChatPreview = ({ chat, lastSeen }: ChatPreviewI) => {
  const unreadedMessageCount = 1000;
  const theme = useTheme();
  return (
    <ListItem>
      <Grid container columns={3} sx={{ gap: theme.spacing(1), alignItems: 'center' }}>
        <Grid item>
          <UserAvatar nickName={'sdad'} />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          {'User Nickname'}
        </Grid>
        <Grid
          item
          sx={{
            bgcolor: 'secondary.main',
            padding: theme.spacing(0.6),
            borderRadius: theme.spacing(1),
          }}>
          <Typography variant='body2' sx={{ lineHeight: 1 }}>
            {unreadedMessageCount > 100 ? '+99' : unreadedMessageCount}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ChatPreview;
