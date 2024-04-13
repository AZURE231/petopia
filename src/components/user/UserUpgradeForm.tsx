//Ref: https://www.petrescue.com.au/groups/new

import React, { useState } from "react";
import { Alert } from "../general/Alert";
import { PET_ORG_TYPE_OPTION } from "@/src/utils/constants";
import { useForm } from "react-hook-form";
import { IOrgUpgradeRequest } from "@/src/interfaces/org";
import AddressDropdown from "./AddressDropdown";

export default function UserUpgradeForm() {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertFail, setAlertFail] = useState<boolean>(false);

  const { getValues, setValue, watch } = useForm<IOrgUpgradeRequest>(
    {defaultValues: {
      orgName: "",
      ownerName: "",
      phone: "",
      provinceCode: "",
      districtCode: "",
      wardCode: "",
      street: "",
      email: "",
      bn: "",
      link: "",
      orgType: 0,
      about: "",
    }
    }
  );
  return (
    <div className="container p-5 mx-auto">
      <form className="w-full rounded-2xl bg-blue-200 p-5">
        <h2 className="font-bold mb-2">Đơn nhận nuôi thú cưng</h2>
        {/* form */}
        <div
          className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
          style={{ maxHeight: "400px" }}
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
                required
                onChange={(e) => {
                  setValue("orgName", e.target.value);}
                }
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
                required
                onChange={(e) => { setValue("ownerName", e.target.value);} }
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
                onChange={(e) => {setValue("phone", e.target.value);}}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="owner-email"
                name="owner-email"
                type="email"
                required
                onChange={(e) => {setValue("email", e.target.value);} }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col space-y-2 col-span-2">
              <AddressDropdown
                districtCode={watch("districtCode")}
                provinceCode={watch("provinceCode")}
                wardCode={watch("wardCode")}
                setProvinceCode={(code: string) => {
                  setValue("provinceCode", code);
                }}
                setDistrictCode={(code: string) => {
                  setValue("districtCode", code);
                }}
                setWardCode={(code: string) => {
                  setValue("wardCode", code);
                }}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="org-address" className="text-sm font-medium">
                Số nhà, tên đường
              </label>
              <input
                id="org-street"
                name="org-street"
                type="text"
                required
                onChange={(e) => {setValue("street", e.target.value);} }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-name" className="text-sm font-medium">
                Website / Mạng xã hội
              </label>
              <input
                id="link"
                name="link"
                type="text"
                required
                onChange={(e) => {setValue("link", e.target.value);} }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-name" className="text-sm font-medium">
                Mã số thuế
              </label>
              <input
                id="bn"
                name="bn"
                required
                onChange={(e) => {setValue("bn", e.target.value);} }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-name" className="text-sm font-medium">
                Loại tổ chức
              </label>
              <select name="org-type" id="org-type"
               onChange={(e) =>
                setValue('orgType', parseInt(e.target.value))
              }>
                {PET_ORG_TYPE_OPTION.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
              <label htmlFor="org-mission" className="text-sm font-medium">
                Giới thiệu về tổ chức
              </label>
              <textarea
                id="org-mission"
                name="org-mission"
                onChange={(e) => {setValue("about", e.target.value);} }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2 col-span-2">
              <a
                href="/terms"
                target="_blank"
                className="text-blue-500 underline"
              >
                Điều khoản và điều kiện
              </a>
              <div>
                <input
                  id="org-statement"
                  name="org-statement"
                  type="checkbox"
                  required
                />
                <label className="mx-5">
                  Tôi cam kết tuân thủ các điều khoản và điều kiện của tổ chức
                </label>
              </div>
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
      <Alert
        failed={alertFail}
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        // action={handleClose}
      />
    </div>
  );
}
