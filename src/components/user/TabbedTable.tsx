import { MdPets } from 'react-icons/md';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { GrSend } from 'react-icons/gr';
import { useState } from 'react';
import { IUserInfoReponse } from '@/src/interfaces/user';
import { PetCard } from '../search/PetCard';
import AdoptionCardList from '../adopt/AdoptionCardList';
import { IPetResponse } from '@/src/interfaces/pet';
import { useForm } from 'react-hook-form';
import { IApiResponse, IPaginationModel } from '@/src/interfaces/common';
import { useQuery } from '@/src/utils/hooks';
import { getPetsByUser } from '@/src/services/pet.api';
import { QUERY_KEYS, USER_ROLE } from '@/src/utils/constants';
import Pagination from '../general/Pagination';
import { countNotify } from '@/src/services/adopt.api';
import { NotifySortBlock } from '../adopt/NotifySortBlock';
import { IBlogResponse } from '@/src/interfaces/blog';
import { getBlogsByUser } from '@/src/services/blog.api';
import BlogCard from '../blog/BlogCard';
import BlogCreateCard from '../blog/BlogCreateCard';

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
  const PAGE_SIZE = 5;
  const TAB = {
    PET: 0,
    BLOG: 1,
    IMCOMMING: 3,
    SENT: 2,
  };

  // STATES
  const [tab, setTab] = useState(TAB.PET);
  const [pets, setPets] = useState<IPetResponse[]>([]);
  const [blogs, setBlogs] = useState<IBlogResponse[]>([]);
  const [notifyCount, setNotifyCount] = useState<number>(0);
  const [orderByIncoming, setOrderByIncoming] = useState<
    'Rejected' | 'Waiting' | 'Accepted' | 'All'
  >('All');
  const [orderBySent, setOrderBySent] = useState<
    'Rejected' | 'Waiting' | 'Accepted' | 'All'
  >('All');

  // FORMS
  const paginationFormPet = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    },
  });

  const paginationFormBlog = useForm<IPaginationModel>({
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
    [QUERY_KEYS.GET_PETS, userInfo, paginationFormPet.watch('pageIndex')],
    () =>
      userInfo &&
      getPetsByUser({
        pageIndex: paginationFormPet.getValues('pageIndex'),
        pageSize: PAGE_SIZE,
        orderBy: '',
        filter: userInfo.id,
      }),
    {
      onSuccess: (res) => {
        setPets(res.data.data);
        paginationFormPet.setValue('pageNumber', res.data.pageNumber!);
      },
      refetchOnWindowFocus: false,
      enabled: !!userInfo,
    }
  );

  const getUserBlogsQuery = useQuery<IApiResponse<IBlogResponse[]>>(
    [
      QUERY_KEYS.GET_BLOGS_USER,
      userInfo,
      paginationFormBlog.watch('pageIndex'),
      tab,
    ],
    () =>
      userInfo &&
      getBlogsByUser({
        pageIndex: paginationFormBlog.getValues('pageIndex'),
        pageSize: PAGE_SIZE,
        orderBy: '',
      }),
    {
      onSuccess: (res) => {
        setBlogs(res.data.data);
        paginationFormBlog.setValue('pageNumber', res.data.pageNumber!);
      },
      refetchOnWindowFocus: false,
      enabled:
        !!userInfo &&
        userInfo.role === USER_ROLE.ORGANIZATION &&
        tab === TAB.BLOG,
    }
  );

  return (
    <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-10">
      <div className="border-b border-gray-200 ">
        <ul className="flex flex-row -mb-px text-sm font-medium text-center text-gray-500 ">
          <li className="me-2">
            <button
              className={`${tab === TAB.PET ? activeTab : inactiveTab}`}
              onClick={() => setTab(TAB.PET)}
            >
              <MdPets
                className={`${tab === TAB.PET ? activeIcon : inactiveIcon}`}
              />
              Thú cưng{' '}
              <span className="hidden md:inline-block ml-1"> Của bạn</span>
            </button>
          </li>
          {userInfo?.role === USER_ROLE.ORGANIZATION && (
            <li className="me-2">
              <button
              test-id="blog-tab"
                className={`${
                  tab === TAB.BLOG ? activeTab : inactiveTab
                } relative`}
                onClick={() => setTab(TAB.BLOG)}
              >
                <RiUserReceived2Fill
                  className={`${tab === TAB.BLOG ? activeIcon : inactiveIcon}`}
                />
                Bài viết
                <span className="hidden md:inline-block ml-1">Của bạn</span>
              </button>
            </li>
          )}
          <li className="me-2">
            <button
              className={`${tab === TAB.SENT ? activeTab : inactiveTab}`}
              onClick={() => setTab(TAB.SENT)}
            >
              <GrSend
                className={`${tab === TAB.SENT ? activeIcon : inactiveIcon}`}
              />
              <span className="hidden md:inline-block mr-1">Yêu cầu</span> Đã
              gửi
            </button>
          </li>
          <li className="me-2">
            <button
              className={`${
                tab === TAB.IMCOMMING ? activeTab : inactiveTab
              } relative`}
              onClick={() => setTab(TAB.IMCOMMING)}
            >
              <RiUserReceived2Fill
                className={`${
                  tab === TAB.IMCOMMING ? activeIcon : inactiveIcon
                }`}
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
        {tab === TAB.PET && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {!getPetsQuery.isLoading &&
                pets.length > 0 &&
                pets.map((item) => (
                  <PetCard
                    isEditable={true}
                    key={item.id}
                    simple
                    id={item.id}
                    name={item.name}
                    breed={item.breed}
                    sex={item.sex}
                    age={item.age}
                    image={item.image}
                    isOrgOwned={item.isOrgOwned}
                  />
                ))}
            </div>
            <div className="flex items-center justify-center mt-5">
              <Pagination
                paginationForm={paginationFormPet}
                disable={getPetsQuery.isFetching}
                show={
                  pets.length !== 0 &&
                  paginationFormPet.getValues('pageNumber') != 1
                }
              />
            </div>
          </>
        )}
        {tab === TAB.BLOG && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              <BlogCreateCard />
              {!getUserBlogsQuery.isLoading &&
                blogs.length > 0 &&
                blogs.map((item, index) => (
                  <BlogCard
                    testId={`blog-card-${index}`}
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    image={item.image}
                    category={item.category}
                    isEditable={true}
                    query={getUserBlogsQuery}
                  />
                ))}
            </div>
            <div className="flex items-center justify-center mt-5">
              <Pagination
                paginationForm={paginationFormBlog}
                disable={getUserBlogsQuery.isFetching}
                show={
                  blogs.length !== 0 &&
                  paginationFormBlog.getValues('pageNumber') != 1
                }
              />
            </div>
          </>
        )}
        {tab === TAB.SENT && (
          <div>
            <NotifySortBlock setFilter={setOrderBySent} />
            <AdoptionCardList type="Sent" filter={orderBySent} />
          </div>
        )}
        {tab === TAB.IMCOMMING && (
          <div>
            <NotifySortBlock setFilter={setOrderByIncoming} />
            <AdoptionCardList
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
