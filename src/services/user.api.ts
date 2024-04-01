import { IOtherUserRequest, IResetPasswordRequest, IUserUpdate } from '../interfaces/user';
import { http } from './http';

export const resetPassword = async (data: IResetPasswordRequest) =>
  await http.post('/User/ResetPassword', data);

export const forgotPassword = async (data: string) =>
  await http.post('/User/ForgotPassword', data);

export const getCurrentUserCore = async () =>
  await http.get('/User/CurrentUserCore');

export const updateUser = async (data: IUserUpdate) =>
  await http.put('/User', data);

export const getUserInfo = async () =>
  await http.get('/User/CurrentUser');

export const getOtherUserInfo = async (data: IOtherUserRequest) =>
  await http.get('/User/OtherUser', data);