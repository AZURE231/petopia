export interface IApiResponse<T> {
  data: T,
  pageSize?: number,
  totalNumber?: number,
  pageIndex?: number,
  pageNumber?: number,
}

export interface IApiErrorResponse {
  errorCode: number,
  errorMessage: string,
}

export interface IPaginationRequest<T> {
  pageIndex: number,
  pageSize?: number,
  filter: T,
  orderBy?: string,
}

export interface IPaginationModel {
  pageIndex: number,
  pageNumber: number,
}