import {
  PET_AGE,
  PET_COLOR,
  PET_MEDICAL_STATUS,
  PET_SEX,
  PET_SIZE,
  PET_SPECIES,
} from '../utils/constants';

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

export const getPetColorText = (color: number) => {
  let result: string;
  switch (color) {
    case PET_COLOR.BLACK:
      result = 'Đen';
      break;

    case PET_COLOR.WHITE:
      result = 'Trắng';
      break;

    case PET_COLOR.YELLOW:
      result = 'Vàng';
      break;

    case PET_COLOR.SILVER:
      result = 'Xám';
      break;

    default:
      result = 'Không rõ';
      break;
  }

  return result;
};

export const getPetSpeciesText = (species: number) => {
  let result: string;
  switch (species) {
    case PET_SPECIES.DOG:
      result = 'Chó';
      break;

    case PET_SPECIES.CAT:
      result = 'Mèo';
      break;

    default:
      result = 'Không rõ';
      break;
  }

  return result;
};

export const getPetSizeText = (size: number) => {
  let result: string;
  switch (size) {
    case PET_SIZE.SMALL:
      result = 'Nhỏ';
      break;

    case PET_SIZE.MEDIUM:
      result = 'Trung bình';
      break;

    case PET_SIZE.BIG:
      result = 'Lớn';
      break;

    default:
      result = 'Không rõ';
      break;
  }

  return result;
};

export const getPetMedicalStatusText = (status: number) => {
  let result: string;
  switch (status) {
    case PET_MEDICAL_STATUS.YES:
      result = 'Đã tiêm chủng';
      break;

    case PET_MEDICAL_STATUS.NO:
      result = 'Chưa tiêm chủng';
      break;

    default:
      result = 'Không rõ';
      break;
  }

  return result;
};

export const getPetSterillizedText = (status: number) => {
  let result: string;
  switch (status) {
    case PET_MEDICAL_STATUS.YES:
      result = 'Đã triệt sản';
      break;

    case PET_MEDICAL_STATUS.NO:
      result = 'Chưa triệt sản';
      break;

    default:
      result = 'Không rõ';
      break;
  }

  return result;
};
