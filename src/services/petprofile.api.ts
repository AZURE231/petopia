import { http } from './http';
import { ILocationRequest } from '../interfaces/petProfile';

export const getProvince = async (req: ILocationRequest) =>
  await http.get('/Location', req);
