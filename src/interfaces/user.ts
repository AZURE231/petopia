import { USER_ROLE } from '../utils/constants';

export interface IResetPasswordRequest {
  email: string,
  resetPasswordToken: string,
  password: string,
}

export interface ICurrentUserCore {
  id: string,
  email: string,
  image: string,
  userRole: USER_ROLE,
  name: string,
}