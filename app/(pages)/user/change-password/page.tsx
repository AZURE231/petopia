'use client';
import { IApiResponse } from '@/src/interfaces/common';
import { IChangePasswordResponse } from '@/src/interfaces/user';
import { changePassword } from '@/src/services/user.api';
import { useMutation } from '@/src/utils/hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { QueryProvider } from '@/src/components/general/QueryProvider';
import { Alert } from '@/src/components/general/Alert';
import { ClipLoader } from 'react-spinners';
import { checkPasswordFormat } from '@/src/helpers/inputValidator';

export const ChangePassword = QueryProvider(() => {
  // ALERT STATES
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertFailed, setAlertFailed] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // FORM STATES
  const [error, setError] = useState<string>('');

  const { getValues, setValue, watch } = useForm<IChangePasswordResponse>({
    defaultValues: {
      newPassword: '',
      oldPassword: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    changePasswordMutation.mutate(getValues());
  };

  const changePasswordMutation = useMutation<
    IApiResponse<boolean>,
    IChangePasswordResponse
  >(changePassword, {
    onError: (err) => {
      const message = getErrorMessage(err.data.errorCode.toString());
      setAlertFailed(true);
      setAlertMessage(message);
      setShowAlert(true);
    },
    onSuccess: () => {
      setShowAlert(true);
      setAlertFailed(false);
      setAlertMessage('Đổi mật khẩu thành công');
      setShowAlert(true);
    },
  });

  useEffect(() => {
    checkPasswordFormat(getValues('newPassword'), setError);
  }, [watch('newPassword')]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto h-fit-screen">
      <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div>
            <h2 className="">
              <span className="text-yellow-300 font-bold">Pet</span>opia xin
              chào
            </h2>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl ">
              Đổi mật khẩu
            </h1>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="old-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mật khẩu cũ
              </label>
              <input
                type="password"
                id="old-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                onChange={(e) => {
                  setValue('oldPassword', e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="new-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Mật khẩu mới
              </label>
              <input
                type="password"
                id="new-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                required
                onChange={(e) => {
                  setValue('newPassword', e.target.value);
                }}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Đổi mật khẩu
              <span className="ml-2">
                <ClipLoader
                  color={'#000000'}
                  loading={changePasswordMutation.isLoading}
                  size={14}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </span>
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

export default ChangePassword;
