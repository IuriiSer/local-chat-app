import React, { ChangeEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
interface TextAreaWithAdormentI {
  label: string;
  fieldKey: string;
  actionCallBacks: (() => void)[];
  children: JSX.Element[] | JSX.Element;
  value?: String;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextAreaWithAdorment = ({
  label,
  fieldKey,
  actionCallBacks,
  children,
  onChange,
  value,
}: TextAreaWithAdormentI) => {
  if (Array.isArray(children) && children.length !== actionCallBacks.length)
    throw new Error('TextAreaWithAdormentI args Error');
  return (
    <FormControl sx={{ width: '100%' }} variant='outlined'>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        id={`${fieldKey}-input`}
        type='text'
        onChange={onChange}
        value={value}
        label={`${fieldKey}-input`}
        endAdornment={
          <InputAdornment position='end'>
            {Array.isArray(children) &&
              children.map((child, ind) => (
                <IconButton key={ind} onClick={actionCallBacks[ind]} edge='end'>
                  {child}
                </IconButton>
              ))}
            {!Array.isArray(children) && (
              <IconButton aria-label={`type ${fieldKey}`} onClick={actionCallBacks[0]} edge='end'>
                {children}
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default TextAreaWithAdorment;
