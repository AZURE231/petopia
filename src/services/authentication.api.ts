import { IRegisterRequest, ILoginRequest, IGoogleLoginRequest } from '../interfaces/authentication';
import { http } from './http';

export const register = async (data: IRegisterRequest) =>
  await http.post('/Authentication/Register', data);

export const login = async (data: ILoginRequest) =>
  await http.post('/Authentication/Login', data);

export const getGoogleRecaptchaSiteKey = async () =>
  await http.get('/Authentication/GoogleRecaptchaSiteKey');

export const googleLogin = async (data: IGoogleLoginRequest) =>
  await http.post('/Authentication/GoogleLogin', data);

export const getGoogleAuthClientId = async () =>
  await http.get('/Authentication/GoogleAuthClientId');