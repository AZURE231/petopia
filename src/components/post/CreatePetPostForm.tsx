import { set, useForm } from 'react-hook-form';
import { IApiResponse, IUploadImage } from '@/src/interfaces/common';
import Dropzone from '../general/Dropzone';
import { IPostPetPost } from '@/src/interfaces/post';
import { postImage } from '@/src/helpers/postImage';
import { useMutation } from '@/src/utils/hooks';
import { createPost } from '@/src/services/post.api';
import { useState } from 'react';
import { Alert } from '../general/Alert';
import QueryButton from '../general/QueryButton';

export default function CreatePetPostForm({
  petId,
  query,
  action,
}: {
  petId: string;
  query: any;
  action: () => void;
}) {
  //STATE
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertFail, setAlertFail] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadImageForm = useForm<IUploadImage>({
    defaultValues: {
      showImages: [],
      files: [],
      images: [],
    },
  });

  const createPostForm = useForm<IPostPetPost>({
    defaultValues: {
      petId: petId,
      content: '',
      images: [],
    },
  });

  const uploadImage = async () => {
    const files = uploadImageForm.getValues('files');

    if (files && files.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(files);

      // Use Promise.all to await all image uploads
      await Promise.all(
        filesArray.map(async (file) => {
          const formData = new FormData();
          formData.append('image', file);
          const url: string = await postImage(formData);
          url &&
            createPostForm.setValue('images', [
              ...createPostForm.getValues('images'),
              url,
            ]);
        })
      );
    }
    setIsLoading(false);
  };

  const createPostPetMutation = useMutation<
    IApiResponse<boolean>,
    IPostPetPost
  >(createPost, {
    onError: () => {
      setAlertFail(true);
      setAlertMessage('Tạo bài đăng thất bại');
      setAlertShow(true);
    },
    onSuccess: () => {
      setAlertFail(false);
      setAlertMessage('Tạo bài đăng thành công');
      setAlertShow(true);
      query.refetch();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await uploadImage();
    createPostPetMutation.mutate(createPostForm.getValues());
  };

  return (
    <div className="p-5 mx-auto w-full">
      <form
        className="w-full md:w-[600px] rounded-2xl bg-yellow-100 p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold mb-2">Tạo bài đăng</h2>
        {/* form */}
        <div
          className="w-full p-5 mb-5 bg-gray-50 rounded-lg overflow-auto"
          style={{ maxHeight: '400px' }}
        >
          <div>
            <div className="text-sm font-medium">Tải ảnh lên</div>
            <Dropzone
              setValue={uploadImageForm.setValue}
              watch={uploadImageForm.watch}
              imagesNumber={5}
            />
          </div>
          <div>
            <div className="text-sm font-medium">Mô tả</div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mt-3"
              placeholder="Mô tả bài đăng"
              onChange={(e) =>
                createPostForm.setValue('content', e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex justify-center">
          <QueryButton
            name={'Hoàn thành'}
            isLoading={createPostPetMutation.isLoading || isLoading}
          />
        </div>
      </form>

      <Alert
        show={alertShow}
        setShow={setAlertShow}
        message={alertMessage}
        failed={alertFail}
        action={action}
        showCancel={false}
      />
    </div>
  );
}
