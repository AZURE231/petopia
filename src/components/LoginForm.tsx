'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { STATIC_URLS } from '../utils/constants';
import { useMutation } from '../utils/hooks';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { IApiResponse } from '../interfaces/common';
import { ILoginRequest } from '../interfaces/authentication';
import { login } from '../services/authentication.api';
import { useForm } from 'react-hook-form';
import { QueryProvider } from './QueryProvider';
import Link from 'next/link';

export const LoginForm = QueryProvider(() => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { getValues, setValue, watch } = useForm<ILoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerMutation = useMutation<IApiResponse<boolean>, ILoginRequest>(
    login,
    {
      onError: (err) => {
        setError(getErrorMessage(err.data.errorCode.toString()));
      },
      onSuccess: (res) => {
        setMessage('dang nhap thanh cong');
        window.location.replace('/home');
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    !error && registerMutation.mutate(getValues());
  };

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
                name="email"
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
                name="password"
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
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline "
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
            </button>
            <button className="w-full content-end py-2 border flex border-slate-200  rounded-lg text-slate-700  hover:border-slate-400  hover:text-slate-900  hover:shadow transition duration-150">
              <div className="flex gap-2 mx-auto">
                <Image
                  width={24}
                  height={24}
                  src={STATIC_URLS.GOOGLE_LOGIN}
                  loading="lazy"
                  alt="google logo"
                />
                <span className="">Đăng nhập với Google</span>
              </div>
            </button>
            <p>{message}</p>
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
    </div>
  );
});
