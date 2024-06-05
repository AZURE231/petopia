import { http } from './http';
import { IPaginationRequest } from '../interfaces/common';
import {
  ICreatePetProfileRequest,
  ILocationRequest,
  IPetFilterRequest,
} from '../interfaces/pet';
import { PET_SPECIES } from '../utils/constants';
import axios from 'axios';

export const getPets = async (data: IPaginationRequest<IPetFilterRequest>) =>
  await http.post('/Pet/Get', data);

export const getProvince = async (req: ILocationRequest) =>
  await http.get('/Location', req);

export const postPet = async (data: ICreatePetProfileRequest) =>
  await http.post('/Pet', data);

export const getPetDetail = async (data: { id: string }) =>
  await http.get(`/Pet/${data.id}/Details`);

export const deletePet = async (data: { id: string }) =>
  await http.delete(`/Pet/${data.id}`);

export const updatePet = async (data: ICreatePetProfileRequest) =>
  await http.put('/Pet', data);

export const getPetsByUser = async (data: IPaginationRequest<string>) =>
  await http.post('/Pet/User', data);

export const getAvailableBreeds = async (data: { species: PET_SPECIES }) =>
  await http.get('/Pet/AvailableBreed', data);

export const getBreed = async (data: PET_SPECIES) =>
  await http.get('/Pet/Breed', { species: data });

export const getKeywords = async () => await http.get('/Pet/Keywords');

export const predict = async (data: FormData) =>
  await http.post('/Pet/Predict', data);

export const getVaccine = async () => await http.get('/Pet/Vaccines');
