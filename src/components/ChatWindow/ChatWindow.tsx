import React, { useContext, useState, useEffect, ChangeEvent, useRef, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { Divider, Typography, useTheme } from '@mui/material';
import AppContext from '../AppContext/AppContext';
import TextAreaWithAdorment from '../TextAreaWithAdorment/TextAreaWithAdorment';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Message, MessageID } from '../../DataTypes/Message/Message.D';
import MessageDrawer from '../MessageDrawer/MessageDrawer';
import { SentMessage, SentMessageReaction } from '../../hooks/useActiveChatManager';
import MessageReactionPeaker from '../MessageReactionPeaker/MessageReactionPeaker';
import { EmojiClickData } from 'emoji-picker-react';
import { Unified } from '../../DataTypes/Message/MessageReaction.D';
import scrollToElementByID from '../../lib/helpers/scrollToElementByID';

interface ChatWindowI {
  messages: Message[];
  sentMessage: SentMessage;
  sentMessageReaction: SentMessageReaction;
}

const ChatWindow = ({ messages, sentMessage, sentMessageReaction }: ChatWindowI) => {
  const theme = useTheme();
  const {
    userService: { authorizedUser },
    chatService: { activeChatID },
  } = useContext(AppContext);
  const [typedMessage, setTypedMessage] = useState<string>('');
  const [isReactionDialogOpen, setIsReactionDialogOpen] = useState<boolean>(false);
  const [messageIdToReply, setMessageIdToReply] = useState<MessageID | undefined>(undefined);
  const messageIdForNewReaction = useRef<null | MessageID>(null);

  useEffect(() => {
    if (!messageIdToReply) return;
    resetMessageIdToReplyHandle();
  }, [activeChatID]);

  // handle to sent messages
  const sentMessageHandler = () => {
    sentMessage(typedMessage, { repliedMessage: messageIdToReply });
    setMessageIdToReply(undefined);
    setTypedMessage('');
  };

  // handle to sent reaction
  const sentMessageReactionHandler = (emojiID: Unified) => {
    if (!messageIdForNewReaction.current) return;
    sentMessageReaction(emojiID, messageIdForNewReaction.current);
    messageIdForNewReaction.current = null;
  };

  // scroll for new message
  useEffect(() => {
    const lastMessageID = messages.at(-1)?._id || '';
    if (!lastMessageID) return;
    scrollToElementByID(lastMessageID);
  }, [messages]);

  // Logic to manage dialogs for Reactions
  // BEGIN
  const onEmojiReactionDialogPick = (emoji: EmojiClickData) => {
    sentMessageReactionHandler(emoji.unified);
    setIsReactionDialogOpen(false);
  };

  const openDialogToPeakReaction = useCallback((messageID: MessageID) => {
    messageIdForNewReaction.current = messageID;
    setIsReactionDialogOpen(true);
  }, []);

  const closeDialogToPeakReaction = () => {
    messageIdForNewReaction.current = null;
    setIsReactionDialogOpen(false);
  };
  // END

  // Logic to manage reply ID
  const setMessageIdToReplyHandle = useCallback(
    (messageID: MessageID) => {
      if (messageID === messageIdToReply) return;
      setMessageIdToReply(messageID);
    },
    [messageIdToReply],
  );

  const resetMessageIdToReplyHandle = useCallback(() => {
    setMessageIdToReply(undefined);
  }, []);
  // END

  if (!activeChatID)
    return (
      <Grid
        container
        direction='column'
        sx={{ padding: theme.spacing(1), marginTop: theme.spacing(8) }}>
        <Typography variant='h6' sx={{ textAlign: 'center' }}>
          Select or start new chat to write a message
        </Typography>
      </Grid>
    );

  return (
    <>
      <MessageReactionPeaker
        open={isReactionDialogOpen}
        onEmojiClick={onEmojiReactionDialogPick}
        onClose={closeDialogToPeakReaction}
      />
      <Grid
        container
        direction='column-reverse'
        sx={{
          padding: theme.spacing(1),
          flexGrow: 1,
          gap: theme.spacing(1),
          height: '100%',
          overflow: 'hidden',
          flexWrap: 'nowrap',
        }}>
        {/* SNET Button */}
        <Grid item>
          <TextAreaWithAdorment
            label='Type a message'
            fieldKey='message'
            value={typedMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTypedMessage(e.target.value);
            }}
            actionCallBacks={[sentMessageHandler]}>
            <NearMeIcon />
          </TextAreaWithAdorment>
        </Grid>
        <Divider />
        <Grid
          container
          direction='column'
          sx={{
            paddingBottom: theme.spacing(1),
            gap: theme.spacing(1),
            overflowY: 'auto',
            flexWrap: 'nowrap',
          }}>
          {messages.map((message) => (
            <Grid
              item
              key={message._id}
              alignSelf={authorizedUser?._id === message.owner ? 'flex-end' : 'flex-start'}>
              <MessageDrawer
                {...message}
                openDialogToPeakReaction={openDialogToPeakReaction}
                setMessageIdToReply={setMessageIdToReplyHandle}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default ChatWindow;
