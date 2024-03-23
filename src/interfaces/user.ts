export interface IResetPasswordRequest {
  email: string,
  resetPasswordToken: string,
  password: string,
}