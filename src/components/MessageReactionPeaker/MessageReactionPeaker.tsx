import React from 'react';
import Dialog from '@mui/material/Dialog';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

export interface MessageReactionPeackerI {
  open: boolean;
  onClose: () => void;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
}

const MessageReactionPeaker = ({ open, onEmojiClick, onClose }: MessageReactionPeackerI) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <EmojiPicker onEmojiClick={onEmojiClick} lazyLoadEmojis/>
    </Dialog>
  );
};

export default MessageReactionPeaker;
