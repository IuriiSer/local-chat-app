import React, { useContext, useState, useEffect, ChangeEvent, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { Divider, Typography, useTheme } from '@mui/material';
import AppContext from '../AppContext/AppContext';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TextAreaWithAdorment from '../TextAreaWithAdorment/TextAreaWithAdorment';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Message } from '../../DataTypes/Message/Message.D';
import MessageDrawer from '../MessageDrawer/MessageDrawer';
import { SetMessage } from '../../hooks/useActiveChatManager';

interface ChatWindowI {
  messages: Message[];
  setMessages: SetMessage;
}

const ChatWindow = ({ messages, setMessages }: ChatWindowI) => {
  const theme = useTheme();
  const {
    messageService: { addMessage: sentMessage },
    chatService: { activeChatID },
  } = useContext(AppContext);

  const [typedText, setTypedText] = useState<string>('');

  const sentMessageHandler = useCallback(() => {
    if (!activeChatID) return;
    if (!typedText.trim()) return;
    const newMessage = sentMessage(activeChatID, typedText.trim());
    if (!newMessage) return;
    setMessages((prev) => [...prev, newMessage]);
    setTypedText('');
  }, [sentMessage, activeChatID, typedText, setMessages]);

  useEffect(() => {
    const element = document.getElementById(messages.at(-1)?._id || '');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
          value={typedText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTypedText(e.target.value);
          }}
          actionCallBacks={[sentMessageHandler, () => {}]}>
          <NearMeIcon />
          <InsertEmoticonIcon />
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
          <Grid item key={message._id}>
            <MessageDrawer {...message} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ChatWindow;
