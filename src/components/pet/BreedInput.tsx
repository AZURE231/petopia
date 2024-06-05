import React, { useEffect } from 'react';
import { useQuery } from '@/src/utils/hooks';
import { PET_SPECIES, QUERY_KEYS } from '@/src/utils/constants';
import { IApiErrorResponse, IApiResponse } from '@/src/interfaces/common';
import { getBreed } from '@/src/services/pet.api';
import { UseFormSetValue, UseFormWatch, set } from 'react-hook-form';
import {
  ICreatePetProfileRequest,
  IPredictResponse,
} from '@/src/interfaces/pet';
import { FilterDropDown } from '../general/FilterDropdown';
import { UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';

export default function BreedInput({
  setValue,
  watch,
  aiQuery,
  enableAI,
}: {
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
  aiQuery?: UseQueryResult<
    AxiosResponse<IPredictResponse, any>,
    AxiosResponse<IApiErrorResponse, any>
  >;
  enableAI: boolean;
}) {
  // QUERY
  const getBreedQuery = useQuery<IApiResponse<string[]>>(
    [QUERY_KEYS.GET_BREED_DETAIL, watch('species')],
    () => getBreed(watch('species')),
    {
      onSuccess: (res) => {
        setValue('listBreed', res.data.data);
        watch('predictedBreed') && setValue('breed', watch('predictedBreed'));
        watch('presetBreed') && setValue('breed', watch('presetBreed'));
      },
      enabled:
        watch('species') !== PET_SPECIES.OTHER && watch('species') !== -1,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    setValue('breed', '');
  }, [watch('species')]);

  return (
    <>
      {watch('species') != PET_SPECIES.OTHER && (
        <FilterDropDown
          testId="dropdown-option-breed"
          disabled={getBreedQuery.isLoading}
          options={watch('listBreed')?.map((e) => ({ label: e, value: e }))}
          value={watch('breed')}
          setValue={(value: string) => setValue('breed', value)}
          title="Chọn giống"
          aiQuery={aiQuery}
          enableAI={enableAI}
        />
      )}
    </>
  );
}
