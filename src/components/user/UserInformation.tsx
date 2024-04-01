'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useQuery } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { IUserInfo } from '../../interfaces/user';
import { QUERY_KEYS, STATIC_URLS } from '../../utils/constants';
import { QueryProvider } from '../general/QueryProvider';
import ListCards from './ListCards';
import UserUpdateForm from './UserUpdateForm';
import { getUserInfo } from '@/src/services/user.api';

export const UserInformation = QueryProvider(() => {
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  useQuery<IApiResponse<IUserInfo>>(
    [QUERY_KEYS.GET_GOOGLE_RECAPTCHA_TOKEN],
    getUserInfo,
    {
      onSuccess: (res) => setUserInfo(res.data.data),
      onError: (err) => console.log(err),
    }
  );

  return (
    <div>
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

          <button onClick={handleEdit}>
            <FaRegEdit className="text-2xl absolute bottom-15 right-0 md:right-10" />
          </button>
        </div>

        <div className="md:px-10">
          <div className="flex mb-2">
            <div className="block text-gray-700 text-lg font-bold">Email:</div>
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
        {userInfo && <UserUpdateForm userInfo={userInfo!} isEdit={isEdit} />}
      </div>
      <ListCards title="Thú cưng của bạn" data={userInfo?.pets!} />
    </div>
  );
});
