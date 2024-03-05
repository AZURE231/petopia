'use client';
import { useState } from 'react';
import { IPetFilterRequest, IPetResponse } from '../../interfaces/pet';
import FilterBarMobile from './FilterBarMobile';
import SearchBar from './SearchBar';
import { PetCard } from '../PetCard';
import Pagination from '../Pagination';
import { PAGE_SIZE, PET_FILTERS, QUERY_KEYS } from '../../utils/constants';
import { QueryProvider } from '../QueryProvider';
import { SortBlock } from './SortBlock';
import { FilterBar } from './FilterBar';
import { useForm } from 'react-hook-form';
import {
  IApiResponse,
  IPaginationModel
} from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { getPets } from '@/src/services/pet';

export const SearchPetSection = QueryProvider(() => {
  // STATES
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const [pets, setPets] = useState<IPetResponse[]>([]);

  // FORMS
  const [orderBy, setOrderBy] = useState<'newest' | 'popular'>('newest');
  const filterFrom = useForm<IPetFilterRequest>();
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    }
  });

  // GET PETS QUERY
  const getPetsQuery = useQuery<IApiResponse<IPetResponse[]>>(
    [QUERY_KEYS.GET_PETS, orderBy, filterFrom.watch(), paginationForm.watch('pageIndex')],
    () => getPets({
      pageIndex: paginationForm.getValues('pageIndex'),
      pageSize: PAGE_SIZE,
      orderBy: orderBy,
      filter: filterFrom.getValues(),
    }),
    {
      onSuccess: (res) => {
        const { data, pageNumber } = res.data;
        setPets(data);
        pageNumber && paginationForm.setValue('pageNumber', pageNumber);
      },
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div>
      <FilterBarMobile
        filterContent={PET_FILTERS}
        showFilterMobile={showFilterMobile}
        setShowFilterMobile={setShowFilterMobile}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Tìm thú cưng UwU
          </h1>
        </div>

        <section className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

            <FilterBar
              filterForm={filterFrom}
              isFetching={getPetsQuery.isFetching}
            />

            <div className="lg:col-span-3">

              <div className="mb-10">
                <SearchBar />
              </div>

              <SortBlock
                setShowFilterMobile={setShowFilterMobile}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                isFetching={getPetsQuery.isFetching}
              />

              <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                {
                  pets && pets.map(pet => <PetCard key={pet.id} {...pet} />)
                }
              </div>

              <div className="flex items-center justify-center mt-5">
                <Pagination
                  paginationForm={paginationForm}
                  isFetching={getPetsQuery.isFetching}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
