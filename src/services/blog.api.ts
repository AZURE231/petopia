import { IBlog } from "../interfaces/blog";
import { http } from "./http";

export const createBlog = async (data: IBlog) => await http.post('/Blog', data);