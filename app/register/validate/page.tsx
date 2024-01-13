'use client';

import { useSearchParams } from 'next/navigation';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { validateRegister } from '@/src/services/authentication.api';
import { IRegisterValidate } from '@/src/interfaces/authentication';
import { use, useEffect, useState } from 'react';
import { QueryProvider } from '@/src/components/QueryProvider';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { Alert } from '@/src/components/Alert';
import Link from 'next/link';

export const Validate = QueryProvider(() => {
  const [showAlert, setShowALert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const validateParams = useSearchParams();
  const email = validateParams.get('email');
  const validateRegisterToken = validateParams.get('validateRegisterToken');

  const registerValidate: IRegisterValidate = {
    email: email || '',
    validateRegisterToken: validateRegisterToken || '',
  };

  const loginMutation = useMutation<IApiResponse<boolean>, IRegisterValidate>(
    validateRegister,
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setShowALert(true);
      },
      onSuccess: () => setAlertMessage('success'),
    }
  );
  useEffect(() => {
    loginMutation.mutate(registerValidate);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-yellow-300">
      <div className="max-w-lg bg-white p-5 rounded-lg shadow-lg">
        <h1 className="font-bold text-3xl text-center  my-4">
          Chào mừng đến với Petopia
        </h1>
        <p className="text-justify">
          Tài khoản của bạn đã được tạo thành công. Giờ bạn đã có thể tìm kiếm
          và nhận nuôi boss và đọc những tin tức cập nhật mới nhất về boss trên
          Petopia
        </p>
        <div className="text-center py-4 ">
          <button className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400">
            <Link href={'/login'}>Đăng nhập vào tài khoản mới</Link>
          </button>
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

export default Validate;
