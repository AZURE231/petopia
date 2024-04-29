import { IBlog } from '../interfaces/blog';
import { IPaginationRequest } from '../interfaces/common';
import { http } from './http';

export const postBlog = async (data: IBlog) => await http.post('/Blog', data);
export const getBlogs = async (data: IPaginationRequest<number>) => await http.post('/Blog/Get',data);
