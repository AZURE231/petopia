import { DOMAIN_ERROR_MESSAGES } from './../utils/constants';

export const getErrorMessage = (code: string) => {
  const keys = Object.keys(DOMAIN_ERROR_MESSAGES);
  const result: string = keys.includes(code) ?
    DOMAIN_ERROR_MESSAGES[code as keyof typeof DOMAIN_ERROR_MESSAGES]
    : '';
  return result;
};