import { http } from './http';
  
export const getNotifications = async () => await http.get('/Notification');