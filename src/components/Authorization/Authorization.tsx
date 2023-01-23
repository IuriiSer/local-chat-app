import React, { useState, useEffect, ReactNode, useCallback, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FormType, FormTypes } from './Authorization.D';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import Grow from '@mui/material/Grow';
import AdaptiveTypograpyWithIcon from '../AdaptiveTypograpyWithIcon/AdaptiveTypograpyWithIcon';
import { StyleTrigger } from '../AdaptiveTypograpyWithIcon/AdaptiveTypograpyWithIcon.D';
import KeyIcon from '@mui/icons-material/Key';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InterchangeableText from '../InterchangeableText/InterchangeableText';
import { UserFieldError } from '../../DataTypes/User/User.D';
import { UserServiceStatus } from '../../hooks/useUserService/useUserService.D';
import AppContext from '../AppContext/AppContext';

type ParsedError = { [fieldName: string]: ReactNode };
const parseErors = (errors: UserFieldError[]): ParsedError => {
  const parsed = {} as ParsedError;
  errors.forEach((err) => {
    parsed[err.field] = err.err;
  });
  return parsed;
};

const Authorization = () => {
  const {
    userService: { signin, signup, authorizedUser },
  } = useContext(AppContext);
  const isAuthorizate = !!authorizedUser;

  const [open, setOpen] = useState<boolean>(true);
  const [formType, setFormType] = useState<FormType>(FormType.signin);
  const [errors, setErrors] = useState<ParsedError>({});

  console.log('Authorization Render');

  useEffect(() => {
    if (!isAuthorizate) setOpen(true);
  }, [isAuthorizate]);

  const changeFormType = () => {
    setErrors({});
    setFormType((currForm) => {
      const nextFormInd = FormTypes.findIndex((type) => type === currForm) + 1;
      if (FormTypes[nextFormInd]) return FormTypes[nextFormInd];
      return FormTypes[0];
    });
  };

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      if (formType === FormType.signin) {
        const login = (data.get('login') as string) || '';
        const password = (data.get('password') as string) || '';
        const res = signin({ login, password });

        if (res.track) {
          setErrors(parseErors(res.track));
          return;
        }
        if (res.status === UserServiceStatus.ok) {
          if (Object.values(errors).length) setErrors({});
          setOpen(false);
          return;
        }

        // TODO show error message in snackbar
        console.log('file: Authorization.tsx:53 ~ res', res);
      }

      if (formType === FormType.signup) {
        const login = (data.get('login') as string) || '';
        const password = (data.get('password') as string) || '';
        const nickName = (data.get('nickName') as string) || '';
        const passwordRepeat = (data.get('passwordRepeat') as string) || '';
        const res = signup({ login, nickName, password, passwordRepeat });

        if (res.track) {
          setErrors(parseErors(res.track));
          return;
        }
        if (res.status === UserServiceStatus.ok) {
          if (Object.values(errors).length) setErrors({});
          setOpen(false);
          return;
        }

        // TODO show error message in snackbar
        console.log('file: Authorization.tsx:53 ~ res', res);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formType, isAuthorizate],
  );

  return (
    <Dialog open={open}>
      <DialogContent>
        {/* HEADER */}
        <Grid container maxWidth='xs'>
          <Grid container alignItems='center' direction='column'>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Grid item>
              <InterchangeableText
                content={['Sign In', 'Sign Up']}
                inCondition={formType === FormType.signin}
                variant='h6'
              />
            </Grid>
          </Grid>
        </Grid>
        {/* FORM CONTAINER */}
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            {/* FORM INPUTS */}
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                error={!!errors['login']}
                helperText={errors['login']}
                margin='normal'
                required
                fullWidth
                id='login'
                label='Enter your login'
                name='login'
                autoComplete='login'
                autoFocus
              />
              <TransitionGroup>
                {formType === FormType.signup && (
                  <Collapse>
                    <TextField
                      error={!!errors['nickName']}
                      helperText={errors['nickName']}
                      margin='normal'
                      required
                      fullWidth
                      id='nickName'
                      label='Nick name'
                      name='nickName'
                      autoComplete='nickName'
                    />
                  </Collapse>
                )}
              </TransitionGroup>
              <TextField
                error={!!errors['password']}
                helperText={errors['password']}
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <TransitionGroup>
                {formType === FormType.signup && (
                  <Collapse>
                    <TextField
                      error={!!errors['passwordRepeat']}
                      helperText={errors['passwordRepeat']}
                      margin='normal'
                      required
                      fullWidth
                      name='passwordRepeat'
                      label='Repeat password'
                      type='password'
                      id='passwordRepeat'
                      autoComplete='current-password'
                    />
                  </Collapse>
                )}
              </TransitionGroup>
              {/* FORM SUBMIT */}
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                <Grow in={formType === FormType.signup}>
                  <Typography sx={{ position: 'absolute' }}>Sign Up</Typography>
                </Grow>
                <Grow in={formType === FormType.signin}>
                  <Typography>Sign In</Typography>
                </Grow>
              </Button>
              {/* FORM EXTRA ACTIONS */}
              <Grid container>
                <Grow in={formType === FormType.signup}>
                  <Grid item>
                    <AdaptiveTypograpyWithIcon
                      content={['Already have an account?', 'Sign In']}
                      icon={<KeyIcon />}
                      resLimitTrigger={StyleTrigger.sm}
                      onClick={changeFormType}
                      variant='button'
                    />
                  </Grid>
                </Grow>
                <Grid item xs />
                <Grow in={formType === FormType.signin}>
                  <Grid item>
                    <AdaptiveTypograpyWithIcon
                      content={["Don't have an account?", 'Sign Up']}
                      icon={<PersonAddIcon />}
                      resLimitTrigger={StyleTrigger.sm}
                      onClick={changeFormType}
                      variant='button'
                    />
                  </Grid>
                </Grow>
              </Grid>
            </Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default Authorization;
