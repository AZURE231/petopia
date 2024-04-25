import { IPetFilter, IPetFilterRequest } from '@/src/interfaces/pet';
import { useRef, useState, useEffect } from 'react';
import { UseFormReturn, set } from 'react-hook-form';
import { PET_FILTERS, PET_SPECIES, QUERY_KEYS } from '@/src/utils/constants';
import { useClickOutside, useQuery } from '@/src/utils/hooks';
import { PetFilterCard } from './PetFilterCard';
import { IApiResponse } from '@/src/interfaces/common';
import { getAvailableBreeds } from '@/src/services/pet.api';

export function PetFilterBarMobile({
  showFilterMobile,
  setShowFilterMobile,
  filterForm,
  disable,
}: {
  showFilterMobile: boolean;
  setShowFilterMobile: (showFilterMobile: boolean) => void;
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}) {
  const [species, setSpecies] = useState<PET_SPECIES>();
  const [breedFilter, setBreedFilter] = useState<IPetFilter>();

  // HANDLERS
  const handleSetSpecies = (speciesList: PET_SPECIES[]) => {
    if (speciesList.length == 1 && speciesList.includes(PET_SPECIES.DOG)) {
      setSpecies(PET_SPECIES.DOG);
      return;
    }
    if (speciesList.length == 1 && speciesList.includes(PET_SPECIES.CAT)) {
      setSpecies(PET_SPECIES.CAT);
      return;
    }
    setSpecies(undefined);
    setBreedFilter(undefined);
  };

  // EFFECTS
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  useClickOutside(() => {
    setShowFilterMobile(false);
  }, [buttonRef, divRef]);

  // QUERIES AND MUTATIONS
  const getBreedQuery = useQuery<IApiResponse<string[]>>(
    [QUERY_KEYS.GET_PET_BREEDS, species],
    () => species !== undefined && getAvailableBreeds({ species: species }),
    {
      onSuccess: (res) => {
        let filterItems = res.data.data.map((value, index) => {
          return {
            id: index,
            value: value,
            label: value,
          };
        });
        setBreedFilter({
          id: PET_FILTERS.length + 1,
          items: filterItems,
          label: 'Giống',
          labelGetValues: 'breed',
        });
      },
      enabled: species !== undefined,
    }
  );

  useEffect(() => {
    let speciesList = filterForm.watch('species');
    speciesList && handleSetSpecies(speciesList);
  }, [filterForm.watch('species')]);

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
              <>
                <PetFilterCard
                  key={filter.id}
                  filter={filter}
                  disabled={disable || getBreedQuery.isLoading}
                  handleSetSpecies={handleSetSpecies}
                  filterForm={filterForm}
                  isMobile={true}
                />
                {filter.id === 1 && breedFilter !== undefined && (
                  <PetFilterCard
                    key={PET_FILTERS.length + 1}
                    filter={breedFilter}
                    disabled={disable || getBreedQuery.isLoading}
                    handleSetSpecies={handleSetSpecies}
                    filterForm={filterForm}
                    isMobile={true}
                  />
                )}
              </>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
