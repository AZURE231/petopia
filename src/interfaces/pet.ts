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
  value: number;
}

export interface IPetFilter {
  id: number;
  label: string;
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
}
