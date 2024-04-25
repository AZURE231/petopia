import { uploadImage } from '@/src/helpers/uploadImage';
import { IApiResponse } from '@/src/interfaces/common';
import { updateAvatar } from '@/src/services/user.api';
import { useMutation } from '@/src/utils/hooks';
import Image from 'next/image';
import { useState } from 'react';

interface IAvatarBlock {
  image: string,
  setImage: (url: string) => void,
}

export const AvatarBlock = (props: IAvatarBlock) => {
  const { image, setImage } = props;

  // STATES
  const [isEditAvatar, setIsEditAvatar] = useState<boolean>(false);

  // HANDLERS
  const handleEditAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      const imageUrl = await uploadImage(formData);
      updateAvatarMutation.mutateAsync(imageUrl?.data.data.url!);
    }
  };

  // QUERIES AND MUTATIONS
  const updateAvatarMutation = useMutation<IApiResponse<string>, string>(
    updateAvatar
  );

  return (
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
  );
};