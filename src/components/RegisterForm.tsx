'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { IRegisterForm, IRegisterRequest } from '../interfaces/authentication';
import { STATIC_URLS } from '../utils/constants';
import { IApiResponse } from '../interfaces/common';
import { QueryProvider } from './QueryProvider';
import { useMutation } from '../utils/hooks';
import { register } from '../services/authentication.api';
import { getErrorMessage } from '../helpers/getErrorMessage';
import SuccessToast from './SuccessToast';

export const RegisterForm = QueryProvider(() => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { getValues, setValue, watch } = useForm<IRegisterForm>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      googleRecaptchaToken: '',
    },
  });

  const registerMutation = useMutation<IApiResponse<boolean>, IRegisterRequest>(
    register,
    {
      onError: (err) => {
        setError(getErrorMessage(err.data.errorCode.toString()));
      },
      onSuccess: (res) => {
        setMessage('Xác nhận Email của bạn để hoàn thành đăng ký');
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    !error && registerMutation.mutate(getValues());
  };

  useEffect(() => {
    if (getValues('confirmPassword') !== getValues('password')) {
      setError('Mật khẩu không khớp');
    } else {
      setError('');
    }
  }, [watch('confirmPassword')]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto h-screen">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex justify-between">
            <div>
              <h2 className="">
                <span className="text-yellow-300 font-bold">Pet</span>opia xin
                chào
              </h2>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl ">
                Đăng ký
              </h1>
            </div>
            <div>
              <p>Đã có tài khoản?</p>
              <a className="text-yellow-600" href="/login">
                Đăng nhập
              </a>
            </div>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Họ */}
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Họ của bạn
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
                type="text"
                id="lastName"
                required
                placeholder="Nguyễn Văn"
                onChange={(e) => setValue('lastName', e.target.value)}
              />
            </div>
            {/* Tên */}
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tên của bạn
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 "
                placeholder="A"
                required
                onChange={(e) => setValue('firstName', e.target.value)}
              />
            </div>
            {/* Email */}
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
                onChange={(e) => setValue('email', e.target.value)}
                required
              />
            </div>
            {/* Mật khẩu */}
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
                onChange={(e) => setValue('password', e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                onChange={(e) => setValue('confirmPassword', e.target.value)}
                required
              />
              {error && <span className="text-sm text-red-500">{error}</span>}
            </div>

            <button
              type="submit"
              className="w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đăng ký
            </button>
            {/* <SuccessToast message={message} /> */}
            <p>{message}</p>
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
          </form>
        </div>
      </div>
    </div>
  );
});
