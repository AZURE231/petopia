import React from 'react';
import { ILocationResponse } from '../interfaces/petProfile';
import { UseFormWatch } from 'react-hook-form';
import { IUserUpdate } from '../interfaces/user';

const Address = ({
  locations,
  onChange,
  title,
  watch,
  watchValue,
}: {
  locations: ILocationResponse[];
  onChange: any;
  title: string;
  watch: UseFormWatch<IUserUpdate>;
  watchValue: 'provinceCode' | 'districtCode' | 'wardCode';
}) => {
  return (
    <select
      className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      onChange={onChange}
      value={watch(watchValue)}
    >
      <option value="">{title}</option>
      {locations?.map((location) => (
        <option key={location.code} value={location.code}>
          {location.name}
        </option>
      ))}
    </select>
  );
};

export default Address;
