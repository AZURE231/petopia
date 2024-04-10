'use client';
import Image from 'next/image';
import { useState } from 'react';
import { QueryProvider } from '../general/QueryProvider';
import ListCards from './ListCards';
import { getOtherUserInfo } from '@/src/services/user.api';
import { IUserInfo } from '@/src/interfaces/user';
import { IApiResponse } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { QUERY_KEYS, STATIC_URLS } from '@/src/utils/constants';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { NoResultBackground } from '../general/NoResultBackground';
import { ClipLoader } from 'react-spinners';
import { GoReport } from 'react-icons/go';

export const OtherUserInformation = QueryProvider(
  ({ userId }: { userId: string }) => {
    const [userInfo, setUserInfo] = useState<IUserInfo>();
    const [error, setError] = useState<string>('');

    const getUserQuery = useQuery<IApiResponse<IUserInfo>>(
      [QUERY_KEYS.GET_OTHER_USER],
      () => getOtherUserInfo({ userId: userId }),
      {
        onSuccess: (res) => setUserInfo(res.data.data),
        onError: (err) => {
          setError(getErrorMessage(err.data.errorCode.toString()));
        },
        refetchOnWindowFocus: false,
      }
    );

    return (
      <>
        {getUserQuery.isLoading && (
          <div className="h-fit-screen flex items-center justify-center">
            <ClipLoader
              color={'#111111'}
              loading={getUserQuery.isLoading}
              size={28}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {!getUserQuery.isLoading &&
          (error ? (
            <NoResultBackground className="h-fit-screen w-full items-center" />
          ) : (
            <>
              <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-36">
                <div className="flex relative -mb-10">
                  <div className="relative h-52 w-52 bottom-20">
                    <Image
                      src={userInfo?.image || STATIC_URLS.NO_AVATAR}
                      alt="Picture of the author"
                      fill // required
                      objectFit="cover" // change to suit your needs
                      className="rounded-full" // just an example
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-5xl ml-5">
                      {userInfo &&
                        userInfo.attributes.firstName +
                          ' ' +
                          userInfo.attributes.lastName}
                    </h1>
                  </div>
                </div>
                <div className="md:px-10">
                  <div className="flex mb-2">
                    <div className="block text-gray-700 text-lg font-bold">
                      Email:
                    </div>
                    <div className="text-lg ml-2">
                      {userInfo?.email ? userInfo?.email : 'Chưa rõ'}
                    </div>
                  </div>
                  <div className="flex mb-2">
                    <div className="block text-gray-700 text-lg font-bold">
                      Số điện thoại:
                    </div>
                    <div className="text-lg ml-2">
                      {userInfo?.phone ? userInfo?.phone : 'Chưa rõ'}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="block text-gray-700 text-lg font-bold">
                      Địa chỉ:
                    </div>
                    <div className="text-lg ml-2">
                      {userInfo?.address ? userInfo?.address : 'Chưa rõ'}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 ml-2">
                    Liên hệ
                  </button>
                  <button className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 ml-2">
                    <GoReport size={25} />
                  </button>
                </div>
              </div>
              <ListCards title="Danh sách thú cưng" data={userInfo?.pets!} />
            </>
          ))}
      </>
    );
  }
);
