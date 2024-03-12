'use client';
import { ChangeEvent, useState, useEffect } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';
import { set, useForm } from 'react-hook-form';
import {
  ICreatePetProfileRequest,
  ILocationRequest,
  ILocationResponse,
} from '@/src/interfaces/petProfile';
import { useMutation, useQuery } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QueryProvider } from './QueryProvider';
import AttributeSelect from './AttributeSelect';
import ProvinceDropdown from './ProvinceDropdown';
import DistrictDropdown from './DistrictDropdown';
import { getProvince } from '../services/petprofile.api';
import { QUERY_KEYS } from '../utils/constants';

const RegisterForm = QueryProvider(() => {
  const dogBreeds = [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
    // Add more dog breeds as needed
  ];

  const petSex = ['Đực', 'Cái', 'Không biết'];
  const petAge = ['Dưới 1 năm', '1 - 3 năm', 'Trên 3 năm'];
  const petColor = ['Vàng', 'Đen', 'Đỏ'];
  const petVaccination = ['7 mũi', 'Dại', 'Uốn ván'];
  const petSize = ['Nhỏ', 'Trung bình', 'Lớn'];
  const petSpecies = ['Chó', 'Mèo', 'Chim', 'Cá', 'Khác'];

  const activeStepper = 'text-blue-600';
  const activeStepperBorder = 'border-blue-600';

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // ADOPT FORM
  const { getValues, setValue, watch } = useForm<ICreatePetProfileRequest>({
    defaultValues: {
      petInfo: {
        name: '',
        species: '',
        breed: '',
        sex: '',
        age: '',
        color: '',
        size: '',
        isVaccinated: '',
        isNeutered: '',
      },
      userInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
    },
  });

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerMutation.mutate(getValues());
  };

  // REGISTER MUTATION
  const registerMutation = useMutation<
    IApiResponse<boolean>,
    ICreatePetProfileRequest
  >(getProvince, {
    onError: (err) => {},
    onSuccess: () => {},
  });

  // HANDLE ADDRESS CHANGE
  const [provinces, setProvinces] = useState<ILocationResponse[]>();
  const [districts, setDistricts] = useState<ILocationResponse[]>();
  const [wards, setWards] = useState<ILocationResponse[]>();
  const locationForm = useForm<ILocationRequest>({
    defaultValues: { Level: 1 },
  });

  // use http.get to fetch provinces
  useQuery<IApiResponse<ILocationResponse[]>>(
    [
      QUERY_KEYS.GET_LOCATION,
      locationForm.watch('Code'),
      locationForm.watch('Level'),
    ],
    () => getProvince(locationForm.getValues()),
    {
      onSuccess: (res) => {
        console.log(locationForm.getValues('Level'));
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
    <form onSubmit={handleSubmit}>
      {/* breadscrum stepper */}
      <ol className="flex items-center justify-center w-full p-3 mb-5 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li
          className={
            'flex items-center ' + (activeStep === 0 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 0 ? activeStepperBorder : 'border-gray-500')
            }
          >
            1
          </span>
          Tải hình ảnh{' '}
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={
            'flex items-center ' + (activeStep === 1 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 1 ? activeStepperBorder : 'border-gray-500')
            }
          >
            2
          </span>
          Thông tin thú cưng{' '}
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={
            'flex items-center ' + (activeStep === 2 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 2 ? activeStepperBorder : 'border-gray-500')
            }
          >
            3
          </span>
          Thông tin chủ sở hữu{' '}
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={
            'flex items-center ' + (activeStep === 3 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 3 ? activeStepperBorder : 'border-gray-500')
            }
          >
            4
          </span>
          Xác nhận
        </li>
      </ol>

      {/* form upload images */}
      {activeStep === 0 && (
        <div className="w-full rounded-2xl bg-blue-200 p-5">
          <h2 className="font-bold mb-2">Hình thú cưng của bạn</h2>

          {/* Dropzone */}
          <div className="flex items-center justify-center w-full p-5 mb-5 bg-gray-50 rounded-lg">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 ">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          {/* Controller */}
          <div className="w-full bg-white rounded-lg p-5 flex justify-end">
            <button
              onClick={handleNext}
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
            >
              Tiếp tục {'  '}
              <span className="ml-1 mt-1 item-center ">
                <FaLongArrowAltRight />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* form pet detail */}
      {activeStep === 1 && (
        <div className="w-full rounded-2xl bg-blue-200 p-5">
          <h2 className="font-bold mb-2">Thông tin về thú cưng của bạn</h2>

          {/* form */}
          <div className="w-full p-5 mb-5 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Tên thú cưng */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="pet-name" className="text-sm font-medium">
                  Tên thú cưng
                </label>
                <input
                  id="pet-name"
                  name="pet-name"
                  type="text"
                  value={watch('petInfo.name')}
                  onChange={(e) => setValue('petInfo.name', e.target.value)}
                  placeholder='Ví dụ: "Miu" hoặc "Lulu"'
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              {/* Giới tính */}
              <AttributeSelect
                setValue={setValue}
                watch={watch}
                label="Giới tính"
                value="petInfo.sex"
                options={petSex}
              />

              {/* Giống */}
              <AttributeSelect
                setValue={setValue}
                watch={watch}
                label="Giống loại"
                value="petInfo.breed"
                options={dogBreeds}
              />

              {/* Độ tuổi */}
              <AttributeSelect
                setValue={setValue}
                watch={watch}
                label="Độ tuổi"
                value="petInfo.age"
                options={petAge}
              />

              {/* Màu sắc */}
              <AttributeSelect
                setValue={setValue}
                watch={watch}
                label="Màu sắc"
                value="petInfo.color"
                options={petColor}
              />

              {/* Tiêm chủng */}
              <AttributeSelect
                setValue={setValue}
                watch={watch}
                label="Tiêm chủng"
                value="petInfo.isVaccinated"
                options={petVaccination}
              />
            </div>
          </div>
          {/* Controller */}
          <div className="w-full bg-white rounded-lg p-5 flex justify-between">
            <button
              onClick={handleBack}
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
            >
              <span className="ml-1 mt-1 item-center ">
                <FaLongArrowAltLeft />
              </span>
              Quay lại {'  '}
            </button>
            <button
              onClick={handleNext}
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
            >
              Tiếp tục {'  '}
              <span className="ml-1 mt-1 item-center ">
                <FaLongArrowAltRight />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* form pet owner */}
      {activeStep === 2 && (
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
          <div className="w-full bg-white rounded-lg p-5 flex justify-between">
            <button
              onClick={handleBack}
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
            >
              <span className="ml-1 mt-1 item-center ">
                <FaLongArrowAltLeft />
              </span>
              Quay lại {'  '}
            </button>
            <button
              onClick={handleNext}
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
            >
              Tiếp tục {'  '}
              <span className="ml-1 mt-1 item-center ">
                <FaLongArrowAltRight />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* rules */}
      {activeStep === 3 && (
        <div className="w-full rounded-2xl bg-blue-200 p-5">
          <h2 className="font-bold mb-2">Điều khoản</h2>
          <div className=" w-full p-5 mb-5 bg-gray-50 rounded-lg">sfsd</div>
          {/* Controller */}
          <div className="w-full bg-white rounded-lg p-5 flex justify-between">
            <button
              onClick={handleBack}
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
            >
              <span className="ml-1 mt-1 item-center ">
                <FaLongArrowAltLeft />
              </span>
              Quay lại {'  '}
            </button>
            <button
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
              type="submit"
            >
              Hoàn thành
            </button>
          </div>
        </div>
      )}
    </form>
  );
});

export default RegisterForm;
