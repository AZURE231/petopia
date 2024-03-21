import React from 'react';

interface Props {
  handleClose: () => void;
}

export default function PetAdoptForm({ handleClose }: Props) {
  const houseType = ['Khác','Nhà riêng', 'Chung cư', 'Kí túc xá', 'Nhà trọ', ];
  const adoptTime = [ 'Khác','Ngay lập tức', '1 ngày', 'Vài ngày', '1 tuần',];
  const handleSubmit = () => {
    console.log('Submit form');
    handleClose();
  };
  return (
    <div className="container w-5/6 p-5 mx-auto">
      <div>
        {/* form pet owner */}
        <div className="w-full rounded-2xl bg-blue-200 p-5">
          <h2 className="font-bold mb-2">Đơn nhận nuôi thú cưng</h2>
          {/* form */}
          <div className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto" style={{ maxHeight: '400px' }}>
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
                  placeholder="Nguyễn Văn A"
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                  placeholder="0987654321"
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                  placeholder="abc@gmail.com"
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                </select>
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
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium">
                  Bạn từng là chủ nhân của thú cưng chưa?
                </label>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <input
                      id="owner-pet-yes"
                      name="owner-pet"
                      type="radio"
                      value="yes"
                      className="rounded-lg"
                    />
                    <label htmlFor="owner-pet-yes">Có</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      id="owner-pet-no"
                      name="owner-pet"
                      type="radio"
                      value="no"
                      className="rounded-lg"
                    />
                    <label htmlFor="owner-pet-no">Không</label>
                  </div>
                </div>
              </div>
              <div></div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="owner-house" className="text-sm font-medium">
                  Bạn hiện đang ở loại nhà nào?
                </label>
                <select
                  id="owner-house"
                  name="owner-house"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {houseType.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="owner-time" className="text-sm font-medium">
                  Thời gian đón thú nuôi về nhà
                </label>
                <select
                  id="owner-time"
                  name="owner-time"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {adoptTime.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg font-bold"
              onClick={handleSubmit}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
