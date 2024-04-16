import { HOUSE_TYPE, USER_ROLE } from '../utils/constants';

export interface IAdoptPetRequest {
  phone: string;
  petId: string;
  street: string;
  adoptTime: number;
  houseType: number;
  message: string;
  isOwnerBefore: boolean;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}

export interface IAdoptCardResponse {
  id: string;
  lastUpdatedAt: string;
  isSeen: boolean;
  status: number;
  petName: string;
  adopterName: string;
}

export interface IAdoptFormInfo {
  id: string;
  petId: string;
  adopterId: string;
  isCreatedAt: string;
  isUpdatedAt: string;
  status: number;
  houseType: HOUSE_TYPE;
  delayDuration: number;
  message: string;
  address: string;
  isOwnerBefore: boolean;
  adopterName: string;
  adopterPhone: string;
  adopterEmail: string;
  adopterRole: USER_ROLE;
}
