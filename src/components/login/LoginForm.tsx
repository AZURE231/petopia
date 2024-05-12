'use client';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Alert } from '../general/Alert';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { QueryProvider } from '../general/QueryProvider';
import {
  IGoogleLoginRequest,
  ILoginRequest,
  ILoginResponse,
} from '@/src/interfaces/authentication';
import { COOKIES_NAME } from '@/src/utils/constants';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { googleLogin, login } from '@/src/services/authentication.api';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import QueryButton from '../general/QueryButton';

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
    setCookie(COOKIES_NAME.ACCESS_TOKEN_SERVER, data.accessToken, {
      expires: new Date(data.accessTokenExpiredDate),
    });
    setCookie(COOKIES_NAME.REFRESH_TOKEN_SERVER, data.accessToken, {
      expires: new Date(data.accessTokenExpiredDate),
    });
    const redirect = getCookie(COOKIES_NAME.REDIRECT);
    if (redirect) {
      deleteCookie(COOKIES_NAME.REDIRECT);
      window.location.replace(redirect);
    } else {
      window.location.replace('/');
    }
  };

  // LOGIN
  const loginMutation = useMutation<
    IApiResponse<ILoginResponse>,
    ILoginRequest
  >(login, {
    onError: (err) => {
      setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
      setShowALert(true);
    },
    onSuccess: (res) => handleOnLoginSuccess(res.data.data),
  });

  // LOGIN WITH GOOGLE
  const googleLoginMutation = useMutation<
    IApiResponse<ILoginResponse>,
    IGoogleLoginRequest
  >(googleLogin, {
    onError: (err) => {
      setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
      setShowALert(true);
    },
    onSuccess: (res) => handleOnLoginSuccess(res.data.data),
  });

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
              <Link
                className="text-sm font-medium text-primary-600 hover:underline "
                href="/login/forgot-password"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <QueryButton
              name={'Đăng nhập'}
              isLoading={loginMutation.isLoading}
            />

            <GoogleLoginButton
              onSuccess={(tokenId) =>
                googleLoginMutation.mutate({ tokenId: tokenId })
              }
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
