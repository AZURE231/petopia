import Popup from 'reactjs-popup';
import PetAdoptionInfo from './PetAdoptionInfo';
import { IAdoptCardResponse } from '@/src/interfaces/adopt';
import { useState } from 'react';
import { ADOPT_ACTION, ADOPT_STATUS } from '@/src/utils/constants';

interface IAdoptionCard {
  card: IAdoptCardResponse;
  refetch: () => void;
  type: string;
}

export const AdoptionCard = (props: IAdoptionCard) => {
  const { card, refetch, type } = props;
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div
        className={`flex justify-between w-full p-3  ${card.isSeen ? 'bg-white' : 'bg-gray-100'
          } border border-gray-200 rounded-lg shadow hover:bg-gray-200 cursor-pointer`}
        onClick={() => setShow(true)}
      >
        <div className="w-2/3">
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
            {'Đơn nhận nuôi '}
            <span className="text-2xl font-bold">{card.petName}</span>
            {type === 'Incoming' && (
              <span className="text-2xl font-bold">
                {' - ' + card.adopterName}
              </span>
            )}
          </h5>
          <p className="font-normal text-gray-700">
            {new Date(card.lastUpdatedAt).toLocaleDateString() +
              ' ' +
              new Date(card.lastUpdatedAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="w-1/3">
          {card.status === ADOPT_STATUS.Accepted && (
            <div className="bg-green-300 font-bold w-full text-center p-3 rounded-lg flex items-center justify-center">
              Đã xác nhận
            </div>
          )}
          {card.status === ADOPT_STATUS.Rejected && (
            <div className="bg-red-300 font-bold w-full text-center p-3 rounded-lg flex items-center justify-center">
              Đã từ chối
            </div>
          )}
          {card.status === ADOPT_STATUS.Pending && (
            <div className="bg-yellow-300 font-bold w-full text-center p-3 rounded-lg flex items-center justify-center">
              Đang chờ
            </div>
          )}
          {card.status === ADOPT_STATUS.Adopted && (
            <div className="bg-green-400 font-bold w-full text-center p-3 rounded-lg flex items-center justify-center">
              Hoàn thành
            </div>
          )}
          {card.status === ADOPT_STATUS.Cancel && (
            <div className="bg-green-400 font-bold w-full text-center p-3 rounded-lg flex items-center justify-center">
              Đã huỷ
            </div>
          )}
        </div>
      </div>
      <Popup
        key={card.id}
        modal
        open={show}
        onClose={() => {
          refetch();
          setShow(false);
        }}
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <PetAdoptionInfo
          id={card.id}
          type={type}
          close={() => setShow(false)}
        />
      </Popup>
    </>
  );
};
