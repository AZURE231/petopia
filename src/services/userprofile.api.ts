import { http } from './http';

export const getUserInfo = async () => await http.get('/User/CurrentUser');
