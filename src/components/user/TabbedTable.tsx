import { MdPets } from 'react-icons/md';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { GrSend } from 'react-icons/gr';
import { useState } from 'react';
import { IUserInfoReponse } from '@/src/interfaces/user';
import { PetCard } from '../search/PetCard';
import AdoptionCard from '../adopt/AdoptionCard';
import { IPetResponse } from '@/src/interfaces/pet';
import { useForm } from 'react-hook-form';
import { IApiResponse, IPaginationModel } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { getPetsByUser } from '@/src/services/pet.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import Pagination from '../general/Pagination';
import { countNotify } from '@/src/services/adopt.api';
import { NotifySortBlock } from '../adopt/NotifySortBlock';

export default function TabbedTable({
  userInfo,
}: {
  userInfo?: IUserInfoReponse;
}) {
  // CONSTANTS
  const activeTab =
    'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';
  const inactiveTab =
    'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300  group';
  const activeIcon = 'w-4 h-4 me-2 text-blue-600 group-hover:text-blue-700';
  const inactiveIcon = 'w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500';
  const PAGE_SIZE = 3;

  // STATES
  const [tab, setTab] = useState(0);
  const [pets, setPets] = useState<IPetResponse[]>([]);
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [orderByIncoming, setOrderByIncoming] = useState<
    'Rejected' | 'Waiting' | 'Accepted' | 'All'
  >('All');
  const [orderBySent, setOrderBySent] = useState<
    'Rejected' | 'Waiting' | 'Accepted' | 'All'
  >('All');

  // FORMS
  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    },
  });

  // QUERIES
  useQuery<IApiResponse<number>>(
    [QUERY_KEYS.GET_NOTIFICATION_COUNT],
    countNotify,
    {
      onSuccess: (res) => {
        setNotifyCount(res.data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  const getPetsQuery = useQuery<IApiResponse<IPetResponse[]>>(
    [QUERY_KEYS.GET_PETS, userInfo, paginationForm.watch('pageIndex')],
    () =>
      userInfo &&
      getPetsByUser({
        pageIndex: paginationForm.getValues('pageIndex'),
        pageSize: PAGE_SIZE,
        orderBy: '',
        filter: userInfo.id,
      }),
    {
      onSuccess: (res) => {
        setPets(res.data.data);
        paginationForm.setValue('pageNumber', res.data.pageNumber!);
      },
      refetchOnWindowFocus: false,
      enabled: !!userInfo,
    }
  );

  return (
    <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-10">
      <div className="border-b border-gray-200 ">
        <ul className="flex flex-row -mb-px text-sm font-medium text-center text-gray-500 ">
          <li className="me-2">
            <button
              className={`${tab === 0 ? activeTab : inactiveTab}`}
              onClick={() => setTab(0)}
            >
              <MdPets className={`${tab === 0 ? activeIcon : inactiveIcon}`} />
              Thú cưng{' '}
              <span className="hidden md:inline-block ml-1"> Của bạn</span>
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${tab === 1 ? activeTab : inactiveTab}`}
              onClick={() => setTab(1)}
            >
              <GrSend className={`${tab === 1 ? activeIcon : inactiveIcon}`} />
              <span className="hidden md:inline-block mr-1">Yêu cầu</span> Đã
              gửi
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${tab === 2 ? activeTab : inactiveTab} relative`}
              onClick={() => setTab(2)}
            >
              <RiUserReceived2Fill
                className={`${tab === 2 ? activeIcon : inactiveIcon}`}
              />
              {notifyCount > 0 && (
                <div>
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2  bg-red-600 rounded-full">
                    {notifyCount > 9 ? '9+' : notifyCount}
                  </span>
                </div>
              )}
              <span className="hidden md:inline-block mr-1">Yêu cầu</span> Nhận
              được
            </button>
          </li>
        </ul>
      </div>

      <div className="p-5">
        {tab === 0 && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {pets.map((item) => (
                <PetCard isEditable={true} key={item.id} {...item} simple />
              ))}
            </div>
            <div className="flex items-center justify-center mt-5">
              <Pagination
                paginationForm={paginationForm}
                disable={getPetsQuery.isFetching}
                show={
                  pets.length !== 0 &&
                  paginationForm.getValues('pageNumber') != 1
                }
              />
            </div>
          </>
        )}
        {tab === 1 && (
          <div>
            <NotifySortBlock setFilter={setOrderBySent} />
            <AdoptionCard type="Sent" filter={orderBySent} />
          </div>
        )}
        {tab === 2 && (
          <div>
            <NotifySortBlock setFilter={setOrderByIncoming} />
            <AdoptionCard
              type="Incoming"
              notifyCount={setNotifyCount}
              filter={orderByIncoming}
            />
          </div>
        )}
      </div>
    </div>
  );
}
