import { IAdoptCardResponse } from '@/src/interfaces/adopt';
import { IApiResponse } from '@/src/interfaces/common';
import { getAdoptCard } from '@/src/services/adopt.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import { set } from 'mobx';
import { useState } from 'react';
import Popup from 'reactjs-popup';

export default function AdoptionCard() {
  const [adoptCard, setAdoptCard] = useState<IAdoptCardResponse[]>([]);
  useQuery<IApiResponse<IAdoptCardResponse[]>>(
    [QUERY_KEYS.GET_ADOPT_CARD],
    getAdoptCard,
    {
      onSuccess: (res) => {
        setAdoptCard(res.data.data);
      },

      refetchOnWindowFocus: false,
    }
  );
  return (
    <div>
      <div>
        {getAdoptCardQuery.isLoading && <div>Loading...</div>}
        {!getAdoptCardQuery.isLoading &&
          adoptCard.map((card) => (
            <Popup
              key={card.id}
              modal
              overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
              trigger={
                <div
                  className={`flex justify-between w-full p-3  ${
                    card.isSeen ? 'bg-white' : 'bg-gray-100'
                  } border border-gray-200 rounded-lg shadow hover:bg-gray-200 `}
                >
                  <div>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {card.name}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {new Date(card.lastUpdatedAt).toLocaleDateString() +
                        ' ' +
                        new Date(card.lastUpdatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="bg-yellow-300 font-bold w-fit p-3 rounded-lg flex items-center">
                    Pending
                  </div>
                </div>
              }
            >
              <div>Hahah</div>
            </Popup>
          ))}
      </div>
    </div>
  );
}
