import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useClickOutside, useQuery } from '@/src/utils/hooks';
import { QUERY_KEYS } from '@/src/utils/constants';
import { IApiResponse } from '@/src/interfaces/common';
import { getBreed } from '@/src/services/pet.api';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/pet';

export default function FormPetDetail({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedBreed, setSelectedBreed] = useState(
    watch('breed') || 'Chưa rõ'
  );

  // REF
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);

  useClickOutside(() => {
    setShowDropdown(false);
  }, [listRef, buttonRef]);

  // QUERY
  const getBreedQuery = useQuery<IApiResponse<string[]>>(
    [QUERY_KEYS.GET_BREED_DETAIL, watch('species')],
    () => getBreed(watch('species')),
    {
      onSuccess: (res) => {
        setBreeds(res.data.data);
        setFilteredBreeds(res.data.data);
      },
      enabled: watch('species') !== -1,
      refetchOnWindowFocus: false,
    }
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilter(value);
    const filtered = breeds.filter((breed) =>
      breed.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredBreeds(filtered);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="text-sm font-medium mb-2">Giống</div>
      <div>
        <span className="rounded-md shadow-sm">
          <input
            ref={buttonRef}
            type="text"
            value={filter}
            onChange={handleFilterChange}
            onClick={() => {
              toggleDropdown();
            }}
            className="text-black placeholder-black w-full text-center hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            placeholder={selectedBreed}
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
              role="menuitem"
              onClick={() => setSelectedBreed('Chưa rõ')}
            >
              Chưa rõ
            </div>
            {filteredBreeds.map((breed, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setSelectedBreed(breed);
                  setValue('breed', breed);
                  setFilter(breed);
                  setShowDropdown(false);
                }}
              >
                {breed}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
