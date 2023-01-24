import React, { useContext } from 'react';
import { Divider, Grid, Typography, useTheme } from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Message } from '../../DataTypes/Message/Message.D';
import { styled } from '@mui/material/styles';
import AppContext from '../AppContext/AppContext';
import ReplyIcon from '@mui/icons-material/Reply';
import MessageReactions from './MessageReactions';

const MessageContainer = styled(Paper)<PaperProps>(({ theme }) => ({
  maxWidth: 300,
  maxHeight: 300,
}));

const MessageDrawer = ({
  _id,
  data: { text },
  sentDate,
  isHided,
  isModified,
  repliedMessage,
  reactions,
}: Message) => {
  const theme = useTheme();
  const {
    messageService: { getMessage },
  } = useContext(AppContext);
  const replyMessage = (repliedMessage && getMessage(repliedMessage)) || null;

  if (isHided) return <></>;

  const date = new Date(sentDate);
  const parsedDate = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <MessageContainer variant='outlined' id={_id}>
      {/* REPLY message block */}
      {replyMessage && (
        <>
          <Grid container p={theme.spacing(1, 2)}>
            <ReplyIcon color='disabled' />
            <Typography align="center" variant='button'>
              {replyMessage.data.text}
            </Typography>
          </Grid>
          <Divider />
        </>
      )}
      {/* MAIN block */}
      <Grid container direction='column' gap={theme.spacing(1)} p={theme.spacing(2)}>
        {/* Message text */}
        <Grid item>
          <Typography variant='body1'>{text}</Typography>
        </Grid>
        <Divider />
        {/* Message extra info */}
        <Grid
          container
          direction='row-reverse'
          wrap='nowrap'
          sx={{ textAlign: 'right' }}
          gap={theme.spacing(1)}>
          {/* sentDate info */}
          <Typography variant='button'>{parsedDate}</Typography>
          {/* isModified info */}
          {isModified && <Typography variant='button'>MODIFIED</Typography>}
          {reactions && <MessageReactions reactions={reactions} />}
        </Grid>
      </Grid>
    </MessageContainer>
  );
};

export default MessageDrawer;
