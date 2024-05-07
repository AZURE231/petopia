export interface IPaymentTypesResponse {
  id: string;
  price: number;
  monthDuration: number;
  description: string;
}

export interface ICreatePaymentRequest {
  blogId: string;
  advertisementId: string;
  nonce: string;
}