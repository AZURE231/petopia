export interface IApiResponse<T> {
  data: T;
  pageSize?: number;
  totalNumber?: number;
  pageIndex?: number;
  pageNumber?: number;
}

export interface IApiErrorResponse {
  errorCode: number;
  errorMessage: string;
}

export interface IPaginationRequest<T> {
  pageIndex: number;
  pageSize?: number;
  orderBy?: string;
  filter?: T;
}

export interface IPaginationModel {
  pageIndex: number;
  pageNumber: number;
}

export interface IUploadImage {
  images: string[];
  showImages: string[];
  files: File[];
}
