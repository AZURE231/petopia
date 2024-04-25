'use client';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useQuery } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { QUERY_KEYS, STATIC_URLS, USER_ROLE } from '../../utils/constants';
import { QueryProvider } from '../general/QueryProvider';
import UserUpdateForm from './UserUpdateForm';
import { getPreUpgrade, getUserInfo } from '@/src/services/user.api';
import Link from 'next/link';
import UserSkeleton from '../general/UserSkeleton';
import TabbedTable from './TabbedTable';
import Popup from 'reactjs-popup';
import { UserUpgradeForm } from './UserUpgradeForm';
import { Alert } from '../general/Alert';
import { AvatarBlock } from './AvatarBlock';
import { NameRoleBlock } from './NameRoleBlock';
import { BasicInfoBlock } from './BasicInfoBlock';
import { IUserInfoReponse } from '@/src/interfaces/user';
import { OrganizationInfoBlock } from './OrganizationInfoBlock';

export const UserInformation = QueryProvider(() => {
  // STATES
  const [isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfoReponse>();
  const [image, setImage] = useState<string>(STATIC_URLS.NO_AVATAR);
  const [isUpgraded, setIsUpgraded] = useState<boolean>(false);
  const [upgradeClicked, setUpgradeClicked] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // HANDLERS
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  useQuery<IApiResponse<boolean>>(QUERY_KEYS.GET_PRE_UPGRADE, getPreUpgrade, {
    onSuccess: (res) => {
      setIsUpgraded(res.data.data);
    },
    refetchOnWindowFocus: false,
  });

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

  return (
    <div>
      {getUserQuery.isLoading && <UserSkeleton />}

      {!getUserQuery.isLoading && userInfo && (
        <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-36">
          <div className="flex relative -mb-10">
            <AvatarBlock
              image={image}
              setImage={(url: string) => setImage(url)}
            />
            <NameRoleBlock
              name={'temp'}
              role={userInfo.role}
              type={userInfo.attributes.type}
            />
            <button onClick={handleEdit}>
              <FaRegEdit className="text-2xl absolute bottom-15 right-0 md:right-10" />
            </button>
          </div>

          <BasicInfoBlock
            email={userInfo.email}
            phone={userInfo.phone}
            address={userInfo.address}
          />

          <OrganizationInfoBlock
            entityName={userInfo.attributes.entityName}
            type={userInfo.attributes.type}
            description={userInfo.attributes.description}
            taxCode={userInfo.attributes.taxCode}
            website={userInfo.attributes.website}
            show={userInfo.role === USER_ROLE.ORGANIZATION}
          />

          <div className="mt-5 flex justify-end gap-3">
            {userInfo.role === 0 && (
              <div>
                <button
                  className="w-fit text-black border border-black hover:bg-gray-100 focus:ring-4 focus:outline-none
                          focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                  onClick={() => {
                    if (!isUpgraded) {
                      setUpgradeClicked(true);
                    } else {
                      setShowAlert(true);
                    }
                  }}
                >
                  Trở thành cộng tác viên
                </button>
                <Popup
                  modal
                  open={upgradeClicked}
                  overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
                >
                  <UserUpgradeForm />
                </Popup>
              </div>
            )}
            <Link
              href={'user/change-password'}
              className="w-fit text-black border border-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none
                        focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Cập nhật mật khẩu
            </Link>
          </div>

          <UserUpdateForm userInfo={userInfo!} show={isEdit} />
        </div>
      )}
      <TabbedTable userInfo={userInfo} />
      <Alert
        failed={true}
        message={'Bạn đã gửi yêu cầu cộng tác viên rồi!'}
        show={showAlert}
        setShow={setShowAlert}
      />
    </div>
  );
});
