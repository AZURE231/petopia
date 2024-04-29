import React, { useState } from 'react';
import { useQuery } from '@/src/utils/hooks';
import { QUERY_KEYS } from '@/src/utils/constants';
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
  const [breeds, setBreeds] = useState<string[]>(['Chưa rõ']);

  // QUERY
  useQuery<IApiResponse<string[]>>(
    [QUERY_KEYS.GET_BREED_DETAIL, watch('species')],
    () => getBreed(watch('species')),
    {
      onSuccess: (res) => {
        setBreeds(breed => [...breed, ...res.data.data]);
      },
      enabled: watch('species') !== -1,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <FilterDropDown
      options={breeds.map(e => ({ label: e, value: e }))}
      value={watch('breed')}
      setValue={(value: string) => setValue('breed', value)}
      title='Chọn giống'
    />
  );
}