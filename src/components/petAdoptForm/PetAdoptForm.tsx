import { IApiResponse } from "@/src/interfaces/common";
import { IAdoptPetRequest } from "@/src/interfaces/pet";
import { getUserInfo } from "@/src/services/user.api";
import {
  ADOPT_TIME_OPTION,
  HOUSE_TYPE_OPTION,
  QUERY_KEYS,
} from "@/src/utils/constants";
import { useQuery } from "@/src/utils/hooks";
import React from "react";
import AddressDropdown from "../user/AddressDropdown";
import { useForm } from "react-hook-form";
import { IUserInfo } from "@/src/interfaces/user";

interface Props {
  handleClose: () => void;
}

export default function PetAdoptForm({ handleClose }: Props) {
  const houseType = HOUSE_TYPE_OPTION;
  const adoptTime = ADOPT_TIME_OPTION;
  const [userInfo, setUserInfo] = React.useState<IUserInfo>();
  const { getValues, setValue, watch } = useForm<IAdoptPetRequest>({
    defaultValues: {
      phone: userInfo?.phone,
      provinceCode: userInfo?.provinceCode,
      districtCode: userInfo?.districtCode,
      wardCode: userInfo?.wardCode,
      street: userInfo?.street,
      petId: "",
      adoptTime: 0,
      houseType: 0,
      message: "",
      isOwnerBefore: false,
    },
  });

  useQuery<IApiResponse<IUserInfo>>(["getUserInfo"], getUserInfo, {
    onSuccess: (res) => {
      setUserInfo(res.data.data);
      console.log(res.data.data);
    },
    onError: (err) => console.log(err),
    refetchOnWindowFocus: false,
  });

  const handleSubmit = () => {
    console.log("Submit form");

    handleClose();
  };
  return (
    <div className="container w-5/6 p-5 mx-auto">
      <div>
        {/* form pet owner */}
        <div className="w-full rounded-2xl bg-blue-200 p-5">
          <h2 className="font-bold mb-2">Đơn nhận nuôi thú cưng</h2>
          {/* form */}
          <div
            className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
            style={{ maxHeight: "400px" }}
          >
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
                  value={
                    userInfo?.attributes.firstName +
                    " " +
                    userInfo?.attributes.lastName
                  }
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
                  value={userInfo?.phone}
                  onChange={(e) => setValue("phone", e.target.value)}
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
                  value={userInfo?.email}
                  readOnly
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                {/* <AddressDropdown getValues = {getValues} watch={watch}/> */}
              </div>
              {/* Địa chỉ */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="owner-address" className="text-sm font-medium">
                  Số nhà, đường
                </label>
                <input
                  id="owner-address"
                  name="owner-address"
                  type="text"
                  onChange={(e) => setValue("street", e.target.value)}
                  value={userInfo?.address}
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
                      onChange={(e) =>
                        setValue("isOwnerBefore", e.target.value === "yes")
                      }
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
                      onChange={(e) =>
                        setValue("isOwnerBefore", e.target.value === "no")
                      }
                    />
                    <label htmlFor="owner-pet-no">Không</label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="owner-house" className="text-sm font-medium">
                  Loại nhà ở
                </label>
                <select
                  id="owner-house"
                  name="owner-house"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) =>
                    setValue("houseType", parseInt(e.target.value))
                  }
                >
                  {houseType.map((type) => (
                    <option key={type.label} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="owner-time" className="text-sm font-medium">
                  Thời gian đón thú nuôi
                </label>
                <select
                  id="owner-time"
                  name="owner-time"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={(e) =>
                    setValue("adoptTime", parseInt(e.target.value))
                  }
                >
                  {adoptTime.map((time) => (
                    <option key={time.label} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-2 col-span-2">
                <label htmlFor="owner-note" className="text-sm font-medium">
                  Ghi chú
                </label>
                <textarea
                  id="owner-note"
                  name="owner-note"
                  onChange={(e) => setValue("message", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                ></textarea>
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
