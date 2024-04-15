import { IAdoptPetRequest } from '../interfaces/adopt';
import { http } from './http';

export const sendAdoptRequest = async (data: IAdoptPetRequest) =>
  await http.post('/AdoptionForm', data);

export const preCheckAdoption = async (petId: string) =>
  await http.get(`/AdoptionForm/PreCheck/${petId}`);

export const getAdoptCard = async () => await http.get('/AdoptionForm/Sent');
