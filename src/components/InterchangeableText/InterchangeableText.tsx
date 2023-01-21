import React from 'react';

import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { InterchangeableTextI } from './InterchangeableText.D';

const InterchangeableText = ({
  content: [TextIfTrue, TextIfFalse],
  inCondition,
  variant,
}: InterchangeableTextI) => {
  return (
    <>
      <Grow in={inCondition}>
        <Typography variant={variant} sx={{ position: 'absolute' }}>
          {TextIfTrue}
        </Typography>
      </Grow>
      <Grow in={!inCondition}>
        <Typography variant={variant}>{TextIfFalse}</Typography>
      </Grow>
    </>
  );
};

export default InterchangeableText;
