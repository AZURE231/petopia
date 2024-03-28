import AddressDropdown from './AddressDropdown';
import { IUserInfo, IUserUpdate } from '../interfaces/user';
import { set, useForm } from 'react-hook-form';
import { ILocationRequest, ILocationResponse } from '../interfaces/petProfile';
import { ChangeEvent, useState } from 'react';
import { useMutation, useQuery } from '../utils/hooks';
import { IApiResponse } from '../interfaces/common';
import { QUERY_KEYS } from '../utils/constants';
import { getProvince } from '../services/petprofile.api';
import DistrictDropdown from './DistrictDropdown';
import ProvinceDropdown from './ProvinceDropdown';
import { updateUser } from '../services/user.api';

export default function UserUpdateForm({
  userInfo,
  isEdit,
}: {
  userInfo: IUserInfo;
  isEdit: boolean;
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

  // HANDLE ADDRESS CHANGE
  const [provinces, setProvinces] = useState<ILocationResponse[]>();
  const [districts, setDistricts] = useState<ILocationResponse[]>();
  const [wards, setWards] = useState<ILocationResponse[]>();
  const locationForm = useForm<ILocationRequest>({
    defaultValues: { Level: 1 },
  });

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    locationForm.setValue('Code', provinceCode);
    locationForm.setValue('Level', 2);
    setValue('provinceCode', provinceCode);
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    locationForm.setValue('Code', provinceCode);
    locationForm.setValue('Level', 3);
    setValue('districtCode', provinceCode);
  };

  const handleWardChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue('wardCode', e.target.value);
  };

  const updateUserMutation = useMutation<IApiResponse<IUserInfo>, IUserUpdate>(
    updateUser,
    {
      onError: (err) => {
        console.log(err);
        setError('Tạo hồ sơ thú cưng thất bại');
        setShowAlert(true);
      },
      onSuccess: (res) => {
        console.log('success');
        console.log(res);
        setShowSuccess(true);
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUserMutation.mutate(getValues());
  };

  useQuery<IApiResponse<ILocationResponse[]>>(
    [
      QUERY_KEYS.GET_LOCATION,
      locationForm.watch('Code'),
      locationForm.watch('Level'),
    ],
    () => getProvince(locationForm.getValues()),
    {
      onSuccess: (res) => {
        // console.log(locationForm.getValues('Level'));
        if (locationForm.getValues('Level') === 1) {
          setProvinces(res.data.data);
        } else if (locationForm.getValues('Level') === 2) {
          setWards([]);
          setDistricts(res.data.data);
        } else setWards(res.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

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
            <AddressDropdown
              province={provinces!}
              district={districts!}
              ward={wards!}
              handleDistrictChange={handleDistrictChange}
              handleProvinceChange={handleProvinceChange}
              handleWardChange={handleWardChange}
              watch={watch}
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
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
