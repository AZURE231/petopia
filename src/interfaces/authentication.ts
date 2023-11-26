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
