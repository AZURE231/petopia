import { http } from './http';
import { IPaginationRequest } from '../interfaces/common';
import {
  ICreatePetProfileRequest,
  ILocationRequest,
  IPetFilterRequest
} from '../interfaces/pet';

export const getPets = async (data: IPaginationRequest<IPetFilterRequest>) =>
  await http.post('/Pet/Get', data);

export const getProvince = async (req: ILocationRequest) =>
  await http.get('/Location', req);

export const postPet = async (data: ICreatePetProfileRequest) =>
  await http.post('/Pet', data);