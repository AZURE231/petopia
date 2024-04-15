import { http } from './http';
  
export const getNotifications = async () => await http.get('/Notification');
export const markAsRead = async () => await http.get(`/Notification/MarkAsSeen`);
export const clearAll = async () => await http.delete(`/Notification`);