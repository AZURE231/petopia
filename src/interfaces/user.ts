import { USER_ROLE } from '../utils/constants';
import { IPetResponse } from './pet';

export interface IIndividualAttributes {
  firstName: string;
  lastName: string;
}
export interface IUserInfo {
  attributes: IIndividualAttributes;
  address: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
  id: string;
  email: string;
  image: string;
  role: USER_ROLE;
  phone: string;
}
export interface IResetPasswordRequest {
  email: string;
  resetPasswordToken: string;
  password: string;
}

export interface IChangePasswordResponse {
  newPassword: string;
  oldPassword: string;
}

export interface IUserUpdate {
  phone: string;
  firstName: string;
  lastName: string;
  provinceCode: string;
  districtCode: string;
  wardCode: string;
  street: string;
}

export interface ICurrentUserCoreResponse {
  id: string;
  email: string;
  image: string;
  role: USER_ROLE;
  name: string;
}

export interface IOtherUserRequest {
  userId: string;
}
