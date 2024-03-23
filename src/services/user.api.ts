
import { IResetPasswordRequest } from '../interfaces/user';
import { http } from './http';

export const resetPassword = async (data: IResetPasswordRequest) =>
  await http.post('/User/ResetPassword', data);

export const forgotPassword =  async (data: string) => 
  await http.post('/User/ForgotPassword', data);