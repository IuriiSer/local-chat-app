import { Signin, Signup } from '../../hooks/useUserService/useUserService.D';

export interface AuthorizationI {
  signin: Signin;
  signup: Signup;
  isAuthorizate: boolean;
}

export enum FormType {
  signin = 'signin',
  signup = 'signup',
}

export const FormTypes = Object.values(FormType);
