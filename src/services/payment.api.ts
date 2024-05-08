import { ICreatePaymentRequest } from '../interfaces/payment';
import { http } from './http';

export const getAdTypes = async () => await http.get('/Payment/AdvertisementType');

export const getPaymentToken = async () => await http.get('/Payment/Token');

export const createPayment = async (data: ICreatePaymentRequest) => await http.post('/Payment', data);
