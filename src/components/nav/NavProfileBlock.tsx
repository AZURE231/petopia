'use client';
import { IApiResponse } from '@/src/interfaces/common';
import { logout } from '@/src/services/authentication.api';
import { COOKIES_NAME, STATIC_URLS } from '@/src/utils/constants';
import { useClickOutside, useMutation } from '@/src/utils/hooks';
import { deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useRef, useState } from 'react';

export const NavProfileBlock = ({
  image,
  name,
  email
}: {
  image: string | null,
  name: string,
  email: string,
}) => {
  // STATES
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  // LOGOUT
  const logoutMutation = useMutation<IApiResponse<boolean>, undefined>(
    logout,
    {
      onSuccess: () => {
        deleteCookie(COOKIES_NAME.ACCESS_TOKEN_SERVER);
        window.location.replace('/login');
      },
    }
  );

  // HANDLE HIDE PROFILE OPTIONS
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside(() => {
    setIsOpenProfile(false);
  }, [buttonRef]);

  return (
    <div className="hidden md:flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <div className="flex flex-col relative">
        <button
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
          onClick={() => setIsOpenProfile(!isOpenProfile)}
          ref={buttonRef}
        >
          <Image
            className="rounded-full"
            alt="user photo"
            src={image || STATIC_URLS.NO_AVATAR}
            width={32}
            height={32}
          />
        </button>
        <div
          className={`absolute right-0 top-10 z-50 ${isOpenProfile ? '' : 'hidden'
            } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow `}
        >
          <div
            className="px-4 py-3 select-none cursor-pointer"
            onClick={() => window.location.replace('/user')}
          >
            <span className="block text-sm text-gray-900 ">
              {name}
            </span>
            <span className="block text-sm  text-gray-500 truncate ">
              {email}
            </span>
          </div>
          <ul className="py-2">
            <li>
              <a
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => logoutMutation.mutate(undefined)}
              >
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};