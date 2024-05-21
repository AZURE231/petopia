import { IApiResponse } from '@/src/interfaces/common';
import { IPetFilterRequest } from '@/src/interfaces/pet';
import { getKeywords } from '@/src/services/pet.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useClickOutside, useQuery } from '@/src/utils/hooks';
import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IPetSearchBar {
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}

export function PetSearchBar(props: IPetSearchBar) {
  const { setValue, watch } = props.filterForm;
  const { disable } = props;

  // STATES
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [showedKeywords, setShowedKeywords] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // QUERIES
  useQuery<IApiResponse<string[]>>(
    [QUERY_KEYS.GET_KEYWORDS],
    getKeywords,
    {
      onSuccess: (res) => {
        setKeywords(res.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  // EFFECTS
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);
  useClickOutside(() => {
    setShowDropdown(false);
  }, [listRef, buttonRef]);

  useEffect(() => {
    const temp = keywords.filter((keyword) =>
      keyword.toLowerCase().includes(text.toLowerCase())
    );
    setShowedKeywords(temp);
  }, [text]);

  useEffect(() => {
    setText(watch('text'));
  }, [watch('text')]);

  return (
    <div className="flex items-center justify-center mb-10">
      <div className="relative w-2/3">
        <input
          type="search"
          ref={buttonRef}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
          placeholder="Tìm kiếm..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={() => setShowDropdown(true)}
        />
        <div className="text-white absolute end-2.5 bottom-2.5 bg-none font-medium rounded-lg text-sm px-4 py-2 ">
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        {showDropdown && showedKeywords.length !== 0 && (
          <div
            ref={listRef}
            className="w-full absolute text-center max-h-80 overflow-y-auto mt-2 rounded-md shadow-lg z-50 bg-white"
          >
            <div className="py-1" role="menu">
              {showedKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                  role="menuitem"
                  onClick={() => {
                    !disable && setValue('text', keyword);
                    setShowDropdown(false);
                  }}
                >
                  {keyword}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
