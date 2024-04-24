import { ILocationResponse } from '@/src/interfaces/pet';
import React, { useEffect } from 'react';
import { FilterDropDown } from '../general/FilterDropdown';

interface IAddressInput {
  options: ILocationResponse[];
  onChange: (code: string) => void;
  title: string;
  value: string;
  isLocationLoading: boolean;
  level: number;
  currentLevel: number;
}

export const AddressInput = ({
  options,
  onChange,
  value,
  level,
  currentLevel,
  isLocationLoading,
}: IAddressInput) => {

  useEffect(() => {
    !isLocationLoading && level === currentLevel && onChange(value);
  }, [isLocationLoading]);

  return (
    <FilterDropDown
      options={options.map(option => ({ value: option.code, label: option.name }))}
      value={value}
      setValue={onChange}
    />
  );
};
