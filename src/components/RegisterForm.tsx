'use client';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IRegisterForm, IRegisterRequest } from '../interfaces/authentication';
import { IApiResponse } from '../interfaces/common';
import { QueryProvider } from './QueryProvider';
import { useMutation } from '../utils/hooks';
import { register } from '../services/authentication.api';
import { getErrorMessage } from '../helpers/getErrorMessage';
import { Alert } from './Alert';
import { GoogleRecaptcha } from './GoogleRecaptcha';
import { publish } from '../services/event';
import { EVENT_NAMES } from '../utils/constants';
import { checkPasswordFormat, checkPasswords, isEmail } from '../helpers/inputValidator';
import ClipLoader from 'react-spinners/ClipLoader';

export const RegisterForm = QueryProvider(() => {
  // FORM ERROR STATES
  const [errorEmail, setErrorEmail] = useState<string>('');
  const [errorPassword, setErrorPassword] = useState<string>('');
  const [errorConfirm, setErrorConfirm] = useState<string>('');

  // ALERT STATES
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertFailed, setAlertFailed] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // REGISTER FORM
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

  const isDisabled = () => {
    return errorConfirm || errorEmail || errorPassword ? true : false;
  };

  // EVENT HANDLING FUNCTIONS
  const handleValidateEmail = (email: string) => {
    setErrorEmail(isEmail(email) ? '' : 'Email không hợp lệ');
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate(getValues());
  };

  // REGISTER MUTATION
  const registerMutation = useMutation<IApiResponse<boolean>, IRegisterRequest>(
    register,
    {
      onError: (err) => {
        const message = getErrorMessage(err.data.errorCode.toString());
        setAlertFailed(true);
        setAlertMessage(message);
        setShowAlert(true);
        publish(EVENT_NAMES.RESET_RECAPTCHA);
      },
      onSuccess: () => {
        setShowAlert(true);
        setAlertFailed(false);
        setAlertMessage('Kiểm tra Email của bạn để hoàn thành đăng ký.');
        setShowAlert(true);
      }
    }
  );

  // PASSWORD VALIDATORS
  useEffect(() => {
    checkPasswords(getValues('password'), getValues('confirmPassword'), setErrorConfirm);
    checkPasswordFormat(getValues('password'), setErrorPassword);
  }, [watch('confirmPassword'), watch('password')]);

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
              <Link className="text-yellow-600" href="/login">
                Đăng nhập
              </Link>
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
                onBlur={(e) => handleValidateEmail(e.target.value)}
                required
              />
              <span className="text-sm text-red-500 mt-2">{errorEmail}</span>
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
              <span className="text-sm text-red-500 mt-2">{errorPassword}</span>
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
              <span className="text-sm text-red-500 mt-2">{errorConfirm}</span>
            </div>

            <GoogleRecaptcha setToken={(value) => setValue('googleRecaptchaToken', value)} />

            <button
              type="submit"
              className={`
                w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none 
                focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  
                ${isDisabled() && 'cursor-not-allowed'}`}
              disabled={isDisabled()}
            >
              Đăng ký
              <span className='ml-2 leading-5'>
                <ClipLoader
                  color={'#000000'}
                  loading={registerMutation.isLoading}
                  size={14}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /></span>
            </button>
          </form>
        </div>
      </div>
      <Alert
        message={alertMessage}
        show={showAlert}
        setShow={setShowAlert}
        failed={alertFailed}
      />
    </div>
  );
});
