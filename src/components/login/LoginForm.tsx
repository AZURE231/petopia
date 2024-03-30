'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useMutation } from '../../utils/hooks';
import { getErrorMessage } from '../../helpers/getErrorMessage';
import { IApiResponse } from '../../interfaces/common';
import { IGoogleLoginRequest, ILoginRequest, ILoginResponse } from '../../interfaces/authentication';
import { googleLogin, login } from '../../services/authentication.api';
import { useForm } from 'react-hook-form';
import { QueryProvider } from '../general/QueryProvider';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Alert } from '../general/Alert';
import { COOKIES_NAME } from '../../utils/constants';
import { getCookie, setCookie } from 'cookies-next';
import ClipLoader from 'react-spinners/ClipLoader';

export const LoginForm = QueryProvider(() => {
  // STATES
  const [showAlert, setShowALert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // FORMS
  const { getValues, setValue } = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // HANDLERS
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate(getValues());
  };

  const handleOnLoginSuccess = (data: ILoginResponse) => {
    setCookie(
      COOKIES_NAME.ACCESS_TOKEN_SERVER,
      data.accessToken,
      {
        expires: new Date(data.accessTokenExpiredDate),
      }
    );
    const redirect = getCookie(COOKIES_NAME.REDIRECT);
    if (redirect) {
      window.location.replace(redirect);
    }
    else {
      window.location.replace('/');
    }
  };

  // LOGIN
  const loginMutation = useMutation<IApiResponse<ILoginResponse>, ILoginRequest>(
    login,
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setShowALert(true);
      },
      onSuccess: (res) => handleOnLoginSuccess(res.data.data),
    }
  );

  // LOGIN WITH GOOGLE
  const googleLoginMutation = useMutation<IApiResponse<ILoginResponse>, IGoogleLoginRequest>(
    googleLogin,
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setShowALert(true);
      },
      onSuccess: (res) => handleOnLoginSuccess(res.data.data),
    },
  );

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto h-screen">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div>
            <h2 className="">
              <span className="text-yellow-300 font-bold">Pet</span>opia xin
              chào
            </h2>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl ">
              Đăng nhập
            </h1>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email của bạn
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
                placeholder="name@company.com"
                required
                onChange={(e) => setValue('email', e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                onChange={(e) => setValue('password', e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 ">
                    Nhớ đăng nhập
                  </label>
                </div>
              </div>
              <a
                className="text-sm font-medium text-primary-600 hover:underline "
                href='/login/forgot-password'
              >
                Quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none 
              focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng nhập
              <span className='ml-2 leading-5'>
                <ClipLoader
                  color={'#000000'}
                  loading={loginMutation.isLoading}
                  size={14}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /></span>
            </button>

            <GoogleLoginButton
              onSuccess={(tokenId) => googleLoginMutation.mutate({ tokenId: tokenId })}
            />

            <p className="text-sm font-light text-gray-500 ">
              Chưa có tài khoản?{' '}
              <Link
                href="/register"
                className="font-medium text-primary-600 hover:underline "
              >
                Đăng ký
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Alert
        show={showAlert}
        setShow={setShowALert}
        message={alertMessage}
        failed
      />
    </div>
  );
});