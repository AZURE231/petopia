import { IPetFilterRequest } from '@/src/interfaces/pet';
import { FormEvent, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IPetSearchBar {
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}

export function PetSearchBar(props: IPetSearchBar) {
  const { setValue } = props.filterForm;
  const [text, setText] = useState<string>('');
  const { disable } = props;

  const handleOnSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e && e.preventDefault();
    !disable && setValue('text', text);
  };

  return (
    <form
      className="flex items-center justify-center mb-10"
      onSubmit={handleOnSubmit}
    >
      <div className="relative w-2/3">
        <input
          test-id="search-pet-bar"
          type="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500   "
          placeholder="Tìm kiếm..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="text-white absolute end-2.5 bottom-2.5 bg-none hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2 "
          type="submit"
          onClick={() => handleOnSubmit}
        >
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
        </button>
      </div>
    </form>
  );
}
