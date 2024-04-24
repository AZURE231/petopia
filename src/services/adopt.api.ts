import { ADOPT_ACTION } from './../utils/constants';
import { IAdoptPetRequest } from '../interfaces/adopt';
import { http } from './http';

export const sendAdoptRequest = async (data: IAdoptPetRequest) =>
  await http.post('/AdoptionForm', data);

export const preCheckAdoption = async (petId: string) =>
  await http.get(`/AdoptionForm/PreCheck/${petId}`);

export const getAdoptCard = async (type: string) =>
  await http.get('/AdoptionForm/' + type);

export const getAdoptFormInfo = async (id: string) =>
  await http.get(`/AdoptionForm/${id}`);

export const actOnAdoptRequest = async (data: { id: string; action: string }) =>
  await http.put(`/AdoptionForm/${data.id}/${data.action}`);

export const countNotify = async () =>
  await http.get('/AdoptionForm/CountUnreadIncoming');
