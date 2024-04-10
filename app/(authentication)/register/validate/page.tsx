'use client';

import { useSearchParams } from 'next/navigation';
import { useMutation, useRunOnce } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { validateRegister } from '@/src/services/authentication.api';
import { IValidateRegisterRequest } from '@/src/interfaces/authentication';
import { useState } from 'react';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { Alert } from '@/src/components/general/Alert';
import Link from 'next/link';
import { SEARCH_PARAMS } from '@/src/utils/constants';

const ValidatePage = QueryProvider(() => {
  const [showAlert, setShowALert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const validateParams = useSearchParams();
  const email = validateParams.get(SEARCH_PARAMS.EMAIL);
  const validateRegisterToken = validateParams.get(SEARCH_PARAMS.VALIDATE_REGISTER_TOKEN);

  const validateRegisterMutation = useMutation<IApiResponse<boolean>, IValidateRegisterRequest>(
    validateRegister,
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setShowALert(true);
      }
    }
  );

  useRunOnce(() => {
    email && validateRegisterToken && validateRegisterMutation.mutate({
      email,
      validateRegisterToken,
    });
  });


  return (
    <div className="flex items-center justify-center h-screen bg-yellow-300">
      <div className="max-w-lg bg-white p-5 rounded-lg shadow-lg">
        <h1 className="font-bold text-3xl text-center  my-4">
          Chào mừng đến với Petopia
        </h1>
        <p className="text-justify">
          Tài khoản của bạn đã được tạo thành công. Giờ bạn đã có thể tìm kiếm
          và nhận nuôi boss và đọc những tin tức cập nhật mới nhất về boss trên
          Petopia.
        </p>
        <div className="text-center py-4 ">
          <Link href={'/login'}>
            <button className="border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400">
              Đăng nhập vào tài khoản mới
            </button>
          </Link>
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

export default ValidatePage;
