import React, { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import UserAvatar from '../UserAvatar/UserAvatar';
import AppContext from '../AppContext/AppContext';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

const PersonalAccountBadge = () => {
  const {
    userService: { authorizedUser, logout },
  } = useContext(AppContext);
  const theme = useTheme();
  if (!authorizedUser) return <></>;

  const nickNameToShow =
    authorizedUser.nickName.length > 10
      ? `${authorizedUser.nickName.slice(0, 7)}...`
      : authorizedUser.nickName;

  return (
    <Grid container sx={{ gap: theme.spacing(1), alignItems: 'center' }}>
      <Grid item>
        <UserAvatar nickName={authorizedUser.nickName} />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {nickNameToShow}
      </Grid>
      <Grid item>
        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default PersonalAccountBadge;
