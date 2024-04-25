'use client';
import { useEffect, useState } from 'react';
import { QueryProvider } from '../general/QueryProvider';
import ListCards from './ListCards';
import { getOtherUserInfo } from '@/src/services/user.api';
import { IUserInfoReponse } from '@/src/interfaces/user';
import { IApiResponse, IPaginationModel } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { PAGE_SIZE, QUERY_KEYS, USER_ROLE } from '@/src/utils/constants';
import { useForm } from 'react-hook-form';
import { IPetResponse } from '@/src/interfaces/pet';
import { getPetsByUser } from '@/src/services/pet.api';
import Pagination from '../general/Pagination';
import UserSkeleton from '../general/UserSkeleton';
import { NameRoleBlock } from './NameRoleBlock';
import Testimonials from '../general/Testimonials';
import { BasicInfoBlock } from './BasicInfoBlock';
import Image from 'next/image';
import { GoReport } from 'react-icons/go';


export const OtherUserInformation = QueryProvider(({ userId }: { userId: string }) => {
  // STATES
  const [userInfo, setUserInfo] = useState<IUserInfoReponse>();
  const [pets, setPets] = useState<IPetResponse[]>([]);
  const [userName, setUserName] = useState<string>('');


  // FORMS
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    },
  });

  // QUERIES
  const getUserQuery = useQuery<IApiResponse<IUserInfoReponse>>(
    [QUERY_KEYS.GET_OTHER_USER],
    () => getOtherUserInfo({ userId: userId }),
    {
      onSuccess: (res) => {
        setUserInfo(res.data.data);
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const getPetsQuery = useQuery<IApiResponse<IPetResponse[]>>(
    [QUERY_KEYS.GET_PETS, getUserQuery.isError],
    () =>
      getPetsByUser({
        pageIndex: paginationForm.getValues('pageIndex'),
        pageSize: PAGE_SIZE,
        orderBy: '',
        filter: userId,
      }),
    {
      onSuccess: (res) => {
        setPets(res.data.data);
      },
      refetchOnWindowFocus: false,
      enabled: !getUserQuery.isError,
    }
  );

  // EFFECTS
  useEffect(() => {
    if (userInfo?.role === USER_ROLE.ORGANIZATION) {
      setUserName(userInfo.attributes.organizationName);
    }
    else {
      userInfo && setUserName(
        userInfo.attributes.firstName + ' ' + userInfo.attributes.lastName
      );
    }
  }, [userInfo]);

  return (
    <>
      {getUserQuery.isLoading && <UserSkeleton />}

      {!getUserQuery.isLoading && userInfo && (
        <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-36">
          <div className="flex relative h-40">
            <div className='relative h-52 w-52 bottom-20'>
              <Image
                src={userInfo.image}
                alt="Picture of the author"
                fill
                objectFit="cover"
                className="rounded-full"
                quality={50}
              />
            </div>

            <NameRoleBlock
              name={userName}
              role={userInfo.role}
              type={userInfo.attributes.type}
              website={userInfo.attributes.website}
            />
          </div>

          <Testimonials
            description={userInfo.attributes.description}
            show={userInfo.role === USER_ROLE.ORGANIZATION}
          />

          <BasicInfoBlock
            email={userInfo.email}
            phone={userInfo.phone}
            address={userInfo.address}
          />

          <div className="mt-3 flex justify-end">
            <button className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 ml-2">
              Liên hệ
            </button>
            <button className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 ml-2">
              <GoReport size={25} />
            </button>
          </div>
        </div>
      )}
      {
        !!pets.length && <ListCards title="Danh sách thú cưng" data={pets} />
      }
      <div className="flex items-center justify-center my-5">
        <Pagination
          paginationForm={paginationForm}
          disable={getPetsQuery.isFetching}
          show={
            pets.length !== 0 &&
            paginationForm.getValues('pageNumber') != 1
          }
        />
      </div>
    </>
  );
}
);
