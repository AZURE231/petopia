import React, { ChangeEvent, useEffect } from 'react';
import { ILocationResponse } from '../interfaces/petProfile';

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
  title,
  value,
  level,
  currentLevel,
  isLocationLoading,
}: IAddressInput) => {

  useEffect(() => {
    !isLocationLoading && level === currentLevel && onChange(value);
  }, [isLocationLoading]);

  return (
    <select
      className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option value="">{title}</option>
      {options?.map((location) => (
        <option key={location.code} value={location.code}>
          {location.name}
        </option>
      ))}
    </select>
  );
};