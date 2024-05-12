import { IAdoptCardResponse } from '@/src/interfaces/adopt';
import { IApiResponse } from '@/src/interfaces/common';
import { getAdoptCard } from '@/src/services/adopt.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import { Dispatch, SetStateAction, useState } from 'react';
import Popup from 'reactjs-popup';
import PetAdoptionInfo from './PetAdoptionInfo';
import { AdoptionCard } from './AdoptionCard';

export default function AdoptionCardList({
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
        {
          !getAdoptCardQuery.isLoading &&
          adoptCard.length > 0 &&
          (<div className="flex flex-col gap-2">
            {
              adoptCard.map((card) => (
                <AdoptionCard
                  key={card.id}
                  card={card}
                  refetch={handleIsSeen}
                  type={type}
                />
              ))
            }
          </div>)
        }
      </div>
    </div>
  );
}
