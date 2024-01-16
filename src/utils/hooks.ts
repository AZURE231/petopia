
import { IApiErrorResponse } from '../interfaces/common';
import {
  useMutation as useMutationLib,
  useQuery as useQueryLib,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  QueryKey
} from 'react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useRef } from 'react';

/*----------------------------- USE MUTATION ----------------------------- */
export function useMutation<TData = any, TVariables = any, TContext = unknown>(
  mutationFn: any,
  options?: Omit<
    UseMutationOptions<AxiosResponse<TData>, AxiosResponse<IApiErrorResponse>, TVariables, TContext>,
    'mutationFn'
  >
): UseMutationResult<AxiosResponse<TData>, AxiosResponse<IApiErrorResponse>, TVariables, TContext> {
  return useMutationLib(mutationFn, options);
}

/*------------------------------ USE QUERY ------------------------------ */
export function useQuery<TData = any, TQueryFnData = any, TQueryKey extends QueryKey = QueryKey>(
  queryKey: TQueryKey,
  queryFn: any,
  options?: Omit<
    UseQueryOptions<TQueryFnData, AxiosResponse<IApiErrorResponse>, AxiosResponse<TData>, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<AxiosResponse<TData>, AxiosResponse<IApiErrorResponse>> {
  return useQueryLib(queryKey, queryFn, options);
}

/*----------------------------- USE RUN ONCE ---------------------------- */
export const useRunOnce = (fn: () => any) => {
  const triggered = useRef<boolean>(false);

  useEffect(() => {
    const hasBeenTriggered = triggered.current;

    if (!hasBeenTriggered) {
      fn();
      triggered.current = true;
    }
  }, [fn]);

  return null;
};