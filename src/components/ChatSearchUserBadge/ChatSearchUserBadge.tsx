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

  const nickNameToShow =
    user.nickName.length > 16 ? `${user.nickName.slice(0, 13)}...` : user.nickName;

  return (
    <Grid
      onClick={() => onClick(user)}
      container
      mb={theme.spacing(1)}
      sx={{ gap: theme.spacing(1), alignItems: 'center' }}>
      <Grid item>
        <UserAvatar nickName={user.nickName} />
      </Grid>
      <Grid item sx={{ flexGrow: 1 }}>
        {nickNameToShow}
      </Grid>
    </Grid>
  );
};

export default ChatSearchUserBadge;
