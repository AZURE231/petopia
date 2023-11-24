import { IRegisterRequest } from '../interfaces/authentication';
import { http } from './http';

export const register = async (data: IRegisterRequest) => await http.post('/Authentication/Register', data);