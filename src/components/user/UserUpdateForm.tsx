import AddressDropdown from './AddressDropdown';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useMutation } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { updateUser } from '../../services/user.api';
import { Alert } from '../general/Alert';
import { USER_ROLE } from '@/src/utils/constants';
import QueryButton from '../general/QueryButton';
import { IUserInfoReponse, IUserUpdate } from '@/src/interfaces/user';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';

export default function UserUpdateForm({
  userInfo,
  show,
  onSuccess,
}: {
  userInfo: IUserInfoReponse;
  show: boolean;
  onSuccess: () => void;
}) {
  // STATES
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertFail, setAlertFail] = useState<boolean>(false);

  // FORMS
  const { getValues, setValue, watch } = useForm<IUserUpdate>({
    defaultValues: {
      phone: userInfo?.phone || '',
      provinceCode: userInfo?.provinceCode || '',
      districtCode: userInfo?.districtCode || '',
      lastName: userInfo?.attributes.lastName || 'Họ',
      firstName: userInfo?.attributes.firstName || 'Tên',
      website: userInfo?.attributes.website || '',
      description: userInfo?.attributes.description || 'Mô tả',
      wardCode: userInfo?.wardCode || '',
      street: userInfo?.street || '',
    },
  });

  // QUERIES
  const updateUserMutation = useMutation<
    IApiResponse<IUserInfoReponse>,
    IUserUpdate
  >(updateUser, {
    onError: (err) => {
      setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
      setAlertFail(true);
      setAlertShow(true);
    },
    onSuccess: () => {
      setAlertMessage('Cập nhật thông tin thành công');
      setAlertFail(false);
      setAlertShow(true);
      onSuccess();
    },
  });

  // HANDLERS
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserMutation.mutate(getValues());
  };

  return (
    <>
      {show && (
        <form className="md:px-10" onSubmit={handleSubmit}>
          <div className="flex flex-col py-4">
            {userInfo.role !== USER_ROLE.ORGANIZATION && (
              <div className="flex flex-row gap-3">
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="firstName"
                  >
                    Tên
                  </label>
                  <input
                    test-id="user-profile-first-name-input"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    required
                    onChange={(e) => setValue('firstName', e.target.value)}
                    value={watch('firstName')}
                  />
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Họ
                  </label>
                  <input
                    test-id="user-profile-last-name-input"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    required
                    onChange={(e) => setValue('lastName', e.target.value)}
                    value={watch('lastName')}
                  />
                </div>
              </div>
            )}
            {userInfo.role === USER_ROLE.ORGANIZATION && (
              <>
                <div className="flex flex-row gap-3">
                  <div className="mb-4 w-full">
                    <label
                      className="block text-gray-700 text-lg font-bold mb-2"
                      htmlFor="website"
                    >
                      Website
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="website"
                      type="text"
                      onChange={(e) => setValue('website', e.target.value)}
                      value={watch('website')}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="mb-4 w-full">
                    <label
                      className="block text-gray-700 text-lg font-bold mb-2"
                      htmlFor="description"
                    >
                      Mô tả
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="description"
                      type="text"
                      required
                      onChange={(e) => setValue('description', e.target.value)}
                      value={watch('description')}
                    />
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-row gap-3">
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="username"
                >
                  Số điện thoại
                </label>
                <input
                  test-id="user-profile-phone-input"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  required
                  onChange={(e) => setValue('phone', e.target.value)}
                  value={watch('phone')}
                />
              </div>
            </div>
            <AddressDropdown
              districtCode={watch('districtCode')}
              provinceCode={watch('provinceCode')}
              wardCode={watch('wardCode')}
              setProvinceCode={(code: string) => {
                setValue('provinceCode', code);
              }}
              setDistrictCode={(code: string) => {
                setValue('districtCode', code);
              }}
              setWardCode={(code: string) => {
                setValue('wardCode', code);
              }}
            />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Số nhà
              </label>
              <input
                test-id="user-profile-street-input"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                required
                onChange={(e) => setValue('street', e.target.value)}
                value={watch('street')}
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <QueryButton
              testId="user-update-button"
              name={'Xác nhận'}
              isLoading={updateUserMutation.isLoading}
            />
          </div>
        </form>
      )}
      <Alert
      testId='user-update-alert'
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFail}
      />
    </>
  );
}
