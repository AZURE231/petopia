import { IApiErrorResponse } from '@/src/interfaces/common';
import { IPredictResponse } from '@/src/interfaces/pet';
import { useClickOutside } from '@/src/utils/hooks';
import { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BsStars } from 'react-icons/bs';
import { UseQueryResult } from 'react-query';

interface IFilterDropDownOption {
  label: string;
  value: string;
}

interface IFilterDropDown {
  testId?: string;
  options: IFilterDropDownOption[];
  value: string;
  setValue: (value: string) => void;
  title?: string;
  disabled?: boolean;
  aiQuery?: UseQueryResult<
    AxiosResponse<IPredictResponse, any>,
    AxiosResponse<IApiErrorResponse, any>
  >;
  enableAI?: boolean;
}

export const FilterDropDown = (props: IFilterDropDown) => {
  const {
    title = '',
    options,
    value,
    setValue,
    disabled,
    aiQuery,
    enableAI = false,
  } = props;

  // STATES
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const [displayedOptions, setDisplayedOptions] =
    useState<IFilterDropDownOption[]>(options);

  // EFFECTS
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);
  useClickOutside(() => {
    setShowDropdown(false);
  }, [listRef, buttonRef]);

  useEffect(() => {
    if (value) {
      const currentOptions = options.filter((e) => e.value === value);
      currentOptions.length && setFilterText(currentOptions[0].label);
    } else {
      setFilterText('Không rõ');
    }
  }, [value]);

  useEffect(() => {
    if (options.filter((e) => e.label === filterText).length) {
      setDisplayedOptions(options);
    } else {
      const newOptions = options.filter((e) =>
        e.label.toLowerCase().includes(filterText.toLowerCase())
      );
      setDisplayedOptions(newOptions);
    }
  }, [filterText]);

  useEffect(() => {
    setDisplayedOptions(options);
  }, [options]);

  return (
    <div className="relative inline-block text-left">
      {title && (
        <div className="text-sm flex font-medium mb-2">
          {title}{' '}
          {aiQuery?.isSuccess && enableAI && (
            <span className="ml-3 flex text-yellow-500 relative">
              Hỗ trợ bởi AI{' '}
              <span className="text-lg animate-pulse absolute bottom-3 -right-5">
                <BsStars />
              </span>
            </span>
          )}
        </div>
      )}
      <div>
        <span className="rounded-md shadow-sm">
          <input
            test-id={props.testId}
            disabled={disabled}
            ref={buttonRef}
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onClick={() => setShowDropdown(!showDropdown)}
            className={`text-black placeholder-black w-full text-center  
            border border-gray-300 ${
              aiQuery?.isLoading && enableAI
                ? 'border-yellow-600 animate-pulse bg-yellow-200'
                : 'border-gray-300 hover:bg-slate-100'
            } focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center`}
          />
        </span>
      </div>
      {showDropdown && options.length !== 0 && (
        <div
          ref={listRef}
          className="w-full absolute text-center max-h-80 overflow-y-auto mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 "
        >
          <div className="py-1" role="menu">
            {displayedOptions.map((option, index) => (
              <div
                test-id="dropdown-option"
                key={index}
                className="block px-4 py-2 text-sm text-black hover:bg-gray-100 cursor-pointer"
                role="menuitem"
                onClick={() => {
                  setValue(option.value);
                  setShowDropdown(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
