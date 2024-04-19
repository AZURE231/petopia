import { useForm } from 'react-hook-form';
import FormUploadImage from './FormUploadImage';
import { IUploadImage } from '@/src/interfaces/common';
import Dropzone from '../general/Dropzone';

export default function CreatePetPostForm() {
  const { getValues, setValue, watch } = useForm<IUploadImage>({
    defaultValues: {
      showImages: [],
      files: [],
      images: [],
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(getValues());
  };

  return (
    <div className="container p-5 mx-auto">
      <form
        className="w-full rounded-2xl bg-yellow-100 p-5"
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
            <Dropzone setValue={setValue} watch={watch} imagesNumber={5} />
          </div>
          <div>
            <div className="text-sm font-medium">Mô tả</div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mt-3"
              placeholder="Mô tả bài đăng"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg font-bold">
            Hoàn thành
          </button>
        </div>
      </form>

      {/* <Alert
        failed={alertFail}
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        action={handleClose}
        showCancel={false}
      /> */}
    </div>
  );
}
