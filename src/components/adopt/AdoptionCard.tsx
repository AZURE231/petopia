import { IAdoptCardResponse } from '@/src/interfaces/adopt';
import { IApiResponse } from '@/src/interfaces/common';
import { getAdoptCard } from '@/src/services/adopt.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import Popup from 'reactjs-popup';
import PetAdoptionInfo from './PetAdoptionInfo';

export default function AdoptionCard({
  type,
  notifyCount,
  filter,
}: {
  type: string;
  notifyCount?: Dispatch<SetStateAction<number>>;
  filter?: string;
}) {
  //STATES
  const [adoptCard, setAdoptCard] = useState<IAdoptCardResponse[]>([]);

  //HANDLERS
  const handleIsSeen = () => {
    getAdoptCardQuery.refetch();
  };

  //QUERIES
  const getAdoptCardQuery = useQuery<IApiResponse<IAdoptCardResponse[]>>(
    [QUERY_KEYS.GET_ADOPT_CARD, filter],
    () => getAdoptCard(type),
    {
      onSuccess: (res) => {
        if (filter === 'Accepted') {
          res.data.data = res.data.data.filter((card) => card.status === 1);
        }
        if (filter === 'Waiting') {
          res.data.data = res.data.data.filter((card) => card.status === 0);
        }
        if (filter === 'Rejected') {
          res.data.data = res.data.data.filter((card) => card.status === 2);
        }
        setAdoptCard(res.data.data);
        if (type == 'Incoming') {
          notifyCount &&
            notifyCount(res.data.data.filter((card) => !card.isSeen).length);
        }
      },
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div>
      <div>
        {getAdoptCardQuery.isLoading && <div>Loading...</div>}
        {!getAdoptCardQuery.isLoading && (
          <div className="flex flex-col gap-2">
            {adoptCard.map((card) => (
              <Popup
                key={card.id}
                modal
                onClose={handleIsSeen}
                overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                trigger={
                  <div
                    className={`flex justify-between w-full p-3  ${
                      card.isSeen ? 'bg-white' : 'bg-gray-100'
                    } border border-gray-200 rounded-lg shadow hover:bg-gray-200 `}
                  >
                    <div>
                      <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">
                        {'Đơn nhận nuôi '}
                        <span className="text-2xl font-bold">
                          {card.petName}
                        </span>
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
                    {card.status === 1 && (
                      <div className="bg-green-300 font-bold w-fit p-3 rounded-lg flex items-center">
                        Đã xác nhận
                      </div>
                    )}
                    {card.status === 2 && (
                      <div className="bg-red-300 font-bold w-fit p-3 rounded-lg flex items-center">
                        Đã từ chối
                      </div>
                    )}
                    {card.status === 0 && (
                      <div className="bg-yellow-300 font-bold w-fit p-3 rounded-lg flex items-center">
                        Đang chờ
                      </div>
                    )}
                    {card.status === 4 && (
                      <div className="bg-green-400 font-bold w-fit p-3 rounded-lg flex items-center">
                        Hoàn thành
                      </div>
                    )}
                  </div>
                }
              >
                <PetAdoptionInfo id={card.id} type={type} />
              </Popup>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
