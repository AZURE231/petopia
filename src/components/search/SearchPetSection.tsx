'use client';
import { useState } from 'react';
import { PetFilterBarMobile } from './PetFilterBarMobile';
import { PetSearchBar } from './PetSearchBar';
import { PetCard } from './PetCard';
import Pagination from '../general/Pagination';
import { QueryProvider } from '../general/QueryProvider';
import { SortBlock } from '../general/SortBlock';
import { PetFilterBar } from './PetFilterBar';
import { useForm } from 'react-hook-form';
import { IApiResponse, IPaginationModel } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { getPets } from '@/src/services/pet.api';
import { NoResultBackground } from '../general/NoResultBackground';
import { IPetFilterRequest, IPetResponse } from '@/src/interfaces/pet';
import { PAGE_SIZE, QUERY_KEYS } from '@/src/utils/constants';
import CardSkeleton from '../general/CardSkeleton';
import { ImageSearch } from './ImageSearch';
import { FaFilter } from 'react-icons/fa';

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
        showFilterMobile={showFilterMobile}
        setShowFilterMobile={setShowFilterMobile}
        filterForm={filterFrom}
        disable={getPetsQuery.isFetching}
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
              <div className="flex w-full mb-10">
                <PetSearchBar
                  filterForm={filterFrom}
                  disable={getPetsQuery.isFetching}
                />
                <ImageSearch
                  disable={getPetsQuery.isLoading}
                  filterForm={filterFrom}
                />
              </div>
              <div className="flex items-center justify-end w-full">
                {filterFrom.getValues('text') ? (
                  <div className="flex-1 text-xl italic font-light">
                    {`Hiễn thị kết quả cho: ${filterFrom.getValues('text')}`}
                  </div>
                ) : (
                  <></>
                )}
                <SortBlock
                  orderBy={orderBy}
                  setOrderBy={setOrderBy}
                  disable={getPetsQuery.isFetching}
                />
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setShowFilterMobile(true)}
                >
                  <FaFilter color="grey" size={24} />
                  <FaFilter color="grey" size={24} />
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-y-5 gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                {getPetsQuery.isLoading &&
                  Array.from({ length: PAGE_SIZE }).map((_, index) => (
                    <CardSkeleton key={index} />
                  ))}
                {!getPetsQuery.isLoading &&
                  pets.length > 0 &&
                  pets.map((pet) => (
                    <PetCard
                      isEditable={false}
                      key={pet.id}
                      id={pet.id}
                      name={pet.name}
                      breed={pet.breed}
                      sex={pet.sex}
                      age={pet.age}
                      image={pet.image}
                      isOrgOwned={pet.isOrgOwned}
                    />
                  ))}
              </div>
              <NoResultBackground show={pets.length === 0} />
              <div className="flex items-center justify-center mt-5">
                <Pagination
                  paginationForm={paginationForm}
                  disable={getPetsQuery.isFetching}
                  show={
                    pets.length !== 0 &&
                    paginationForm.getValues('pageNumber') != 1
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});
