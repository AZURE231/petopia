import { ILocationResponse } from '@/src/interfaces/pet';
import { useClickOutside } from '@/src/utils/hooks';
import { on } from 'events';
import { set } from 'mobx';
import React, { use, useEffect, useRef, useState } from 'react';

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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(
    ''
  );
  const [filteredAddress, setFilteredAddress] =
    useState<ILocationResponse[]>(options);

  // REF
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);

  // HANDLE
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    const filtered = options.filter((breed) =>
      breed.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAddress(filtered);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useClickOutside(() => {
    setShowDropdown(false);
  }, [listRef, buttonRef]);

  useEffect(() => {
    setSelectedAddress(options.find((option) => option.code === value)?.name);
  }, [value]);

  useEffect(() => {
    setFilteredAddress(options);
  }, [options]);

  useEffect(() => {
    !isLocationLoading && level === currentLevel && onChange(value);
  }, [isLocationLoading]);

  return (
    <>
      {/* <div className="relative inline-block text-left">
        <div className="text-sm font-medium mb-2">{title}</div>
        <div>
          <span className="rounded-md shadow-sm">
            <input
              ref={buttonRef}
              type="text"
              value={filter}
              onChange={handleFilterChange}
              onClick={toggleDropdown}
              className="text-black placeholder-black w-full text-center hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              placeholder={'selectedAddress'}
            />
          </span>
        </div>
        {showDropdown && (
          <div
            ref={listRef}
            className="w-full absolute text-center max-h-80 overflow-y-auto mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
          >
            <div className="py-1" role="menu">
              <div
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  // onChange(option.code);
                  setSelectedAddress(title);
                  setFilter(title);
                  setShowDropdown(false);
                }}
              >
                {title}
              </div>
              {filteredAddress.map((option, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  onClick={() => {
                    onChange(option.code);
                    setSelectedAddress(option.name);
                    setFilter(option.name);
                    setShowDropdown(false);
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
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
    </>
  );
};
