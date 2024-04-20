import { IPostPetPost } from '../interfaces/post';
import { http } from './http';

export const getPetPosts = async (petId: string) =>
  await http.get(`/Post/Pet/${petId}`);

export const createPost = async (data: IPostPetPost) =>
  await http.post('/Post', data);
