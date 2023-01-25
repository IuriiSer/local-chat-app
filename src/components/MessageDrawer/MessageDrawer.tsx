import React, { useContext, memo } from 'react';
import { IconButton, Divider, Grid, Typography, useTheme } from '@mui/material';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Message, MessageID } from '../../DataTypes/Message/Message.D';
import { styled } from '@mui/material/styles';
import AppContext from '../AppContext/AppContext';
import ReplyIcon from '@mui/icons-material/Reply';
import MessageReactions from './MessageReactions';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import scrollToElementByID from '../../lib/helpers/scrollToElementByID';

type MenuManagment = {
  openDialogToPeakReaction: (messageID: MessageID) => void;
  setMessageIdToReply: (messageID: MessageID) => void;
};
type MessageDraweI = Message & MenuManagment;

const MessageContainer = styled(Paper)<PaperProps>(({ theme }) => ({
  maxWidth: 300,
  overflow: 'hidden',
}));

const MessageDrawer = ({
  _id,
  data: { text },
  sentDate,
  isHided,
  isModified,
  repliedMessage,
  reactions,
  openDialogToPeakReaction,
  setMessageIdToReply,
}: MessageDraweI) => {
  const theme = useTheme();
  const {
    messageService: { getMessage },
  } = useContext(AppContext);

  const replyMessage = (repliedMessage && getMessage(repliedMessage)) || null;

  const openDialogToPeakReactionHandle = () => {
    openDialogToPeakReaction(_id);
  };

  const setMessageIdToReplyHandle = () => {
    setMessageIdToReply(_id);
  };

  const onReplyScrollHandle = () => {
    scrollToElementByID(repliedMessage || '');
  };

  if (isHided) return <></>;

  const date = new Date(sentDate);
  const parsedDate = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <MessageContainer variant='outlined' id={_id}>
      {/* REPLY message block */}
      {replyMessage && (
        <>
          <Grid container p={theme.spacing(1, 2)} onClick={onReplyScrollHandle}>
            <ReplyIcon color='disabled' />
            <Typography align='center' variant='button'>
              {replyMessage.data.text}
            </Typography>
          </Grid>
          <Divider />
        </>
      )}
      {/* MAIN block */}
      <Grid
        container
        direction='column'
        gap={theme.spacing(1)}
        p={theme.spacing(2)}
        pb={theme.spacing(0.5)}>
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
          alignItems='center'
          sx={{ textAlign: 'right' }}
          gap={theme.spacing(1)}>
          {/* sentDate info */}
          <Grid item>
            <Typography variant='button'>{parsedDate}</Typography>
          </Grid>
          {/* isModified info */}
          {isModified && (
            <Grid item>
              <Typography variant='button'>MODIFIED</Typography>
            </Grid>
          )}
          {reactions && <MessageReactions reactions={reactions} />}
          <Grid item flexGrow={1} />
          <Grid container wrap='nowrap'>
            <IconButton onClick={openDialogToPeakReactionHandle}>
              <AddReactionIcon />
            </IconButton>
            <IconButton onClick={setMessageIdToReplyHandle}>
              <ReplyIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </MessageContainer>
  );
};

export default memo(MessageDrawer);
