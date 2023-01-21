import { TypographyVariant } from '@mui/material/styles';

type TextIfTrue = string;
type TextIfFalse = string;
export interface InterchangeableTextI {
  content: [TextIfTrue, TextIfFalse];
  inCondition: boolean;
  variant?: TypographyVariant;
}
