import { UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { IUserUpdate } from '../../interfaces/user';
import { useState } from 'react';
import { useQuery } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { QUERY_KEYS } from '../../utils/constants';
import { AddressInput } from './AddressInput';
import { IAdoptPetRequest, ILocationRequest, ILocationResponse } from '@/src/interfaces/pet';
import { getProvince } from '@/src/services/pet.api';

enum LOCATION_LEVEL {
  PROVINCE = 1,
  DISTRICT = 2,
  WARD = 3,
}



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
    defaultValues: { Level: LOCATION_LEVEL.PROVINCE },
  });

  const handleProvinceChange = (code: string) => {
    locationForm.setValue('Code', code);
    locationForm.setValue('Level', LOCATION_LEVEL.DISTRICT);
    code != watch('provinceCode') && setValue('provinceCode', code);
  };

  const handleDistrictChange = (code: string) => {
    locationForm.setValue('Code', code);
    locationForm.setValue('Level', LOCATION_LEVEL.WARD);
    code != watch('districtCode') && setValue('districtCode', code);
  };

  const handleWardChange = (code: string) => {
    code != watch('wardCode') && setValue('wardCode', code);
  };

  const locationQuery = useQuery<IApiResponse<ILocationResponse[]>>(
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
    <div className="flex flex-row gap-3 mb-4">
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Tỉnh thành
        </label>
        <AddressInput
          options={provinces!}
          onChange={handleProvinceChange}
          title="Chọn Tỉnh/Thành phố"
          value={watch('provinceCode')}
          level={LOCATION_LEVEL.PROVINCE}
          isLocationLoading={locationQuery.isFetching}
          currentLevel={locationForm.watch('Level')}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Quận huyện
        </label>
        <AddressInput
          options={districts!}
          onChange={handleDistrictChange}
          title="Chọn Quận/huyện"
          value={watch('districtCode')}
          level={LOCATION_LEVEL.DISTRICT}
          isLocationLoading={locationQuery.isFetching}
          currentLevel={locationForm.watch('Level')}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Phường xã
        </label>
        <AddressInput
          options={wards!}
          onChange={handleWardChange}
          title="Chọn xã/phường"
          value={watch('wardCode')}
          level={LOCATION_LEVEL.WARD}
          isLocationLoading={locationQuery.isFetching}
          currentLevel={locationForm.watch('Level')}
        />
      </div>
    </div>
  );
}
