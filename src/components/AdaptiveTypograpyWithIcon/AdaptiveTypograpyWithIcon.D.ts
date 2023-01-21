import { TypographyVariant } from '@mui/material/styles';

type FullText = string;
type ShortText = string;

export interface AdaptiveTypograpyWithIconI {
  content: [FullText, ShortText];
  icon: JSX.Element;
  resLimitTrigger: StyleTrigger;
  onClick?: () => void;
  variant?: TypographyVariant;
}

export enum StyleTrigger {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}
