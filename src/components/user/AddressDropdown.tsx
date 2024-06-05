import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useQuery } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { QUERY_KEYS } from '../../utils/constants';
import { AddressInput } from './AddressInput';
import { ILocationRequest, ILocationResponse } from '@/src/interfaces/pet';
import { getProvince } from '@/src/services/pet.api';

enum LOCATION_LEVEL {
  PROVINCE = 1,
  DISTRICT = 2,
  WARD = 3,
}

interface IAddressDropdown {
  districtCode: string;
  provinceCode: string;
  wardCode: string;
  setProvinceCode: (code: string) => void;
  setDistrictCode: (code: string) => void;
  setWardCode: (code: string) => void;
}

export default function AddressDropdown({
  districtCode,
  provinceCode,
  wardCode,
  setProvinceCode,
  setDistrictCode,
  setWardCode,
}: IAddressDropdown) {
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
    if (code != provinceCode) {
      setProvinceCode(code);
      setDistrictCode('');
      setWardCode('');
    }
  };

  const handleDistrictChange = (code: string) => {
    locationForm.setValue('Code', code);
    locationForm.setValue('Level', LOCATION_LEVEL.WARD);
    if (code != districtCode) {
      setDistrictCode(code);
      setWardCode('');
    }
  };

  const handleWardChange = (code: string) => {
    code != wardCode && setWardCode(code);
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
        if (locationForm.getValues('Level') === 1) {
          setProvinces(res.data.data);
        } else if (locationForm.getValues('Level') === 2) {
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
        {provinces && (
          <AddressInput
            testId ="province-input-dropdown"
            options={provinces}
            onChange={handleProvinceChange}
            title="Chọn Tỉnh/Thành phố"
            value={provinceCode}
            level={LOCATION_LEVEL.PROVINCE}
            isLocationLoading={locationQuery.isFetching}
            currentLevel={locationForm.watch('Level')}
          />
        )}
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Quận huyện
        </label>
        {districts && (
          <AddressInput
            testId ="district-input-dropdown"
            options={districts}
            onChange={handleDistrictChange}
            title="Chọn Quận/huyện"
            value={districtCode}
            level={LOCATION_LEVEL.DISTRICT}
            isLocationLoading={locationQuery.isFetching}
            currentLevel={locationForm.watch('Level')}
          />
        )}
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Phường xã
        </label>
        {wards && (
          <AddressInput
            testId ="ward-input-dropdown"
            options={wards}
            onChange={handleWardChange}
            title="Chọn xã/phường"
            value={wardCode}
            level={LOCATION_LEVEL.WARD}
            isLocationLoading={locationQuery.isFetching}
            currentLevel={locationForm.watch('Level')}
          />
        )}
      </div>
    </div>
  );
}
