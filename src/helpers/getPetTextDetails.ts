import { PET_AGE, PET_SEX } from '../utils/constants';

export const getPetSexText = (sex: PET_SEX) => {
  let result: string;
  switch (sex) {
    case PET_SEX.MALE:
      result = 'Đực';
      break;
    
    case PET_SEX.FEMALE:
      result = 'Cái';
      break;

    default:
      result = 'Không rõ';
      break;
  }

  return result;
};

export const getPetAgeText = (sex: PET_AGE) => {
  let result: string;
  switch (sex) {
    case PET_AGE.LESS_THAN_ONE_YEAR:
      result = '< 1';
      break;
    
    case PET_AGE.ONE_TO_THREE_YEAR:
      result = '1-3';
      break;

    default:
      result = '> 3';
      break;
  }

  return result;
};