'use client';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { COOKIES_NAME, QUERY_KEYS } from '../utils/constants';
import { IUserInfo } from '../interfaces/user';
import { QueryProvider } from './QueryProvider';

export const Navbar = QueryProvider(() => {
  const pathname = usePathname();
  const activeTab =
    'bg-yellow-300 md:underline md:decoration-yellow-300 md:decoration-4';

  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  useEffect(() => {
    if (sessionStorage.getItem(COOKIES_NAME.ACCESS_TOKEN_SERVER)) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const toggleProfile = (e: any) => {
    setIsOpenProfile(!isOpenProfile);
  };

  const toggleMenu = () => setIsOpenMenu(!isOpenMenu);

  return (
    <nav className=" border-gray-200 w-full fixed top-0 bg-white z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl whitespace-nowrap ">
            <span className="text-yellow-300">Pet</span>opia
          </span>
        </a>

        {/* User profile */}
        {isLogin && (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex flex-col relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
                onClick={toggleProfile}
              >
                <Image
                  className="rounded-full"
                  alt="user photo"
                  src="/img/avatar.png"
                  width={32}
                  height={32}
                />
              </button>
              {/* <!-- Dropdown menu user--> */}
              <div
                className={`absolute right-0 top-10 z-50 ${
                  isOpenProfile ? '' : 'hidden'
                } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow `}
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 ">
                    Bonnie Green
                  </span>
                  <span className="block text-sm  text-gray-500 truncate ">
                    {userInfo?.email} - {userInfo?.id}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
              onClick={toggleMenu}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            {/* <!-- Log in and register button--> */}
          </div>
        )}

        {/* Login and register button, show hide on cookie */}
        {!isLogin && (
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href="/register">
              <button className="mx-4">Đăng kí</button>
            </Link>
            <Link href="/login">
              <button className="text-black bg-yellow-300 rounded-full py-2 px-4 hover:bg-yellow-400">
                Đăng nhập
              </button>
            </Link>
          </div>
        )}

        <div
          className={`items-center ${
            isOpenMenu ? '' : 'hidden'
          } justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 ${
                  pathname == '/' ? activeTab : 'md:hover:text-yellow-400'
                } text-black  rounded md:bg-transparent md:text-black  md:p-0 `}
                aria-current="page"
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                className={`block py-2 px-3 ${
                  pathname == '/search' ? activeTab : 'md:hover:text-yellow-400'
                } text-black  rounded md:bg-transparent md:text-black  md:p-0 `}
              >
                Nhận nuôi
              </Link>
            </li>
            <li>
              <Link
                href="/adopt"
                className={`block py-2 px-3 ${
                  pathname == '/adopt' ? activeTab : 'md:hover:text-yellow-400'
                } text-black  rounded md:bg-transparent md:text-black  md:p-0 `}
              >
                Cho thú cưng
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0  "
              >
                Tin tức
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-400 md:p-0 "
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
