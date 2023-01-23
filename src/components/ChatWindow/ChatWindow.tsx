import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material';
import AppContext from '../AppContext/AppContext';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const ChatWindow = () => {
  const theme = useTheme();
  const {
    chatService: { activeChatID },
  } = useContext(AppContext);

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
    <Grid container direction='column-reverse' sx={{ padding: theme.spacing(1), flexGrow: 1 }}>
      {/* SNET Button */}
      <Grid item>
        <FormControl sx={{ width: '100%' }} variant='outlined'>
          <InputLabel>Type a message</InputLabel>
          <OutlinedInput
            id='message-input'
            type='text'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={() => {}} edge='end'>
                  <InsertEmoticonIcon />
                </IconButton>
              </InputAdornment>
            }
            label='messageInput'
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ChatWindow;
