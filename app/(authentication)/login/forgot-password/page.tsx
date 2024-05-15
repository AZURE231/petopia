'use client';

import { Alert } from '@/src/components/general/Alert';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { isEmail } from '@/src/helpers/inputValidator';
import { IApiResponse } from '@/src/interfaces/common';
import { forgotPassword } from '@/src/services/user.api';
import { useMutation } from '@/src/utils/hooks';
import { Metadata } from 'next';
import { FormEvent, useState } from 'react';

export const metadata: Metadata = {
  title: 'Quên mật khẩu - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

const ForgotPasswordPage = QueryProvider(() => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);

  const forgotPasswordMutation = useMutation<IApiResponse<boolean>, string>(
    forgotPassword,
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setAlertFailed(true);
        setAlertShow(true);
      },
      onSuccess: () => {
        setAlertMessage('Kiểm tra email của bạn để đặt lại mật khẩu');
        setAlertFailed(false);
        setAlertShow(true);
      },
    }
  );

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !error && forgotPasswordMutation.mutate(email);
  };

  const handleCheckEmail = () => {
    setError(isEmail(email) ? '' : 'Email không hợp lệ');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-300">
      <div className="max-w-lg bg-white p-5 rounded-lg shadow-lg">
        <h1 className="font-bold text-lg text-center my-4">
          Hãy nhập email của bạn để đặt lại mật khẩu!
        </h1>
        <form className="flex justify-center w-full" onSubmit={handleOnSubmit}>
          <input
            className="bg-gray-50 border border-gray-300 flex-1 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-2/3 p-2.5 :bg-gray-700 "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            onBlur={handleCheckEmail}
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
        failed={alertFailed}
      />
    </div>
  );
});

export default ForgotPasswordPage;