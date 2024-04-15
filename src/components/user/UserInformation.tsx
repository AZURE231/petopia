'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useMutation, useQuery } from '../../utils/hooks';
import { IApiResponse } from '../../interfaces/common';
import { IUserInfo } from '../../interfaces/user';
import { QUERY_KEYS, STATIC_URLS } from '../../utils/constants';
import { QueryProvider } from '../general/QueryProvider';
import ListCards from './ListCards';
import UserUpdateForm from './UserUpdateForm';
import { getUserInfo, updateAvatar } from '@/src/services/user.api';
import { uploadImage } from '@/src/helpers/uploadImage';
import Link from 'next/link';
import UserSkeleton from '../general/UserSkeleton';
import Popup from 'reactjs-popup';
import { UserUpgradeForm } from './UserUpgradeForm';

export const UserInformation = QueryProvider(() => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [image, setImage] = useState<string>(STATIC_URLS.NO_AVATAR);
  const [file, setFile] = useState<File | null>(null);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEditAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const imageUrl = await uploadImage(formData);
      updateAvatarMutation.mutateAsync(imageUrl?.data.data.url!);
    }
  };

  const updateAvatarMutation = useMutation<IApiResponse<string>, string>(
    updateAvatar
  );

  const getUserQuery = useQuery<IApiResponse<IUserInfo>>(
    [QUERY_KEYS.GET_GOOGLE_RECAPTCHA_TOKEN],
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
            <div
              className="relative h-52 w-52 bottom-20"
              onMouseEnter={() => setIsEditAvatar(true)}
              onMouseLeave={() => setIsEditAvatar(false)}
            >
              <Image
                src={image}
                alt="Picture of the author"
                fill // required
                objectFit="cover" // change to suit your needs
                className="rounded-full"
                quality={50}
              />

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {isEditAvatar && (
                  <div className="flex items-center justify-center w-32 bg-gray-50 rounded-lg">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col w-full bg-gray-50 items-center justify-center h-8 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className=" text-sm text-gray-500 ">
                          <span className="font-semibold">Chỉnh sửa</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        multiple
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        className="hidden"
                        onChange={handleEditAvatar}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h1 className="font-bold text-5xl ml-5">
                {userInfo &&
                  userInfo.attributes.firstName +
                  ' ' +
                  userInfo.attributes.lastName}
              </h1>
              {userInfo?.userRole == 1 && <div>System admin</div>}
              {userInfo?.userRole == 2 && <div>Organization</div>}
            </div>

            <button onClick={handleEdit}>
              <FaRegEdit className="text-2xl absolute bottom-15 right-0 md:right-10" />
            </button>
          </div>

          <div className="md:px-10">
            <div className="flex mb-2">
              <div className="block text-gray-700 text-lg font-bold">
                Email:
              </div>
              <div className="text-lg ml-2">
                {userInfo?.email ? userInfo?.email : 'Chưa rõ'}
              </div>
            </div>
            <div className="flex mb-2">
              <div className="block text-gray-700 text-lg font-bold">
                Số điện thoại:
              </div>
              <div className="text-lg ml-2">
                {userInfo?.phone ? userInfo?.phone : 'Chưa rõ'}
              </div>
            </div>
            <div className="flex">
              <div className="block text-gray-700 text-lg font-bold">
                Địa chỉ:
              </div>
              <div className="text-lg ml-2">
                {userInfo?.address ? userInfo?.address : 'Chưa rõ'}
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-3">
            <Popup
              modal
              overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
              trigger={
                <button
                  className="w-fit text-black border border-black hover:bg-gray-100 focus:ring-4 focus:outline-none
                          focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                >
                  Trở thành cộng tác viên
                </button>
              }
            >
              <UserUpgradeForm />
            </Popup>
            <Link
              href={'user/change-password'}
              className="w-fit text-black border border-black bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:outline-none
                        focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Cập nhật mật khẩu
            </Link>
          </div>
          {userInfo && (
            <UserUpdateForm
              userInfo={userInfo!}
              isEdit={isEdit}
              image={file}
              setUserInfo={setUserInfo}
            />
          )}
        </div>
      )}
      <ListCards
        title="Thú cưng của bạn"
        isEditable={true}
        data={userInfo?.pets!}
      />
    </div>
  );
});
