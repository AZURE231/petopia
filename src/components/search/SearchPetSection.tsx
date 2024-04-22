'use client';
import { useState } from 'react';
import { PetFilterBarMobile } from './PetFilterBarMobile';
import { PetSearchBar } from './PetSearchBar';
import { PetCard } from './PetCard';
import Pagination from '../general/Pagination';
import { QueryProvider } from '../general/QueryProvider';
import { PetSortBlock } from './PetSortBlock';
import { PetFilterBar } from './PetFilterBar';
import { useForm } from 'react-hook-form';
import { IApiResponse, IPaginationModel } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { getPets } from '@/src/services/pet.api';
import { NoResultBackground } from '../general/NoResultBackground';
import { IPetFilterRequest, IPetResponse } from '@/src/interfaces/pet';
import { PAGE_SIZE, PET_FILTERS, QUERY_KEYS } from '@/src/utils/constants';
import CardSkeleton from '../general/CardSkeleton';

export const SearchPetSection = QueryProvider(() => {
  // STATES
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const [pets, setPets] = useState<IPetResponse[]>([]);
  const [orderBy, setOrderBy] = useState<'newest' | 'popular'>('newest');

  // FORMS
  const filterFrom = useForm<IPetFilterRequest>({
    defaultValues: { text: '' },
  });

  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    },
  });

  // GET PETS QUERY
  const getPetsQuery = useQuery<IApiResponse<IPetResponse[]>>(
    [
      QUERY_KEYS.GET_PETS,
      orderBy,
      filterFrom.watch(),
      paginationForm.watch('pageIndex'),
    ],
    () =>
      getPets({
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
    }
  );

  return (
    <div>
      <PetFilterBarMobile
        filterContent={PET_FILTERS}
        showFilterMobile={showFilterMobile}
        setShowFilterMobile={setShowFilterMobile}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Tìm thú cưng
          </h1>
        </div>
        <section className="pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <PetFilterBar
              filterForm={filterFrom}
              disable={getPetsQuery.isFetching}
            />
            <div className="lg:col-span-3">
              <PetSearchBar
                filterForm={filterFrom}
                disable={getPetsQuery.isFetching}
              />
              <div className="flex items-center justify-end w-full">
                {filterFrom.getValues('text') ? (
                  <div className="flex-1 text-xl italic font-light">
                    {`Hiễn thị kết quả cho: ${filterFrom.getValues('text')}`}
                  </div>
                ) : (
                  <></>
                )}
                <PetSortBlock
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  disable={getPetsQuery.isFetching}
                />
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setShowFilterMobile(true)}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                {getPetsQuery.isLoading
                  ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))
                  : pets.map((pet) => (
                    <PetCard isEditable={false} key={pet.id} {...pet} />
                  ))}
              </div>
              <NoResultBackground show={pets.length === 0} />
              <div className="flex items-center justify-center mt-5">
                <Pagination
                  paginationForm={paginationForm}
                  disable={getPetsQuery.isFetching}
                  show={pets.length !== 0 && paginationForm.getValues('pageNumber') != 1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
