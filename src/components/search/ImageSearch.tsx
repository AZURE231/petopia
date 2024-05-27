import { Tooltip } from '@material-tailwind/react';
import { useState } from 'react';
import { SlCloudUpload as UploadIcon } from 'react-icons/sl';
import { IoLogoElectron as ElectronIcon } from 'react-icons/io5';
import { CiCamera } from 'react-icons/ci';
import Popup from 'reactjs-popup';
import Image from 'next/image';
import QueryButton from '../general/QueryButton';
import { UseFormReturn } from 'react-hook-form';
import { IPetFilterRequest, IPredictResponse } from '@/src/interfaces/pet';
import { useMutation } from '@/src/utils/hooks';
import { predict } from '@/src/services/pet.api';
import { PET_SPECIES } from '@/src/utils/constants';
import { BsStars } from 'react-icons/bs';

interface IImageSearch {
  disable: boolean,
  filterForm: UseFormReturn<IPetFilterRequest, any, undefined>
};

export const ImageSearch = (props: IImageSearch) => {
  const { disable, filterForm } = props;

  // STATES
  const [showInput, setShowInput] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  // HANDLERS
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(Array.from(fileList)[0]);
    e.target.files = null;
  };

  const handlePopupOnClose = () => {
    setShowInput(false);
    setFile(undefined);
  };

  const handleImageSearch = () => {
    if (!file) return;
    const data = new FormData();
    data.append('', file);
    predictMutation.mutate(data);
    setShowInput(false);
  };

  // MUTATIONS
  const predictMutation = useMutation<IPredictResponse, FormData>(
    predict, {
    onSuccess: (res) => {
      const data = res.data;
      filterForm.setValue('breed', [data.breed]);
      filterForm.setValue('species', [data.animalType === 'Dog' ? PET_SPECIES.DOG : PET_SPECIES.CAT]);
      setShowInput(false);
    },
  }
  );

  return (
    <div className='flex justify-center items-center mx-4 relative'>
      <Tooltip content='Tìm kiếm bằng hình ảnh'>
        <button
          className='rounded-full p-1 flex'
          onClick={() => !disable && setShowInput(true)}>
          <CiCamera size={40} color='grey' />
          <BsStars size={30} className='text-yellow-600 animate-pulse-plus'/>
        </button>
      </Tooltip>
      <Popup
        open={showInput}
        onClose={handlePopupOnClose}
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="flex flex-col items-center justify-center w-full p-5 mb-5 bg-gray-50 rounded-lg">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center p-14">
              <UploadIcon color='grey' size={32} />
              <p className="my-2 text-sm text-gray-500 font-bold">Tìm kiếm bằng hình ảnh</p>
              <p className="text-xs text-gray-500 ">PNG, JPG, JPEG</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleAddImage}
            />
          </label>
          {file && <>
            <div className="relative w-4/5 h-24 my-4">
              <Image
                src={URL.createObjectURL(file)}
                alt={'pet-image'}
                className="object-cover rounded-lg"
                fill
              />
            </div>
            <QueryButton
              name={'Tìm kiếm'}
              isLoading={false}
              action={handleImageSearch}
            />
          </>}
        </div>
      </Popup>
      {
        disable || predictMutation.isLoading &&
        <div className='fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50'>
          <div className='animate-spin'>
            <ElectronIcon size={100} color='yellow' />
          </div>
        </div>
      }
    </div>
  );
};