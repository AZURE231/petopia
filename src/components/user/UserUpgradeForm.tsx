import React, { useState } from 'react';
import { Alert } from '../general/Alert';
import { ORG_TYPE, PET_ORG_TYPE_OPTION } from '@/src/utils/constants';
import { useForm } from 'react-hook-form';
import { IOrgUpgradeRequest } from '@/src/interfaces/org';
import AddressDropdown from './AddressDropdown';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/src/stores';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { upgradeToOrg } from '@/src/services/user.api';
import QueryButton from '../general/QueryButton';

export const UserUpgradeForm = observer(
  ({ handleClose }: { handleClose: () => void }) => {
    const { userStore } = useStores();
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertShow, setAlertShow] = useState<boolean>(false);
    const [alertFail, setAlertFail] = useState<boolean>(false);
    const [isReadTerms, setIsReadTerms] = useState<boolean>(false);

    const { getValues, setValue, watch } = useForm<IOrgUpgradeRequest>({
      defaultValues: {
        entityName: '',
        email: userStore.userContext?.email || '',
        organizationName: '',
        phone: '',
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        street: '',
        website: '',
        taxCode: '',
        type: ORG_TYPE.OTHER,
        description: '',
      },
    });

    const handleClickTerm = () => {
      setIsReadTerms(true);
      window.open('/terms');
    };

    const upgradeAccountMutation = useMutation<
      IApiResponse<boolean>,
      IOrgUpgradeRequest
    >(upgradeToOrg, {
      onError: (err) => {
        setAlertMessage('Bạn đã gửi đăng ký, không thể gửi đăng kí lại');
        setAlertShow(true);
        setAlertFail(true);
      },
      onSuccess: () => {
        setAlertMessage(
          'Yêu cầu của bạn đã được gửi đi, chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất'
        );
        setAlertShow(true);
        setAlertFail(false);
      },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      upgradeAccountMutation.mutate(getValues());
    };

    return (
      <div className="container p-5 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-blue-200 p-5"
          test-id="org-upgrade-form"
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
                <label
                  htmlFor="org-name"
                  className="text-gray-700 text-lg font-bold"
                >
                  Tên tổ chức
                </label>
                <input
                  test-id="org-name"
                  id="org-name"
                  name="org-name"
                  type="text"
                  required
                  onChange={(e) => {
                    setValue('organizationName', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="owner-name"
                  className="text-gray-700 text-lg font-bold"
                >
                  Tên pháp nhân
                </label>
                <input
                  test-id="org-owner-name"
                  id="owner-name"
                  name="owner-name"
                  type="text"
                  required
                  onChange={(e) => {
                    setValue('entityName', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Số điện thoại */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="org-phone"
                  className="text-gray-700 text-lg font-bold"
                >
                  Số điện thoại
                </label>
                <input
                  test-id="org-phone"
                  id="org-phone"
                  name="org-phone"
                  type="tel"
                  required
                  onChange={(e) => {
                    setValue('phone', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="org-email"
                  className="text-gray-700 text-lg font-bold"
                >
                  Email
                </label>
                <input
                  test-id="org-email"
                  id="org-email"
                  type="email"
                  required
                  value={watch('email')}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex flex-col space-y-2 col-span-2">
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
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="org-address"
                  className="text-gray-700 text-lg font-bold"
                >
                  Số nhà, tên đường
                </label>
                <input
                  test-id="org-street"
                  id="org-address"
                  name="org-address"
                  type="text"
                  required
                  onChange={(e) => {
                    setValue('street', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="link"
                  className="text-gray-700 text-lg font-bold"
                >
                  Website / Mạng xã hội
                </label>
                <input
                  test-id="org-website"
                  id="link"
                  name="link"
                  type="text"
                  onChange={(e) => {
                    setValue('website', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="tax-code"
                  className="text-gray-700 text-lg font-bold"
                >
                  Mã số thuế
                </label>
                <input
                  test-id="org-tax-code"
                  id="tax-code"
                  name="tax-code"
                  required
                  onChange={(e) => {
                    setValue('taxCode', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="org-type"
                  className="text-gray-700 text-lg font-bold"
                >
                  Loại tổ chức
                </label>
                <select
                  test-id="org-type"
                  className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                  name="org-type"
                  required
                  id="org-type"
                  onChange={(e) => setValue('type', parseInt(e.target.value))}
                >
                  {PET_ORG_TYPE_OPTION.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2 col-span-2">
                <label
                  htmlFor="org-mission"
                  className="text-gray-700 text-lg font-bold"
                >
                  Giới thiệu về tổ chức
                </label>
                <textarea
                  test-id="org-mission"
                  id="org-mission"
                  name="org-mission"
                  onChange={(e) => {
                    setValue('description', e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="col-span-2 flex items-center">
                <input disabled={!isReadTerms} type="checkbox" required />
                <span className="ml-1">
                  Tôi cam kết tuân thủ các
                  <i
                    onClick={handleClickTerm}
                    className="text-blue-700 font-bold underline cursor-pointer"
                  >
                    {' '}
                    điều khoản và điều kiện{' '}
                  </i>
                  của tổ chức
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <QueryButton
              testId="user-upgrade-button"
              name={'Hoàn thành'}
              isLoading={upgradeAccountMutation.isLoading}
            />
          </div>
        </form>
        <Alert
          failed={alertFail}
          message={alertMessage}
          show={alertShow}
          setShow={setAlertShow}
          action={handleClose}
        />
      </div>
    );
  }
);
