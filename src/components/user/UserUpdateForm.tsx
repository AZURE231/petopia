import AddressDropdown from './AddressDropdown';
import { IUserInfo, IUserUpdate } from '../../interfaces/user';
import { set, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { useMutation } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { updateUser } from '../../services/user.api';
import { Alert } from '../general/Alert';
import { ClipLoader } from 'react-spinners';

export default function UserUpdateForm({
  userInfo,
  isEdit,
  image,
  setUserInfo,
}: {
  userInfo: IUserInfo;
  isEdit: boolean;
  image: File | null;
  setUserInfo: (userInfo: IUserInfo) => void;
}) {
  const [error, setError] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { getValues, setValue, watch } = useForm<IUserUpdate>({
    defaultValues: {
      phone: userInfo?.phone,
      firstName: userInfo?.attributes.firstName,
      lastName: userInfo?.attributes.lastName,
      provinceCode: userInfo?.provinceCode,
      districtCode: userInfo?.districtCode,
      wardCode: userInfo?.wardCode,
      street: userInfo?.street,
    },
  });

  const updateUserMutation = useMutation<IApiResponse<IUserInfo>, IUserUpdate>(
    updateUser,
    {
      onError: (err) => {
        console.log(err);
        setError('Cập nhật thông tin thất bại');
        setShowAlert(true);
      },
      onSuccess: (res) => {
        setUserInfo(res.data.data);
        setShowSuccess(true);
      },
    }
  );

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserMutation.mutate(getValues());
  };

  return (
    <div>
      {isEdit && (
        <form className="md:px-10" onSubmit={handleSubmit}>
          <div className="flex flex-col py-2">
            <div className="flex flex-row gap-3">
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
            <AddressDropdown setValue={setValue} watch={watch} />
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
        message={error!}
        show={showAlert}
        setShow={setShowAlert}
        failed={true}
      />
      <Alert
        message={'Cập nhật thông tin thành công'}
        show={showSuccess}
        setShow={setShowSuccess}
        failed={false}
      />
    </div>
  );
}
