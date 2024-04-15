//Ref: https://www.petrescue.com.au/groups/new

import React, { useState } from 'react';
import { Alert } from '../general/Alert';
import { PET_ORG_TYPE_OPTION } from '@/src/utils/constants';
import { useForm } from 'react-hook-form';
import { IOrgUpgradeRequest } from '@/src/interfaces/org';
import AddressDropdown from './AddressDropdown';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/src/stores';

export const UserUpgradeForm = observer(() => {
  const { userStore } = useStores();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertFail, setAlertFail] = useState<boolean>(false);
  const [isReadTerms, setIsReadTerms] = useState<boolean>(false);

  const { getValues, setValue, watch } = useForm<IOrgUpgradeRequest>(
    {
      defaultValues: {
        orgName: '',
        ownerName: '',
        phone: '',
        provinceCode: '',
        districtCode: '',
        wardCode: '',
        street: '',
        bn: '',
        link: '',
        orgType: 0,
        about: '',
      }
    }
  );

  const handleClickTerm = () => {
    setIsReadTerms(true);
    window.open('/terms');
  };

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
              <label htmlFor="org-name" className="text-gray-700 text-lg font-bold">
                Tên tổ chức
              </label>
              <input
                id="org-name"
                name="org-name"
                type="text"
                required
                onChange={(e) => {
                  setValue('orgName', e.target.value);
                }
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-name" className="text-gray-700 text-lg font-bold">
                Tên pháp nhân
              </label>
              <input
                id="owner-name"
                name="owner-name"
                type="text"
                required
                onChange={(e) => { setValue('ownerName', e.target.value); }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-phone" className="text-gray-700 text-lg font-bold">
                Số điện thoại
              </label>
              <input
                id="owner-phone"
                name="owner-phone"
                type="tel"
                required
                onChange={(e) => { setValue('phone', e.target.value); }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="owner-email" className="text-gray-700 text-lg font-bold">
                Email
              </label>
              <input
                readOnly
                type="email"
                value={userStore.userContext?.email}
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
              <label htmlFor="org-address" className="text-gray-700 text-lg font-bold">
                Số nhà, tên đường
              </label>
              <input
                id="org-address"
                name="org-address"
                type="text"
                required
                onChange={(e) => { setValue('street', e.target.value); }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="link" className="text-gray-700 text-lg font-bold">
                Website / Mạng xã hội
              </label>
              <input
                id="link"
                name="link"
                type="text"
                required
                onChange={(e) => { setValue('link', e.target.value); }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="bn" className="text-gray-700 text-lg font-bold">
                Mã số thuế
              </label>
              <input
                id="bn"
                name="bn"
                required
                onChange={(e) => { setValue('bn', e.target.value); }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="org-type" className="text-gray-700 text-lg font-bold">
                Loại tổ chức
              </label>
              <select
                className='text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'
                name="org-type"
                id="org-type"
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
              <label htmlFor="org-mission" className="text-gray-700 text-lg font-bold">
                Giới thiệu về tổ chức
              </label>
              <textarea
                id="org-mission"
                name="org-mission"
                onChange={(e) => { setValue('about', e.target.value); }}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="col-span-2 flex items-center">
              <input
                disabled={!isReadTerms}
                type="checkbox"
                required
              />
              <span className='ml-1'>
                Tôi cam kết tuân thủ các
                <i
                  onClick={handleClickTerm}
                  className='text-blue-700 font-bold underline cursor-pointer'
                > điều khoản và điều kiện </i>
                của tổ chức
              </span>
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
});
