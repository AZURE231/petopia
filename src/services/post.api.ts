import { IPostPetPost } from '../interfaces/post';
import { http } from './http';

export const getPetPosts = async (petId: string) =>
  await http.get(`/Post/Pet/${petId}`);

export const createPost = async (data: IPostPetPost) =>
  await http.post('/Post', data);

export const likePost = async (postId: string) =>
  await http.put(`/Post/Like/${postId}`);

export const getCommentsPost = async (postId: string) =>
  await http.get(`/Comment/post/${postId}`);

export const deletePost = async (postId: string) =>
  await http.delete(`/Post/${postId}`);
