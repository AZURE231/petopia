import { IBlog } from '../interfaces/blog';
import { IPaginationRequest } from '../interfaces/common';
import { http } from './http';

export const postBlog = async (data: IBlog) => await http.post('/Blog', data);

export const getBlogs = async (data: IPaginationRequest<number>) =>
  await http.post('/Blog/Get', data);

export const getBlogDetail = async (id: string) =>
  await http.get(`/Blog/${id}`);

export const getBlogsByUser = async (data: IPaginationRequest<string>) =>
  await http.post('/Blog/User', data);

export const deleteBlog = async (id: string) =>
  await http.delete(`/Blog/${id}`);
