import { IApiResponse } from '@/src/interfaces/common';
import { getUserInfo } from '@/src/services/user.api';
import {
  ADOPT_TIME_OPTION,
  HOUSE_TYPE_OPTION,
  QUERY_KEYS,
} from '@/src/utils/constants';
import { useMutation, useQuery } from '@/src/utils/hooks';
import React, { useState } from 'react';
import AddressDropdown from '../user/AddressDropdown';
import { useForm } from 'react-hook-form';
import { IUserInfoReponse } from '@/src/interfaces/user';
import { usePathname } from 'next/navigation';
import { Alert } from '../general/Alert';
import { preCheckAdoption, sendAdoptRequest } from '@/src/services/adopt.api';
import { IAdoptPetRequest } from '@/src/interfaces/adopt';
import { getErrorMessage } from '@/src/helpers/getErrorMessage';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/src/stores';

interface Props {
  handleClose: () => void;
}

export const PetAdoptForm = observer(({ handleClose }: Props) => {
  const pathname = usePathname();
  const { userStore } = useStores();

  // STATES
  const [userInfo, setUserInfo] = useState<IUserInfoReponse>();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertFail, setAlertFail] = useState<boolean>(false);

  // FORMS
  const { getValues, setValue, watch } = useForm<IAdoptPetRequest>({
    defaultValues: {
      phone: userInfo?.phone,
      provinceCode: userInfo?.provinceCode,
      districtCode: userInfo?.districtCode,
      wardCode: userInfo?.wardCode,
      street: userInfo?.street,
      petId: pathname.split('/')[2],
      adoptTime: 0,
      houseType: 0,
      message: '',
      isOwnerBefore: false,
    },
  });

  // HANDLERS
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendAdoptRequestMutation.mutate(getValues());
  };

  // PRE CHECK BEFORE OPEN FORM
  const preCheckQuery = useQuery<IApiResponse<boolean>>(
    [QUERY_KEYS.PRE_CHECK_ADOPTION],
    () => preCheckAdoption(pathname.split('/')[2]),
    {
      onError: (err) => {
        setAlertMessage(getErrorMessage(err.data.errorCode.toString()));
        setAlertFail(true);
        setAlertShow(true);
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  // GET USER INFO AFTER PRE CHECK SUCCESSFULLY
  useQuery<IApiResponse<IUserInfoReponse>>(
    [QUERY_KEYS.GET_USER_INFO_FOR_ADOPTION],
    getUserInfo,
    {
      onSuccess: (res) => {
        setUserInfo(res.data.data);
        setValue('phone', res.data.data.phone);
        setValue('provinceCode', res.data.data.provinceCode);
        setValue('districtCode', res.data.data.districtCode);
        setValue('wardCode', res.data.data.wardCode);
        setValue('street', res.data.data.street);
      },
      refetchOnWindowFocus: false,
      enabled: preCheckQuery.isSuccess,
    }
  );

  const sendAdoptRequestMutation = useMutation<
    IApiResponse<IUserInfoReponse>,
    IAdoptPetRequest
  >(sendAdoptRequest, {
    onError: () => {
      setAlertMessage('Thất bại, kiểm tra lại thông tin nhập');
      setAlertFail(true);
      setAlertShow(true);
    },
    onSuccess: () => {
      setAlertMessage('Gửi yêu cầu nhận nuôi thành công');
      setAlertFail(false);
      setAlertShow(true);
    },
  });

  return (
    <div className="container p-5 mx-auto">
      {preCheckQuery.isSuccess && (
        <form
        test-id="adopt-form"
          className="w-full rounded-2xl bg-yellow-100 p-5"
          onSubmit={handleOnSubmit}
        >
          <h2 className="font-bold mb-2">Đơn nhận nuôi thú cưng</h2>
          {/* form */}
          <div
            className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
            style={{ maxHeight: '400px' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Tên người nhận nuôi */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="owner-name" className="text-sm font-medium">
                  Tên người nhận nuôi
                </label>
                <input
                  id="owner-name"
                  name="owner-name"
                  type="text"
                  required
                  value={userStore.userContext?.name}
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
                  value={watch('phone')}
                  onChange={(e) => setValue('phone', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2 col-span-2">
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
              <div></div>
              <div className="flex flex-col space-y-2 col-span-2">
                {userInfo && (
                  <AddressDropdown
                    districtCode={watch('districtCode')}
                    provinceCode={watch('provinceCode')}
                    wardCode={watch('wardCode')}
                    setProvinceCode={(code: string) => {
                      setValue('provinceCode', code);
                    }}
                    setDistrictCode={(code: string) => {
                      setValue('districtCode', code);
                    }}
                    setWardCode={(code: string) => {
                      setValue('wardCode', code);
                    }}
                  />
                )}
              </div>
              {/* Địa chỉ */}
              <div className="flex flex-col space-y-2 col-span-2">
                <label htmlFor="owner-address" className="text-sm font-medium">
                  Số nhà,tên đường
                </label>
                <input
                  id="owner-address"
                  name="owner-address"
                  type="text"
                  required
                  value={watch('street')}
                  onChange={(e) => setValue('street', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2 col-span-2">
                <label className="text-sm font-medium">
                  Bạn từng là chủ nhân của thú cưng chưa?
                </label>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <input
                      id="owner-pet-yes"
                      name="owner-pet"
                      type="checkbox"
                      checked={watch('isOwnerBefore')}
                      onChange={(e) =>
                        setValue('isOwnerBefore', e.target.checked)
                      }
                      className="rounded-lg"
                    />
                    <label htmlFor="owner-pet-yes">Đã từng</label>
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
                    setValue('houseType', parseInt(e.target.value))
                  }
                >
                  {HOUSE_TYPE_OPTION.map((type) => (
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
                    setValue('adoptTime', parseInt(e.target.value))
                  }
                >
                  {ADOPT_TIME_OPTION.map((time) => (
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
                  test-id = "adopt-form-note"
                  id="owner-note"
                  name="owner-note"
                  required
                  onChange={(e) => setValue('message', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              test-id="adopt-form-submit"
              type="submit"
              className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg font-bold"
            >
              Hoàn thành
            </button>
          </div>
        </form>
      )}
      <Alert
        testId='adopt-form-alert'
        failed={alertFail}
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        action={() => !alertFail && handleClose()}
        showCancel={false}
      />
    </div>
  );
});
