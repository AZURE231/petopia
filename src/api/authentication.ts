import axios from "axios";
import { IRegisterRequest } from "../interfaces/authentication";

export async function register(req: IRegisterRequest) {
  return axios.post('https://127.0.0.1/api/Authentication/Register', req)
}