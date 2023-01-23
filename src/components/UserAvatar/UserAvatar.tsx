import React from 'react';
import Avatar from '@mui/material/Avatar';
import { UserNickName } from '../../DataTypes/User/User.D';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.slice(0, 2),
  };
};

const UserAvatar = ({ nickName }: { nickName: UserNickName }) => {
  return <Avatar {...stringAvatar(nickName)} />;
};

export default UserAvatar;
