import { IBlog } from '../interfaces/blog';
import { http } from './http';

export const postBlog = async (data: IBlog) => await http.post('/Blog', data);
