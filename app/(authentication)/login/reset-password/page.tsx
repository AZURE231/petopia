'use client';

import { Alert } from '@/src/components/general/Alert';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { checkPasswordFormat } from '@/src/helpers/inputValidator';
import { IApiResponse } from '@/src/interfaces/common';
import { IResetPasswordRequest } from '@/src/interfaces/user';
import { resetPassword } from '@/src/services/user.api';
import { SEARCH_PARAMS } from '@/src/utils/constants';
import { useMutation } from '@/src/utils/hooks';
import { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'Quên mật khẩu - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

const ResetPasswordPage = QueryProvider(() => {
  const [error, setError] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateParams = useSearchParams();
  const email = validateParams.get(SEARCH_PARAMS.EMAIL);
  const passwordToken = validateParams.get(SEARCH_PARAMS.PASSWORD_TOKEN);

  const resetPasswordMutation = useMutation<IApiResponse<boolean>, IResetPasswordRequest>(
    resetPassword,
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setAlertShow(true);
      },
      onSuccess: () => {
        window.location.replace('/login');
      },
    }
  );

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !error && email && passwordToken && resetPasswordMutation.mutate({
      email: email,
      resetPasswordToken: passwordToken,
      password: password,
    });
  };

  useEffect(() => {
    checkPasswordFormat(password, setError);
  }, [password]);

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-300">
      <div className="max-w-lg bg-white p-5 rounded-lg shadow-lg">
        <h1 className="font-bold text-lg text-center my-4">
          Chào mừng đến với Petopia. Hãy nhập mật khẩu mới!
        </h1>
        <form className="flex justify-center w-full" onSubmit={handleOnSubmit}>
          <input
            className="bg-gray-50 border border-gray-300 flex-1 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/3 p-2.5 :bg-gray-700 "
            placeholder="Mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 ml-2"
            type='submit'
          >
            Xác nhận
          </button>
        </form>
        {error && <div className='text-sm text-red-500 mt-2'>{error}</div>}
      </div>
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed
      />
    </div>
  );
});

export default ResetPasswordPage;