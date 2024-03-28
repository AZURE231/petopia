import { IPaginationRequest } from '../interfaces/common';
import { IPetFilterRequest } from '../interfaces/pet';
import { http } from './http';

export const getPets = async (data: IPaginationRequest<IPetFilterRequest>) =>
  await http.post('/Pet/Get', data);