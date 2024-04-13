import React from 'react';
import { Alert } from '../general/Alert';

export default function UserUpgradeForm() {
  return (
    <div className="container p-5 mx-auto">
      <form className="w-full rounded-2xl bg-blue-200 p-5">
        <h2 className="font-bold mb-2">Đơn nhận nuôi thú cưng</h2>
        {/* form */}
        <div
          className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
          style={{ maxHeight: '400px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tên người nhận nuôi */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="org-name" className="text-sm font-medium">
                Tên tổ chức
              </label>
              <input
                id="org-name"
                name="org-name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-name" className="text-sm font-medium">
                Tên pháp nhân
              </label>
              <input
                id="owner-name"
                name="owner-name"
                type="text"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-name" className="text-sm font-medium">
                Loại tổ chức
              </label>
              <select name="org-type" id="org-type">
                <option value="1">Cửa hàng</option>
                <option value="2">Trại thú cưng</option>
                <option value="3">Giải cứu động vật</option>
                <option value="4">Tổ chức bảo vệ động vật</option>
                <option value="5">Khác</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="org-address" className="text-sm font-medium">
                Địa chỉ
              </label>
              <input
                id="org-address"
                name="org-address"
                type="text"
                readOnly
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
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2 col-span-2">
              <label htmlFor="owner-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="owner-email"
                name="owner-email"
                type="email"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-2 col-span-2">
              <label htmlFor="org-mission" className="text-sm font-medium">
                Nhiệm vụ của tổ chức
              </label>
              <input
                id="org-mission"
                name="org-mission"
                type="text"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
              <label
                htmlFor="org-year-operation"
                className="text-sm font-medium"
              >
                Thời gian hoạt động
              </label>
              <input
                id="org-year-operation"
                name="org-year-operation"
                type="text"
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
              <label htmlFor="org-statement" className="text-sm font-medium">
                Điều khoản và điều kiện
              </label>
              <input id="org-statement" name="org-statement" type="checkbox" />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg font-bold"
          >
            Hoàn thành
          </button>
        </div>
      </form>
    </div>
  );
}
