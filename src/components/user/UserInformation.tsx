'use client';
import { useEffect, useState } from 'react';
import { useQuery } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { QUERY_KEYS, STATIC_URLS, USER_ROLE } from '../../utils/constants';
import { QueryProvider } from '../general/QueryProvider';
import UserUpdateForm from './UserUpdateForm';
import { getUserInfo } from '@/src/services/user.api';
import UserSkeleton from '../general/UserSkeleton';
import TabbedTable from './TabbedTable';
import { AvatarBlock } from './AvatarBlock';
import { NameRoleBlock } from './NameRoleBlock';
import { BasicInfoBlock } from './BasicInfoBlock';
import { IUserInfoReponse } from '@/src/interfaces/user';
import Testimonials from '../general/Testimonials';
import { ActionsBlock } from './ActionsBlock';

export const UserInformation = QueryProvider(() => {
  // STATES
  const [showEdit, setShowEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfoReponse>();
  const [image, setImage] = useState<string>(STATIC_URLS.NO_AVATAR);
  const [userName, setUserName] = useState<string>('');

  // QUERIES
  const getUserQuery = useQuery<IApiResponse<IUserInfoReponse>>(
    [QUERY_KEYS.GET_CURRENT_USER],
    getUserInfo,
    {
      onSuccess: (res) => {
        setUserInfo(res.data.data);
        setImage(res.data.data.image);
      },
      refetchOnWindowFocus: false,
    }
  );

  // EFFECTS
  useEffect(() => {
    if (userInfo?.role === USER_ROLE.ORGANIZATION) {
      setUserName(userInfo.attributes.organizationName);
    } else {
      userInfo &&
        setUserName(
          userInfo.attributes.firstName + ' ' + userInfo.attributes.lastName
        );
    }
  }, [userInfo]);

  return (
    <div>
      {getUserQuery.isLoading && <UserSkeleton />}

      {!getUserQuery.isLoading && userInfo && (
        <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-36">
          <div className="flex relative mb-5 md:-mb-10">
            <AvatarBlock
              image={image}
              setImage={(url: string) => setImage(url)}
            />
            <NameRoleBlock
              name={userName}
              role={userInfo.role}
              type={userInfo.attributes.type}
              website={userInfo.attributes.website}
            />
          </div>

          <Testimonials
            description={userInfo.attributes.description}
            show={userInfo.role === USER_ROLE.ORGANIZATION}
          />

          <BasicInfoBlock
            email={userInfo.email}
            phone={userInfo.phone}
            address={userInfo.address}
          />

          <ActionsBlock
            showUpgradeButton={userInfo.role === USER_ROLE.STANDARD_USER}
            setShowEdit={setShowEdit}
          />

          <UserUpdateForm
            userInfo={userInfo!}
            show={showEdit}
            onSuccess={() => getUserQuery.refetch()}
          />
        </div>
      )}
      <TabbedTable userInfo={userInfo} />
    </div>
  );
});
