'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useQuery } from '../utils/hooks';
import { IApiResponse } from '../interfaces/common';
import { IUserInfo } from '../interfaces/user';
import { getUserInfo } from '../services/userprofile.api';
import { COOKIES_NAME, QUERY_KEYS } from '../utils/constants';
import { QueryProvider } from './QueryProvider';
import ListCards from './ListCards';

export const UserForm = QueryProvider(() => {
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
        <div className="flex relative">
          <div className="relative h-52 w-52 bottom-20">
            <Image
              src={userInfo?.image || '/img/avatar.png'}
              alt="Picture of the author"
              fill // required
              objectFit="cover" // change to suit your needs
              className="rounded-full" // just an example
            />
          </div>
          <h1 className="font-bold text-5xl ml-5">
            {userInfo &&
              userInfo.attributes.firstName +
                ' ' +
                userInfo.attributes.lastName}
          </h1>
          <button onClick={handleEdit}>
            <FaRegEdit className="text-2xl absolute bottom-0 right-0 md:right-10" />
          </button>
        </div>
        <form className="md:px-10">
          <div className="flex flex-col py-2">
            <div className="flex flex-row gap-3">
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Số điện thoại
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder={userInfo?.phone}
                  readOnly={!isEdit}
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Gmail
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder={userInfo?.email}
                  readOnly={!isEdit}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Địa chỉ
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="123/4/5 Quang Trung, Phu Nhuan, HCM"
                readOnly={!isEdit}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Tên tài khoản
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="123/4/5 Quang Trung, Phu Nhuan, HCM"
                readOnly={!isEdit}
              />
            </div>
          </div>
          {isEdit && (
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="w-fit text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none
                    focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Xác nhận
              </button>
            </div>
          )}
        </form>
      </div>
      <ListCards title="Thú cưng của bạn" data={userInfo?.pets!} />
    </div>
  );
});
