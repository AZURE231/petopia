import {
  PET_AGE,
  PET_COLOR,
  PET_MEDICAL_STATUS,
  PET_SEX,
  PET_SIZE,
  PET_SPECIES,
} from '../utils/constants';

export interface IPetFilterItem {
  id: number;
  label: string;
  value: number | string;
}

export interface IPetFilter {
  id: number;
  label: string;
  labelGetValues:
  | 'species'
  | 'sex'
  | 'color'
  | 'breed'
  | 'size'
  | 'age'
  | 'isVaccinated'
  | 'isSterillized';
  items: IPetFilterItem[];
}

export interface IPetSelect extends IPetFilter {
  kind:
  | 'breed'
  | 'species'
  | 'sex'
  | 'age'
  | 'color'
  | 'size'
  | 'isVaccinated'
  | 'isSterillized';
}

export interface IPetFilterRequest {
  sex?: PET_SEX[];
  color?: PET_COLOR[];
  species?: PET_SPECIES[];
  breed?: string[];
  size?: PET_SIZE[];
  age?: PET_AGE[];
  isVaccinated?: PET_MEDICAL_STATUS[];
  isSterillized?: PET_MEDICAL_STATUS[];
  text: string;
}

export interface IPetResponse {
  id: string;
  name: string;
  breed: string;
  sex: PET_SEX;
  age: PET_AGE;
  image: string;
  isOrgOwned: boolean;
}

export interface ICreatePetProfileRequest {
  name: string;
  description: string;
  sex: number;
  age: number;
  color: number;
  species: number;
  size: number;
  isSterillized: number;
  isVaccinated: number;
  isAvailable: boolean;
  address: string;
  breed: string;
  predictedBreed: string;
  presetBreed: string;
  files: File[];
  images: string[];
  showImages: string[];
  id?: string;
  listBreed: string[];
  vaccineIds: string[];
}

export interface ILocationResponse {
  name: string;
  code: string;
}

export interface ILocationRequest {
  Level: 1 | 2 | 3;
  Code?: string;
}

export interface IPetDetailResponse {
  name: string;
  description: string;
  sex: PET_SEX;
  age: PET_AGE;
  color: PET_COLOR;
  species: PET_SPECIES;
  size: PET_SIZE;
  isSterillized: PET_MEDICAL_STATUS;
  isVaccinated: PET_MEDICAL_STATUS;
  isAvailable: boolean;
  breed: string;
  images: string[];
  id: string;
  ownerId: string;
  isCreatedAt: string;
  address: string;
  seeMore: IPetResponse[];
  isOrgOwned: boolean;
  vaccines: IVaccine[];
}

export interface ICreatePetResponse {
  name: string;
  description: string;
  sex: PET_SEX;
  age: PET_AGE;
  color: PET_COLOR;
  species: PET_SPECIES;
  size: PET_SIZE;
  isSterillized: PET_MEDICAL_STATUS;
  isVaccinated: PET_MEDICAL_STATUS;
  isAvailable: boolean;
  breed: string;
  images: string[];
  id: string;
}

export interface IUpdatePeResponse extends ICreatePetResponse { }

export interface IPredictResponse {
  animalType: 'Dog' | 'Cat';
  breed: string;
}

export interface IVaccine {
  id: string;
  name: string;
}
