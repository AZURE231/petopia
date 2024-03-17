export interface IRegisterForm extends IRegisterRequest {
  confirmPassword: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  googleRecaptchaToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IGoogleLoginRequest {
  tokenId: string;
}

export interface IValidateRegisterRequest {
  email: string;
  validateRegisterToken: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredDate: string;
  refreshTokenExpiredDate: string;
}