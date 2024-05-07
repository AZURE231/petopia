import React, { use, useEffect, useState } from 'react';
import { useQuery } from '@/src/utils/hooks';
import { PET_SPECIES, QUERY_KEYS } from '@/src/utils/constants';
import { IApiResponse } from '@/src/interfaces/common';
import { getBreed } from '@/src/services/pet.api';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/pet';
import { FilterDropDown } from '../general/FilterDropdown';

export default function BreedInput({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}) {
  // QUERY
  const getBreedQuery = useQuery<IApiResponse<string[]>>(
    [QUERY_KEYS.GET_BREED_DETAIL, watch('species')],
    () => getBreed(watch('species')),
    {
      onSuccess: (res) => {
        setValue('listBreed', res.data.data);
      },
      enabled: watch('species') !== -1,
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
          disabled={getBreedQuery.isLoading}
          options={watch('listBreed')?.map((e) => ({ label: e, value: e }))}
          value={watch('breed')}
          setValue={(value: string) => setValue('breed', value)}
          title="Chọn giống"
        />
      )}
    </>
  );
}
