import React, { useContext, memo } from 'react';
import { useTheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import UserAvatar from '../UserAvatar/UserAvatar';
import Typography from '@mui/material/Typography';
import { ChatPreviewI } from './ChatPreview.D';
import AppContext from '../AppContext/AppContext';
import _ from 'lodash';

const ChatPreview = ({ chat, messages }: ChatPreviewI) => {
  const theme = useTheme();
  const {
    messageService: { getMessage },
    chatService: { activeChatID, setActiveChatID },
    userService: { getUsers, authorizedUser },
  } = useContext(AppContext);

  const { chat: chatData } = chat;
  if (!chatData || !authorizedUser) return <></>;

  // ! ADD logic what to show
  // Get user data for chat
  const { users } = chatData;
  const usersInChat = _.difference(users, [authorizedUser._id]);
  const userData = getUsers({ query: { userIDs: usersInChat } });

  // get nickName to show in badge
  let userNickName = authorizedUser.nickName;
  if (Array.isArray(userData) && userData.length) userNickName = userData[0].nickName;
  if (userData && !Array.isArray(userData)) userNickName = userData.nickName;

  userNickName = userNickName.length > 16 ? `${userNickName.slice(0, 14)}...` : userNickName;

  // set bgColor for active chat
  const bgcolor = (activeChatID === chat._id && 'primary.main') || '';

  // get unreadedMessageCount
  const unreadedMessageCount = chat.lastReadedMessageID
    ? messages.length - messages.findIndex((messageID) => messageID === chat.lastReadedMessageID)
    : messages.length;

  return (
    <ListItem sx={{ bgcolor }} onClick={() => setActiveChatID(chat._id)}>
      <Grid
        container
        columns={3}
        sx={{
          gap: theme.spacing(1),
          alignItems: 'center',
        }}>
        <Grid item>
          <UserAvatar nickName={userNickName} />
        </Grid>
        <Grid item sx={{ flexGrow: 1 }}>
          {userNickName}
        </Grid>
        <Grid
          item
          sx={{
            bgcolor: 'secondary.main',
            padding: theme.spacing(0.6),
            borderRadius: theme.spacing(1),
          }}>
          <Typography variant='body2' sx={{ lineHeight: 1 }}>
            {Boolean(unreadedMessageCount) &&
              (unreadedMessageCount > 100 ? '+99' : unreadedMessageCount)}
            {!Boolean(unreadedMessageCount) && 'NEW'}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default memo(ChatPreview);
