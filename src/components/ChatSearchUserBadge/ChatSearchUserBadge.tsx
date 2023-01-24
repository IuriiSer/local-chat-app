import { Grid, useTheme } from '@mui/material';
import { UserOpenData } from '../../DataTypes/User/User.D';
import UserAvatar from '../UserAvatar/UserAvatar';

interface ChatSearchUserBadgeI {
  user: UserOpenData;
  onClick: (user: UserOpenData) => void;
}

/**
 * Component returns badge for chatSearching by nickname
 * @param user UserOpenData
 * @param onClick click handle. Ussually startConversion handle
 * @returns
 */
const ChatSearchUserBadge = ({ user, onClick }: ChatSearchUserBadgeI) => {
  const theme = useTheme();
  return (
    <Grid onClick={() => onClick(user)} container sx={{ gap: theme.spacing(1), alignItems: 'center' }}>
      <Grid item>
        <UserAvatar nickName={user.nickName} />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {user.nickName}
      </Grid>
    </Grid>
  );
};

export default ChatSearchUserBadge;
