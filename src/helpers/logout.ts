import { deleteCookie } from 'cookies-next';
import { COOKIES_NAME } from '../utils/constants';

export const logout = () => {
  deleteCookie(COOKIES_NAME.ACCESS_TOKEN);
  deleteCookie(COOKIES_NAME.REFRESH_TOKEN);
  window.location.replace('/login');
};