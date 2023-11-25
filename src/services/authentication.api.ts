import exp from 'constants';
import { IRegisterRequest, ILoginRequest } from '../interfaces/authentication';
import { http } from './http';

export const register = async (data: IRegisterRequest) =>
  await http.post('/Authentication/Register', data);

export const login = async (data: ILoginRequest) =>
  await http.post('/Authentication/Login', data);
