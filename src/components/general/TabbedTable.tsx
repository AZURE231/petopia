import { MdPets } from 'react-icons/md';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { GrSend } from 'react-icons/gr';
import { useState } from 'react';
import { IUserInfo } from '@/src/interfaces/user';
import ListCards from '../user/ListCards';
import { PetCard } from '../search/PetCard';
import AdoptionCard from '../adopt/AdoptionCard';
import AdoptionRequestCard from '../adopt/AdoptionRequestCard';

export default function TabbedTable({ userInfo }: { userInfo?: IUserInfo }) {
  const [tab, setTab] = useState(0);
  const activeTab =
    'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active';
  const inactiveTab =
    'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300  group';
  const activeIcon = 'w-4 h-4 me-2 text-blue-600 group-hover:text-blue-700';
  const inactiveIcon = 'w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500';
  return (
    <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-10">
      <div className="border-b border-gray-200 ">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 ">
          <li className="me-2">
            <button
              className={`${tab === 0 ? activeTab : inactiveTab}`}
              onClick={() => setTab(0)}
            >
              <MdPets className={`${tab === 0 ? activeIcon : inactiveIcon}`} />
              Thú cưng của bạn
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${tab === 1 ? activeTab : inactiveTab}`}
              onClick={() => setTab(1)}
            >
              <GrSend className={`${tab === 1 ? activeIcon : inactiveIcon}`} />
              Yêu cầu đã gửi
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${tab === 2 ? activeTab : inactiveTab}`}
              onClick={() => setTab(2)}
            >
              <RiUserReceived2Fill
                className={`${tab === 2 ? activeIcon : inactiveIcon}`}
              />
              Yêu cầu nhận được
            </button>
          </li>
        </ul>
      </div>

      <div className="p-5">
        {tab === 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {userInfo?.pets?.map((item) => (
              <PetCard isEditable={true} key={item.id} {...item} />
            ))}
          </div>
        )}
        {tab === 1 && <AdoptionCard type="Sent" />}
        {tab === 2 && <AdoptionCard type="Incoming" />}
      </div>
    </div>
  );
}
