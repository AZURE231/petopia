import { IPetFilter, IPetFilterRequest } from '@/src/interfaces/pet';
import { PET_SPECIES } from '@/src/utils/constants';
import { get } from 'http';
import { use, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IPetFilterCard {
  filter: IPetFilter;
  disabled: boolean;
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  handleSetSpecies: (speciesList: PET_SPECIES[]) => void;
  isMobile: boolean;
  testId?: string;
}

export const PetFilterCard = (props: IPetFilterCard) => {
  const { filter, disabled, handleSetSpecies, isMobile } = props;
  const { setValue, getValues } = props.filterForm;

  // STATES
  const [showFilter, setShowFilter] = useState({});

  // HANDLERS
  const handleShowFilter = (id: number) => {
    setShowFilter({
      ...showFilter,
      [id]: !showFilter[id as keyof typeof showFilter],
    });
  };

  const setFilter = (array: any[] | undefined, itemValue: number | string) => {
    if (array === undefined) array = [];
    const index = array.indexOf(itemValue);
    if (index !== -1) array.splice(index, 1);
    else array.push(itemValue);
    return array;
  };

  const handleClickFilter = (filterId: number, itemValue: number | string) => {
    setValue('text', '');
    switch (filterId) {
      case 1:
        let speciesList = getValues('species');
        let newSpeciesList = setFilter(speciesList, itemValue);
        setValue('species', newSpeciesList);
        handleSetSpecies(newSpeciesList);
        break;

      case 2:
        let sex = getValues('sex');
        setValue('sex', setFilter(sex, itemValue));
        break;

      case 3:
        let color = getValues('color');
        setValue('color', setFilter(color, itemValue));
        break;

      case 4:
        let size = getValues('size');
        setValue('size', setFilter(size, itemValue));
        break;

      case 5:
        let age = getValues('age');
        setValue('age', setFilter(age, itemValue));
        break;

      case 6:
        let isVaccinated = getValues('isVaccinated');
        setValue('isVaccinated', setFilter(isVaccinated, itemValue));
        break;

      case 7:
        let isSterillized = getValues('isSterillized');
        setValue('isSterillized', setFilter(isSterillized, itemValue));
        break;

      default:
        let breed = getValues('breed');
        setValue('breed', setFilter(breed, itemValue));
        break;
    }
  };

  const checkChecked = (filter: IPetFilter, value: number | string) => {
    let values = getValues(filter.labelGetValues) as any[] | undefined;
    return values !== undefined && values.includes(value);
  };

  return (
    <div
      key={filter.id}
      className={`${
        isMobile
          ? 'border-t border-gray-200 px-4 py-6'
          : 'border-b border-gray-200 py-6'
      }`}
    >
      <h3
        className={`S${isMobile ? '-mx-2 -my-3 flow-root' : '-my-3 flow-root'}`}
      >
        {/* <!-- Expand/collapse section button --> */}
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
          onClick={() => handleShowFilter(filter.id)}
        >
          <span className="font-medium text-gray-900">{filter.label}</span>
          <span className="ml-6 flex items-center">
            {/* <!-- Expand icon, show/hide based on section open state. --> */}
            {!showFilter[filter.id as keyof typeof showFilter] && (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            )}
            {/* <!-- Collapse icon, show/hide based on section open state. --> */}
            {showFilter[filter.id as keyof typeof showFilter] && (
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
        </button>
      </h3>
      {/* <!-- Filter section, show/hide based on section state. --> */}
      {showFilter[filter.id as keyof typeof showFilter] && (
        <div  className="pt-6" id="filter-section-0">
          <div className="space-y-4">
            {filter.items.map((item) => (
              <div test-id={'filter-card'} key={item.id} className="flex items-center">
                <input
                  
                  id={`filter-${filter.label}-${item.id}`}
                  name={`${filter.label}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onClick={() => handleClickFilter(filter.id, item.value)}
                  disabled={disabled}
                  checked={checkChecked(filter, item.value)}
                />
                <label
                  htmlFor={`filter-${filter.label}-${item.id}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
