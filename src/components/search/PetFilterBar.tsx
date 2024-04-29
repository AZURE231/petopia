import { IApiResponse } from '@/src/interfaces/common';
import { IPetFilter, IPetFilterRequest } from '@/src/interfaces/pet';
import { getAvailableBreeds } from '@/src/services/pet.api';
import { PET_FILTERS, PET_SPECIES, QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PetFilterCard } from './PetFilterCard';

interface IFilterBar {
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>;
  disable: boolean;
}

export const PetFilterBar = (props: IFilterBar) => {
  const { disable, filterForm } = props;

  // STATES
  const [species, setSpecies] = useState<PET_SPECIES>();
  const [breedFilter, setBreedFilter] = useState<IPetFilter>();

  // HANDLERS
  const handleSetSpecies = (speciesList: PET_SPECIES[]) => {
    if (!speciesList) return;
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
          id: PET_FILTERS.length + 10,
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

  return (
    <form className="hidden lg:block">
      {PET_FILTERS.map((filter, index) => (
        <div key={filter.id}>
          <PetFilterCard
            filter={filter}
            disabled={disable || getBreedQuery.isLoading}
            handleSetSpecies={handleSetSpecies}
            filterForm={filterForm}
            isMobile={false}
          />
          {filter.id === 1 && breedFilter !== undefined && (
            <PetFilterCard
              filter={breedFilter}
              disabled={disable || getBreedQuery.isLoading}
              handleSetSpecies={handleSetSpecies}
              filterForm={filterForm}
              isMobile={false}
            />
          )}
        </div>
      ))}
    </form>
  );
};
