import { http } from './http';
import { ILocationRequest } from '../interfaces/petProfile';
import { ICreatePetProfileRequest } from '@/src/interfaces/petProfile';

export const getProvince = async (req: ILocationRequest) =>
  await http.get('/Location', req);

export const postPet = async (data: ICreatePetProfileRequest) =>
  await http.post('/Pet', data);
