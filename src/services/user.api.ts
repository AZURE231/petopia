import { IOrgUpgradeRequest } from '../interfaces/org';
import {
  IChangePasswordResponse,
  IOtherUserRequest,
  IPreReportRequest,
  IReportRequest,
  IResetPasswordRequest,
  IUserUpdate,
} from '../interfaces/user';
import { http } from './http';

export const resetPassword = async (data: IResetPasswordRequest) =>
  await http.post('/User/ResetPassword', data);

export const forgotPassword = async (data: string) =>
  await http.post('/User/ForgotPassword', data);

export const getCurrentUserCore = async () =>
  await http.get('/User/CurrentUserCore');

export const updateUser = async (data: IUserUpdate) =>
  await http.put('/User', data);

export const getUserInfo = async () => await http.get('/User/CurrentUser');

export const getOtherUserInfo = async (data: IOtherUserRequest) =>
  await http.get('/User/OtherUser', data);

export const updateAvatar = async (data: string) =>
  await http.put('/User/UpdateAvatar', data);

export const changePassword = async (data: IChangePasswordResponse) =>
  await http.post('/User/ChangePassword', data);

export const upgradeToOrg = async (data: IOrgUpgradeRequest) =>
  await http.post('/User/UpgradeAccount', data);

export const getPreUpgrade = async () => await http.get('/User/PreUpgrade');

export const report = async (data: IReportRequest) =>
  await http.post('/Report/Report', data);

export const getPreReport = async (data: IPreReportRequest) =>
  await http.post('/Report/PreReport', data);
