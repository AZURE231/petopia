import { IPetFilterRequest } from '@/src/interfaces/pet';
import { PET_FILTERS } from '@/src/utils/constants';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IFilterBar {
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}

export const PetFilterBar = (props: IFilterBar) => {
  const { getValues, setValue } = props.filterForm;
  const { disable } = props;
  const [showFilter, setShowFilter] = useState({});

  const handleShowFilter = (id: number) => {
    setShowFilter({
      ...showFilter,
      [id]: !showFilter[id as keyof typeof showFilter],
    });
  };

  const setFilter = (array: any[] | undefined, itemValue: number) => {
    if (array === undefined) array = [];
    const index = array.indexOf(itemValue);
    if (index !== -1) array.splice(index, 1);
    else array.push(itemValue);
    return array;
  };

  const handleClickFilter = (filterId: number, itemValue: number) => {
    switch (filterId) {
      case 1:
        let species = getValues('species');
        setValue('species', setFilter(species, itemValue));
        break;

      case 4:
        let sex = getValues('sex');
        setValue('sex', setFilter(sex, itemValue));
        break;

      case 3:
        let color = getValues('color');
        setValue('color', setFilter(color, itemValue));
        break;

      case 5:
        let size = getValues('size');
        setValue('size', setFilter(size, itemValue));
        break;

      case 2:
        let age = getValues('age');
        setValue('age', setFilter(age, itemValue));
        break;

      case 6:
        let isVaccinated = getValues('isVaccinated');
        setValue('isVaccinated', setFilter(isVaccinated, itemValue));
        break;

      default:
        let isSterillized = getValues('isSterillized');
        setValue('isSterillized', setFilter(isSterillized, itemValue));
        break;
    }
  };

  return (
    <form className="hidden lg:block">
      {PET_FILTERS.map((filter) => (
        <div key={filter.id} className="border-b border-gray-200 py-6">
          <h3 className="-my-3 flow-root">
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
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
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
            <div className="pt-6" id="filter-section-0">
              <div className="space-y-4">
                {filter.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      id={`filter-${filter.label}-${item.id}`}
                      name={`${filter.label}[]`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onClick={() => handleClickFilter(filter.id, item.value)}
                      disabled={disable}
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
      ))}
    </form>
  );
};
