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
  userRole: USER_ROLE;
  phone: string;
  pets: IPetResponse[];
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

export interface IUserUpdate extends ILocationAtribute{
  phone: string;
  firstName: string;
  lastName: string;

  street: string;
}

export interface ILocationAtribute {
  provinceCode: string;
  districtCode: string;
  wardCode: string;
}


export interface ICurrentUserCoreResponse {
  id: string;
  email: string;
  image: string;
  userRole: USER_ROLE;
  name: string;
}

export interface IOtherUserRequest {
  userId: string;
}
