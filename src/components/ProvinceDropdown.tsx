import React from 'react';

const ProvinceDropdown = ({
  provinces,
  onChange,
}: {
  provinces: any[];
  onChange: any;
}) => {
  return (
    <select
      className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      onChange={onChange}
    >
      <option value="">Chọn Tỉnh/Thành phố</option>
      {provinces.map((province) => (
        <option key={province.code} value={province.code}>
          {province.name}
        </option>
      ))}
    </select>
  );
};

export default ProvinceDropdown;
