'use client';
import ControlForm from './ControlForm';
import Image from 'next/image';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/pet';
import { IoClose } from 'react-icons/io5';
import { GIVE_PET_STEP } from '@/src/utils/constants';
import { SlCloudUpload as UploadIcon } from 'react-icons/sl';

export default function FormUploadImage({
  handleNext,
  setValue,
  watch,
}: {
  handleNext: () => void;
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}) {
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const url = Object.entries(fileList).map((e) =>
        URL.createObjectURL(e[1])
      )[0];
      if (!watch('showImages').includes(url)) {
        const file = Array.from(fileList)[0];
        setValue('showImages', [...watch('showImages'), url]);
        setValue('files', [...watch('files'), file]);
      }
    }
    e.target.files = null;
  };

  const deleteFile = (index: number) => {
    const newShowImages = watch('showImages').filter((_, i) => i !== index);
    setValue('showImages', newShowImages);
    if (index < watch('images').length) {
      const newImages = watch('images').filter((_, i) => i !== index);
      setValue('images', newImages);
    } else {
      const fileIndex = index - watch('images').length;
      const newFiles = watch('files').filter((_, i) => i !== fileIndex);
      setValue('files', newFiles);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-yellow-100 p-5">
      <h2 className="font-bold mb-2">Hình thú cưng của bạn</h2>

      {/* Dropzone */}
      <div className="flex items-center justify-center w-full p-5 mb-5 bg-gray-50 rounded-lg">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon color='grey' size={32}/>
            <p className="my-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 ">PNG, JPG, JPEG</p>
          </div>
          <input
            test-id="image-dropzone"
            id="dropzone-file"
            disabled={watch('showImages').length >= 3}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      </div>
      {/* Image preview */}
      <div className="flex gap-3 mb-5">
        {watch('showImages').length > 0 &&
          watch('showImages').map((file, index) => (
            <div
              test-id="show-images-dropzone"
              key={index}
              className="relative w-1/3 h-24"
            >
              <Image
                src={file}
                alt="preview"
                fill
                className="object-cover rounded-lg"
              ></Image>
              <div
                className="absolute top-0 bg-red-300 right-0 p-1 rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => deleteFile(index)}
                test-id="delete-image-dropzone"
              >
                <IoClose color="black" />
              </div>
            </div>
          ))}
      </div>

      {/* Controller */}
      <ControlForm
        handleBack={() => {}}
        handleNext={handleNext}
        step={GIVE_PET_STEP.UPLOAD_IMAGE}
      />
    </div>
  );
}
