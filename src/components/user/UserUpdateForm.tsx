import AddressDropdown from './AddressDropdown';
import { IIndividualAttributes, IUserInfoReponse, IUserUpdate } from '../../interfaces/user';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { updateUser } from '../../services/user.api';
import { Alert } from '../general/Alert';
import { ClipLoader } from 'react-spinners';
import { USER_ROLE } from '@/src/utils/constants';

export default function UserUpdateForm({
  userInfo,
  show,
}: {
  userInfo: IUserInfoReponse;
  show: boolean;
}) {
  // STATES
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertFail, setAlertFail] = useState<boolean>(false);

  // FORMS
  const { getValues, setValue, watch } = useForm<IUserUpdate>({
    defaultValues: {
      phone: userInfo?.phone,
      provinceCode: userInfo?.provinceCode,
      districtCode: userInfo?.districtCode,
      lastName: userInfo?.attributes.lastName || '',
      firstName: userInfo?.attributes.lastName || '',
      wardCode: userInfo?.wardCode,
      street: userInfo?.street,
    },
  });

  // QUERIES
  const updateUserMutation = useMutation<IApiResponse<IUserInfoReponse>, IUserUpdate>(
    updateUser,
    {
      onError: (err) => {
        setAlertMessage('Tạo hồ sơ thú cưng thất bại');
        setAlertFail(true);
        setAlertShow(true);
      },
      onSuccess: (res) => {
        setAlertMessage('Cập nhật thông tin thành công');
        setAlertFail(false);
        setAlertShow(true);
      },
    }
  );

  // HANDLERS
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserMutation.mutate(getValues());
  };

  return (
    <>
      {show && (
        <form className="md:px-10" onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            {
              userInfo.role !== USER_ROLE.ORGANIZATION && <div className="flex flex-row gap-3">
                <div className="mb-4 w-full">
                  <label
                    className="block text-gray-700 text-lg font-bold mb-2"
                    htmlFor="firstName"
                  >
                    Tên
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    onChange={(e) => setValue('lastName', e.target.value)}
                    value={watch('lastName')}
                  />
                </div>
              </div>
            }
            <div className="flex flex-row gap-3">
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="username"
                >
                  Số điện thoại
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  onChange={(e) => setValue('phone', e.target.value)}
                  value={watch('phone')}
                />
              </div>
            </div>
            <AddressDropdown
              districtCode={watch('districtCode')}
              provinceCode={watch('provinceCode')}
              wardCode={watch('wardCode')}
              setProvinceCode={(code: string) => { setValue('provinceCode', code); }}
              setDistrictCode={(code: string) => { setValue('districtCode', code); }}
              setWardCode={(code: string) => { setValue('wardCode', code); }}
            />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="username"
              >
                Số nhà
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                onChange={(e) => setValue('street', e.target.value)}
                value={watch('street')}
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="w-fit text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none
                        focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Xác nhận
              <span className="pl-2">
                <ClipLoader
                  color={'#000000'}
                  loading={updateUserMutation.isLoading}
                  size={14}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </span>
            </button>
          </div>
        </form>
      )}
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFail}
      />
    </>
  );
}