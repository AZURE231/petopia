import { IApiResponse } from '@/src/interfaces/common';
import { logout } from '@/src/services/authentication.api';
import { useStores } from '@/src/stores';
import { COOKIES_NAME } from '@/src/utils/constants';
import { useMutation } from '@/src/utils/hooks';
import { deleteCookie } from 'cookies-next';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface INavOptionsBlock {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export const NavOptionsBlock = observer((props: INavOptionsBlock) => {
  const { isOpenMenu, setIsOpenMenu } = props;
  const { userStore } = useStores();
  const pathname = usePathname();
  const activeTab =
    'bg-yellow-300 md:underline md:decoration-yellow-300 md:decoration-4';

  // LOGOUT
  const logoutMutation = useMutation<IApiResponse<boolean>, undefined>(logout, {
    onSuccess: () => {
      deleteCookie(COOKIES_NAME.ACCESS_TOKEN_SERVER);
      window.location.replace('/login');
    },
  });

  return (
    <div
      className={`items-center ${
        isOpenMenu ? '' : 'hidden'
      } justify-between w-full md:flex md:w-auto md:order-1`}
    >
      <ul
        className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white "
        onClick={() => setIsOpenMenu(false)}
      >
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
            href="/blog"
            className={`block py-2 px-3 ${
              pathname == '/blog' ? activeTab : 'md:hover:text-yellow-400'
            } text-black  rounded md:bg-transparent md:text-black  md:p-0 `}
          >
            Tin tức
          </Link>
        </li>
        {userStore.userContext && (
          <>
            <li>
              <a
                onClick={() => window.location.replace('/user')}
                className="block py-2 px-3 text-yellow-500 rounded hover:bg-gray-100 md:hidden"
              >
                {userStore.userContext.name}
              </a>
            </li>
            <li>
              <a
                onClick={() => logoutMutation.mutate(undefined)}
                className="block py-2 px-3 text-yellow-500 rounded hover:bg-gray-100 md:hidden"
              >
                Đăng xuất
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
});
