import { IAdoptFormInfo } from '@/src/interfaces/adopt';
import { IApiResponse } from '@/src/interfaces/common';
import { actOnAdoptRequest, getAdoptFormInfo } from '@/src/services/adopt.api';
import {
  ADOPT_ACTION,
  ADOPT_DELAY_DURATION,
  HOUSE_TYPE,
  QUERY_KEYS,
} from '@/src/utils/constants';
import { useMutation, useQuery } from '@/src/utils/hooks';
import { use, useState } from 'react';
import { PetCard } from '../search/PetCard';
import { IPetDetailResponse, IPetResponse } from '@/src/interfaces/pet';
import { getPetDetail } from '@/src/services/pet.api';
import { Alert } from '../general/Alert';
import Link from 'next/link';
import { FaRegUserCircle } from 'react-icons/fa';

export default function PetAdoptionInfo({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const [formInfo, setFormInfo] = useState<IAdoptFormInfo>();
  const [petInfo, setPetInfo] = useState<IPetResponse>();
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);

  const cancelAdoptMutation = useMutation<
    IApiResponse<string>,
    { id: string; action: string }
  >(actOnAdoptRequest, {
    onSuccess: () => {
      setAlertShow(true);
      setAlertFailed(false);
      setAlertMessage('Huỷ đơn nhận nuôi thành công');
    },
    onError: () => {
      setAlertShow(true);
      setAlertMessage('Huỷ đơn nhận nuôi thất bại');
      setAlertFailed(true);
    },
  });

  const rejectAdoptMutation = useMutation<
    IApiResponse<string>,
    { id: string; action: string }
  >(actOnAdoptRequest, {
    onSuccess: () => {
      setAlertShow(true);
      setAlertFailed(false);
      setAlertMessage('Từ chối đơn nhận nuôi thành công');
    },
    onError: () => {
      setAlertShow(true);
      setAlertMessage('Từ chối đơn nhận nuôi thất bại');
      setAlertFailed(true);
    },
  });

  const acceptAdoptMutation = useMutation<
    IApiResponse<string>,
    { id: string; action: string }
  >(actOnAdoptRequest, {
    onSuccess: () => {
      setAlertShow(true);
      setAlertFailed(false);
      setAlertMessage('Chấp nhận đơn nhận nuôi thành công');
    },
    onError: () => {
      setAlertShow(true);
      setAlertMessage('Chấp nhận đơn nhận nuôi thất bại');
      setAlertFailed(true);
    },
  });

  const adoptFormInfoQuery = useQuery<IApiResponse<IAdoptFormInfo>>(
    [QUERY_KEYS.GET_ADOPT_FORM_INFO],
    () => getAdoptFormInfo(id),
    {
      onSuccess: (res) => {
        setFormInfo(res.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const petCardQuery = useQuery<IApiResponse<IPetDetailResponse>>(
    [QUERY_KEYS.GET_PET_DETAIL, formInfo],
    () => formInfo && getPetDetail({ id: formInfo.petId }),
    {
      onSuccess: (res) => {
        setPetInfo({
          id: res.data.data.id,
          name: res.data.data.name,
          age: res.data.data.age,
          breed: res.data.data.breed,
          sex: res.data.data.sex,
          image: res.data.data.images[0],
          isOrgOwned: res.data.data.isOrgOwned,
        });
      },
      refetchOnWindowFocus: false,
      enabled: !!formInfo,
    }
  );

  const handleCancelAdopt = () => {
    cancelAdoptMutation.mutate({ id: id, action: ADOPT_ACTION.CANCEL });
  };

  const handleRejectAdopt = () => {
    rejectAdoptMutation.mutate({ id: id, action: ADOPT_ACTION.REJECT });
  };

  const handleAcceptAdopt = () => {
    acceptAdoptMutation.mutate({ id: id, action: ADOPT_ACTION.ACCEPT });
  };

  return (
    <div className="container p-5 mx-auto">
      <div className="w-full rounded-2xl bg-yellow-100 p-5">
        <h2 className="font-bold mb-2">Đơn nhận nuôi thú cưng</h2>
        {adoptFormInfoQuery.isLoading && <div>Loading...</div>}
        {!adoptFormInfoQuery.isLoading && formInfo && (
          <div>
            <div
              className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
              style={{ maxHeight: '500px', maxWidth: '600px' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Tên người nhận nuôi */}
                {petInfo && <PetCard {...petInfo} />}
                {/* Số điện thoại */}

                <div className="flex flex-col space-y-2">
                  {type === 'Incoming' && (
                    <div className="flex flex-col space-y-2">
                      <div className="text-md font-medium">
                        Người nhận nuôi:{' '}
                        <span className="text-sm font-normal">
                          {formInfo.adopterName}
                        </span>
                      </div>
                      <div className="text-md font-medium">
                        Số điện thoại:{' '}
                        <span className="text-sm font-normal">
                          {formInfo.adopterPhone}
                        </span>
                      </div>
                      <div className="text-md font-medium">
                        Email:{' '}
                        <span className="text-sm font-normal">
                          {formInfo.adopterEmail}
                        </span>
                      </div>
                      <div className="text-md font-medium">
                        Đã từng nuôi thú cưng:{' '}
                        <span className="text-sm font-normal">
                          {formInfo.isOwnerBefore ? 'Có' : 'Không'}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="text-md font-medium">
                    Ngày tạo:{' '}
                    <span className="text-sm font-normal">
                      {new Date(formInfo.isCreatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="text-md font-medium">
                    Tình trạng:{' '}
                    <span className="text-sm font-normal">
                      {formInfo.status === 0 && 'Đang chờ'}
                      {formInfo.status === 1 && 'Đã xác nhận'}
                      {formInfo.status === 2 && 'Đã từ chối'}
                      {formInfo.status === 4 && 'Hoàn thành'}
                    </span>
                  </div>

                  <div className="text-md font-medium">
                    Loại nhà ở:{' '}
                    <span className="text-sm font-normal">
                      {formInfo.status === HOUSE_TYPE.Apartment && 'Chung cư'}
                      {formInfo.status === HOUSE_TYPE.Dormitory && 'Ký túc xá'}
                      {formInfo.status === HOUSE_TYPE.House && 'Nhà riêng'}
                      {formInfo.status === HOUSE_TYPE.Shelter &&
                        'Trại thú cưng'}
                      {formInfo.status === HOUSE_TYPE.Other && 'Khác'}
                    </span>
                  </div>
                  <div className="text-md font-medium">
                    Thời gian đón thú cưng:{' '}
                    <span className="text-sm font-normal">
                      {formInfo.delayDuration ===
                        ADOPT_DELAY_DURATION.Immediately && 'Ngay lập tức'}
                      {formInfo.delayDuration ===
                        ADOPT_DELAY_DURATION.FewDays && 'Vài ngày'}
                      {formInfo.delayDuration ===
                        ADOPT_DELAY_DURATION.OneWeek && '1 tuần'}
                      {formInfo.delayDuration === ADOPT_DELAY_DURATION.Other &&
                        'Chưa rõ'}
                    </span>
                  </div>
                  <div className="text-md font-medium">
                    Địa chỉ:{' '}
                    <span className="text-sm font-normal w-full text-wrap">
                      {formInfo.address}
                    </span>
                  </div>
                  <div className="text-md font-medium">
                    Lời nhắn:{' '}
                    <span className="text-sm font-normal">
                      {formInfo.message}
                    </span>
                  </div>
                  <Link
                    href={`/user/${formInfo.adopterId}`}
                    className="flex w-full justify-end"
                  >
                    <div className="flex items-center w-fit border border-black p-3 rounded-lg font-bold shadow-md bg-yellow-300 hover:bg-yellow-400">
                      <FaRegUserCircle />
                      <div> Xem trang cá nhân</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            {type === 'Sent' && (
              <div className="flex justify-center">
                {formInfo.status === 0 && (
                  <button
                    className="bg-red-500 text-white px-5 py-2 rounded-lg"
                    onClick={handleCancelAdopt}
                  >
                    Huỷ đơn nhận nuôi
                  </button>
                )}
                {formInfo.status === 4 && (
                  <button
                    className="bg-yellow-500 text-black px-5 py-2 rounded-lg"
                    onClick={handleCancelAdopt}
                  >
                    Hoàn thành
                  </button>
                )}
              </div>
            )}
            {type === 'Incoming' && formInfo.status === 0 && (
              <div className="flex justify-center space-x-2">
                <button
                  className="bg-red-300 hover:bg-red-400 text-white px-5 py-2 rounded-lg"
                  onClick={handleRejectAdopt}
                >
                  Không đồng ý
                </button>

                <button
                  className="bg-yellow-300 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg"
                  onClick={handleAcceptAdopt}
                >
                  Đồng ý
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Alert
        failed={alertFailed}
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
      />
    </div>
  );
}
