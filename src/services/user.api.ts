import { IResetPasswordRequest, IUserUpdate } from '../interfaces/user';
import { http } from './http';

export const resetPassword = async (data: IResetPasswordRequest) =>
  await http.post('/User/ResetPassword', data);

export const forgotPassword = async (data: string) =>
  await http.post('/User/ForgotPassword', data);

export const getCurrentUserCore = async () =>
  await http.get('/User/CurrentUserCore');

export const updateUser = async (data: IUserUpdate) =>
  await http.put('/User', data);
