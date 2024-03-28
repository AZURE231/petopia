// components/DistrictDropdown.js
import React from 'react';
import { ILocationResponse } from '../interfaces/petProfile';
import { UseFormWatch } from 'react-hook-form';
import { IUserUpdate } from '../interfaces/user';

const DistrictDropdown = ({
  districts,
  onChange,
  title,
  watch,
}: {
  districts: ILocationResponse[];
  onChange: any;
  title: string;
  watch: UseFormWatch<IUserUpdate>;
}) => {
  return (
    <select
      className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      onChange={onChange}
      defaultValue={watch('districtCode')}
    >
      <option value="">Chọn Quận/huyện</option>
      {districts?.map((district) => (
        <option key={district.code} value={district.code}>
          {district.name}
        </option>
      ))}
    </select>
  );
};

export default DistrictDropdown;
