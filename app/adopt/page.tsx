'use client';
import { useState } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

export default function Adopt() {
  const dogBreeds = [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
    // Add more dog breeds as needed
  ];

  const dogColor = ['Vàng', 'Đen', 'Đỏ'];

  const dogVaccination = ['7 mũi', 'Dại', 'Uốn ván'];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="container w-5/6 p-5 mx-auto">
      <h1 className="text-2xl font-bold mb-10">Tạo hồ sơ thú cưng</h1>
      <div>
        {/* breadscrum stepper */}
        <ol className="flex items-center justify-center w-full p-3 mb-5 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
          <li className="flex items-center text-blue-600 dark:text-blue-500">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 ">
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
          <li className="flex items-center">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 ">
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
          <li className="flex items-center">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 ">
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
          <li className="flex items-center">
            <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 ">
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tên thú cưng */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pet-name" className="text-sm font-medium">
                    Tên thú cưng
                  </label>
                  <input
                    id="pet-name"
                    name="pet-name"
                    type="text"
                    placeholder='Ví dụ: "Miu" hoặc "Lulu"'
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Giới tính */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pet-sex" className="text-sm font-medium">
                    Giới tính
                  </label>
                  <div className="flex items-center justify-between h-full">
                    <label htmlFor="sex-male">
                      <input id="sex-male" name="sex-male" type="checkbox" />{' '}
                      Đực
                    </label>
                    <label htmlFor="sex-female">
                      <input
                        id="sex-female"
                        name="sex-female"
                        type="checkbox"
                      />{' '}
                      Cái
                    </label>
                    <label htmlFor="sex-unknown">
                      <input
                        id="sex-unknown"
                        name="sex-unknown"
                        type="checkbox"
                      />{' '}
                      Không rõ
                    </label>
                  </div>
                </div>

                {/* Loại */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pet-breed" className="text-sm font-medium">
                    Giống loại
                  </label>
                  <select
                    name="breed"
                    className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <option value="">Chọn giống</option>
                    {dogBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Độ tuổi */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pet-age" className="text-sm font-medium">
                    Độ tuổi
                  </label>
                  <div className="flex items-center justify-between h-full">
                    <label htmlFor="age-below-one">
                      <input
                        name="age-below-one"
                        id="age-below-one"
                        type="checkbox"
                      />{' '}
                      Dưới 1 năm
                    </label>
                    <label htmlFor="age-one-to-three">
                      <input
                        name="age-one-to-three"
                        id="age-one-to-three"
                        type="checkbox"
                      />{' '}
                      1-3 năm
                    </label>
                    <label htmlFor="age-above-three">
                      <input
                        name="age-above-three"
                        id="age-above-three"
                        type="checkbox"
                      />{' '}
                      Trên 3 năm
                    </label>
                  </div>
                </div>

                {/* Màu sắc */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="pet-color" className="text-sm font-medium">
                    Màu sắc
                  </label>
                  <select
                    name="pet-color"
                    className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <option value="">Chọn màu</option>
                    {dogColor.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tiêm chủng */}
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="pet-vaccination"
                    className="text-sm font-medium"
                  >
                    Tiêm chủng
                  </label>
                  <select className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <option value="">Chọn loại tiêm chủng</option>
                    {dogVaccination.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
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
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tên chủ nhân */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="owner-name" className="text-sm font-medium">
                    Tên chủ nhân
                  </label>
                  <input
                    id="owner-name"
                    name="owner-name"
                    type="text"
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
                  <select
                    name="owner-address-province"
                    className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {dogBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="owner-address-province"
                    className="text-sm font-medium"
                  >
                    Quận/Huyện
                  </label>
                  <select
                    name="owner-address-district"
                    className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <option value="">Chọn quận/huyện</option>
                    {dogBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="owner-address-province"
                    className="text-sm font-medium"
                  >
                    Xã/Phường
                  </label>
                  <select
                    name="owner-address-ward"
                    className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <option value="">Chọn xã/phường</option>
                    {dogBreeds.map((breed) => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="owner-address"
                    className="text-sm font-medium"
                  >
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
              </form>
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
                onClick={handleNext}
                className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
              >
                Hoàn thành
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
