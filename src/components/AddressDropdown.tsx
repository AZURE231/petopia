import { ILocationRequest, ILocationResponse } from '../interfaces/petProfile';
import { UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { IUserUpdate } from '../interfaces/user';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '../utils/hooks';
import { IApiResponse } from '../interfaces/common';
import { QUERY_KEYS } from '../utils/constants';
import { getProvince } from '../services/petprofile.api';
import Address from './Address';

export default function AddressDropdown({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<IUserUpdate>;
  watch: UseFormWatch<IUserUpdate>;
}) {
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
    console.log('provinceCode', provinceCode);
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

  useQuery<IApiResponse<ILocationResponse[]>>(
    [
      QUERY_KEYS.GET_LOCATION,
      locationForm.watch('Code'),
      locationForm.watch('Level'),
      watch('provinceCode'),
      watch('districtCode'),
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
    <div className="flex flex-row gap-3">
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Tỉnh thành
        </label>
        <Address
          locations={provinces!}
          onChange={handleProvinceChange}
          title="Chọn Tỉnh/Thành phố"
          watch={watch}
          watchValue="provinceCode"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Quận huyện
        </label>
        <Address
          locations={districts!}
          onChange={handleDistrictChange}
          title="Chọn Quận/huyện"
          watch={watch}
          watchValue="districtCode"
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Phường xã
        </label>
        <Address
          locations={wards!}
          onChange={handleWardChange}
          title="Chọn xã/phường"
          watch={watch}
          watchValue="wardCode"
        />
      </div>
    </div>
  );
}
