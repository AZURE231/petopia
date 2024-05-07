export interface IPaymentTypes {
    id: string;
    price: number;
    monthDuration: number;
    description: string;
}

export interface IPayment {
    blogId: string;
    advertisementId: string;
    nonce: string;
}