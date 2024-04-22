import { IPetFilter, IPetFilterRequest } from "@/src/interfaces/pet";
import { useRef, useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { PET_FILTERS } from "@/src/utils/constants";
import { useClickOutside } from "@/src/utils/hooks";

interface IFilterBar {
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}

export function PetFilterBarMobile({
  filterContent,
  showFilterMobile,
  setShowFilterMobile,
  filterForm,
  disable,
}: {
  filterContent: IPetFilter[];
  showFilterMobile: boolean;
  setShowFilterMobile: (showFilterMobile: boolean) => void;
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}) {
  const { getValues, setValue } = filterForm;

  const [showFilter, setShowFilter] = useState<{ [key: number]: boolean }>({});
  const [selectedValues, setSelectedValues] = useState<{ [key: string]: number[] }>({});

  const setFilter = (array: number[] | undefined, itemValue: number) => {
    if (array === undefined) array = [];
    const index = array.indexOf(itemValue);
    if (index !== -1) array.splice(index, 1);
    else array.push(itemValue);
    return array;
  };

  const handleShowFilter = (id: number) => {
    setShowFilter({
      ...showFilter,
      [id]: !showFilter[id as keyof typeof showFilter],
    });
  };

  const handleClickFilter = (filterId: number, itemValue: number) => {
    switch (filterId) {
      case 1:
        let species = getValues("species");
        setValue("species", setFilter(species, itemValue));
        break;

      case 2:
        let sex = getValues("sex");
        setValue("sex", setFilter(sex, itemValue));
        break;

      case 3:
        let color = getValues("color");
        setValue("color", setFilter(color, itemValue));
        break;

      case 4:
        let size = getValues("size");
        setValue("size", setFilter(size, itemValue));
        break;

      case 5:
        let age = getValues("age");
        setValue("age", setFilter(age, itemValue));
        break;

      case 6:
        let isVaccinated = getValues("isVaccinated");
        setValue("isVaccinated", setFilter(isVaccinated, itemValue));
        break;

      default:
        let isSterillized = getValues("isSterillized");
        setValue("isSterillized", setFilter(isSterillized, itemValue));
        break;
    }
  };
  const handleCheckboxChange = (filterId: number, itemValue: number) => {
    const selectedValuesCopy = { ...selectedValues };
    const key = `${filterId}-${itemValue}`;

    if (selectedValuesCopy[key]) {
      delete selectedValuesCopy[key];
    } else {
      selectedValuesCopy[key] = selectedValuesCopy[key] ? [...selectedValuesCopy[key], itemValue] : [itemValue];
    }

    setSelectedValues(selectedValuesCopy);
  };



  // EFFECTS
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside(() => {
    setShowFilterMobile(false);
  }, [buttonRef, divRef]);

  useEffect(() => {
    const selectedValuesCopy = { ...selectedValues };
    const filterFormValues = getValues();
    Object.keys(filterFormValues).forEach((key) => {
      const filterId = parseInt(key.split("_")[1]);
      const values = filterFormValues[key as keyof typeof filterFormValues];
      if (Array.isArray(values)) {
        values.forEach((value: number) => {
          selectedValuesCopy[`${filterId}-${value}`] = [value];
        });
      }
    });
    setSelectedValues(selectedValuesCopy);
  }, [getValues]);


  if (!showFilterMobile) return null;
  return (
    <div className="relative z-40 lg:hidden" role="dialog">
      {/* <!-- Off-canvas menu backdrop, show/hide based on off-canvas menu state. --> */}
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>

      <div className="fixed inset-0 z-40 flex">
        {/* <!-- Off-canvas menu, show/hide based on off-canvas menu state. --> */}
        <div
          ref={divRef}
          className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            {/* <!-- Close button --> */}
            <button
              type="button"
              ref={buttonRef}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              onClick={() => setShowFilterMobile(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            {PET_FILTERS.map((filter) => (
              <div
                key={filter.id}
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  {/* <!-- Expand/collapse section button --> */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    onClick={() => handleShowFilter(filter.id)}
                  >
                    <span className="font-medium text-gray-900">
                      {filter.label}
                    </span>
                    <span className="ml-6 flex items-center">
                      {/* <!-- Expand icon, show/hide based on section open state. --> */}
                      {!showFilter[filter.id as keyof typeof showFilter] && (
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
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
                  <div
                    className="pt-6"
                    id={`filter-section-mobile-${filter.id}`}
                  >
                    <div className="space-y-6">
                      {filter.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id={`filter-mobile-${filter.label}-${item.id}`}
                            name={`${filter.label}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onClick={() =>
                              handleClickFilter(filter.id, item.value)
                            }
                            checked={!!selectedValues[`${filter.id}-${item.value}`]}
                            onChange={() =>
                              handleCheckboxChange(filter.id, item.value)
                            }
                            disabled={disable}
                          />
                          <label
                            htmlFor={`filter-mobile-${filter.label}-${item.id}`}
                            className="ml-3 min-w-0 flex-1 text-gray-500"
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
        </div>
      </div>
    </div>
  );
}
