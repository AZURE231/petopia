import { Dispatch, SetStateAction } from 'react';

export const isEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const isPassword = (password: string) => /^.{8,}$/.test(password);

export const checkPasswords = (
  password: string,
  confirm: string,
  setter: Dispatch<SetStateAction<string>>
) => {
  if (confirm) {
    setter(confirm === password ? '' : 'Mật khẩu không khớp.');
  } else {
    setter('');
  }
};

export const checkPasswordFormat = (
  password: string,
  setter: Dispatch<SetStateAction<string>>
) => {
  if (password) {
    setter(isPassword(password) ? '' : 'Mật khẩu phải có ít nhất 8 ký tự.');
  } else {
    setter('');
  }
};

// input validation for pet form
export const isEmpty = (value: string) => value.trim() === '';

export const isNotChecked = (value: number) => value === -1;
