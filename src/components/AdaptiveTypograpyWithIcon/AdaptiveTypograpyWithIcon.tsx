import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AdaptiveTypograpyWithIconI } from './AdaptiveTypograpyWithIcon.D';

/**
 * Show full text for when special condition gives true
 * And icon + short for false
 * @param look AdaptiveTypograpyWithIcon.D for params
 * @returns 
 */
const AdaptiveTypograpyWithIcon = ({
  content: [fullText, shortText],
  icon,
  resLimitTrigger,
  onClick,
  variant,
}: AdaptiveTypograpyWithIconI) => {
  const displayHideSettings = { display: { [resLimitTrigger]: 'none' } };
  const displayShowSettings = { display: { xs: 'none', [resLimitTrigger]: 'block' } };
  const gridProps = { spacing: 1 };
  if (onClick) Object.assign(gridProps, { onClick });
  return (
    <Grid container {...gridProps}>
      <Grid item sx={displayHideSettings}>
        {icon}
      </Grid>
      <Grid item sx={displayShowSettings}>
        <Typography variant={variant}>{fullText}</Typography>
      </Grid>
      <Grid item sx={displayHideSettings}>
        <Typography variant={variant}>{shortText}</Typography>
      </Grid>
    </Grid>
  );
};

export default AdaptiveTypograpyWithIcon;
