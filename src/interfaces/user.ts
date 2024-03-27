import { IPetResponse } from './pet';

export interface IIndividualAttributes {
  firstName: string;
  lastName: string;
}
export interface IUserInfo {
  attributes: IIndividualAttributes;
  id: string;
  email: string;
  image: string;
  userRole: number;
  phone: string;
  pets: IPetResponse[];
}
export interface IResetPasswordRequest {
  email: string;
  resetPasswordToken: string;
  password: string;
}
