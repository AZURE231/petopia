import React from 'react';
import { ILocationResponse } from '../interfaces/petProfile';
import { UseFormWatch } from 'react-hook-form';
import { IUserUpdate } from '../interfaces/user';

const ProvinceDropdown = ({
  provinces,
  onChange,
  title,
  watch,
}: {
  provinces: ILocationResponse[];
  onChange: any;
  title: string;
  watch: UseFormWatch<IUserUpdate>;
}) => {
  return (
    <select
      className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      onChange={onChange}
      defaultValue={watch('provinceCode')}
    >
      <option value="">{title}</option>
      {provinces?.map((province) => (
        <option key={province.code} value={province.code}>
          {province.name}
        </option>
      ))}
    </select>
  );
};

export default ProvinceDropdown;
