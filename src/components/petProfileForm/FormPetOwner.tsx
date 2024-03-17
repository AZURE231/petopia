'use client';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import DistrictDropdown from '../DistrictDropdown';
import ProvinceDropdown from '../ProvinceDropdown';
import { UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import {
  ICreatePetProfileRequest,
  ILocationRequest,
  ILocationResponse,
} from '@/src/interfaces/petProfile';
import { ChangeEvent, useState } from 'react';
import { useQuery } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QUERY_KEYS } from '@/src/utils/constants';
import { getProvince } from '@/src/services/petprofile.api';
import ControlForm from './ControlForm';

export default function FormPetOwner({
  handleNext,
  handleBack,
  setValue,
  watch,
}: {
  handleNext: () => void;
  handleBack: () => void;
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}) {
  // HANDLE ADDRESS CHANGE
  const [provinces, setProvinces] = useState<ILocationResponse[]>();
  const [districts, setDistricts] = useState<ILocationResponse[]>();
  const [wards, setWards] = useState<ILocationResponse[]>();
  const locationForm = useForm<ILocationRequest>({
    defaultValues: { Level: 1 },
  });

  // use http.get to fetch provinces
  // useQuery<IApiResponse<ILocationResponse[]>>(
  //   [
  //     QUERY_KEYS.GET_LOCATION,
  //     locationForm.watch('Code'),
  //     locationForm.watch('Level'),
  //   ],
  //   () => getProvince(locationForm.getValues()),
  //   {
  //     onSuccess: (res) => {
  //       // console.log(locationForm.getValues('Level'));
  //       if (locationForm.getValues('Level') === 1) {
  //         setProvinces(res.data.data);
  //       } else if (locationForm.getValues('Level') === 2) {
  //         setWards([]);
  //         setDistricts(res.data.data);
  //       } else setWards(res.data.data);
  //     },
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    locationForm.setValue('Code', provinceCode);
    locationForm.setValue('Level', 2);
  };

  const handleDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceCode = e.target.value;
    locationForm.setValue('Code', provinceCode);
    locationForm.setValue('Level', 3);
  };
  return (
    <div className="w-full rounded-2xl bg-blue-200 p-5">
      <h2 className="font-bold mb-2">Thông tin chủ sở hữu</h2>

      {/* form */}
      <div className="w-full p-5 mb-5 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tên chủ nhân */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="owner-name" className="text-sm font-medium">
              Tên chủ nhân
            </label>
            <input
              id="owner-name"
              name="owner-name"
              type="text"
              required
              value={watch('userInfo.name')}
              onChange={(e) => setValue('userInfo.name', e.target.value)}
              placeholder='Ví dụ: "Nguyễn Văn A"'
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="owner-phone" className="text-sm font-medium">
              Số điện thoại
            </label>
            <input
              id="owner-phone"
              name="owner-phone"
              type="tel"
              value={watch('userInfo.phone')}
              onChange={(e) => setValue('userInfo.phone', e.target.value)}
              required
              placeholder='Ví dụ: "0987654321"'
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="owner-email" className="text-sm font-medium">
              Gmail
            </label>
            <input
              id="owner-email"
              name="owner-email"
              type="email"
              required
              value={watch('userInfo.email')}
              onChange={(e) => setValue('userInfo.email', e.target.value)}
              placeholder="nguyenvana@gmail.com"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div></div>

          {/* Địa chỉ */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="owner-address-province"
              className="text-sm font-medium"
            >
              Tỉnh/Thành phố
            </label>
            <ProvinceDropdown
              provinces={provinces!}
              onChange={handleProvinceChange}
              title="Chọn Tỉnh/Thành phố"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="owner-address-province"
              className="text-sm font-medium"
            >
              Quận/Huyện
            </label>
            <ProvinceDropdown
              provinces={districts!}
              onChange={handleDistrictChange}
              title="Chọn Quận/huyện"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="owner-address-province"
              className="text-sm font-medium"
            >
              Xã/Phường
            </label>

            <DistrictDropdown districts={wards!} />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="owner-address" className="text-sm font-medium">
              Địa chỉ chi tiết
            </label>
            <input
              id="owner-address"
              name="owner-address"
              type="text"
              placeholder="497 Hoà hảo, Phường 7, Quận 10, TP.HCM"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>
      {/* Controller */}
      <ControlForm handleBack={handleBack} handleNext={handleNext} type={3} />
    </div>
  );
}
