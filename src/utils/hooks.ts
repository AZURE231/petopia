import { MutationFunction, useMutation as useMutationDefault } from "react-query"
import { IApiErrorResponse, IApiResponse } from "../interfaces/common"

/*----------------------------- USE MUTATION ----------------------------- */
interface IUserMutation<TRes, TReq> {
  mutationFn: MutationFunction<IApiResponse<TRes>, TReq>,
  onSuccess: (res: IApiResponse<TRes>) => void,
  onError: (err: IApiErrorResponse) => void,
}
export function useMutation<TRes, TReq>(props: IUserMutation<TRes, TReq>) {
  const {mutationFn, onError, onSuccess} = props;
  return useMutationDefault<IApiResponse<TRes>, IApiErrorResponse, TReq>({
    mutationFn: mutationFn,
    onError: onError,
    onSuccess: onSuccess,
  })
}