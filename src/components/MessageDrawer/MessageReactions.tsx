import { MessageReaction } from '../../DataTypes/Message/MessageReaction.D';
import { Emoji } from 'emoji-picker-react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

interface MessageReactionsI {
  reactions: MessageReaction[];
}

const MessageReactions = ({ reactions }: MessageReactionsI) => {
  const theme = useTheme();
  const reactionsToShow = reactions.sort((a, b) => b.users.length - a.users.length).slice(0, 3);

  return (
    <Grid container wrap='nowrap' gap={theme.spacing(0.5)}>
      {reactionsToShow.map((reaction) => (
        <Emoji key={reaction.emojiID} unified={reaction.emojiID} size={25} />
      ))}
    </Grid>
  );
};

export default MessageReactions;
