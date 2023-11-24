export interface IApiResponse<T> {
  data: T,
  itemsNumber?: number,
  totalNumber?: number,
  pageIndex?: number,
  pageNumber?: number,
}

export interface IApiErrorResponse {
  errorCode: number,
  errorMessage: string,
}