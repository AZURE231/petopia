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

  // MUTATIONS
  const predictMutation = useMutation<IPredictResponse, FormData>(
    predict, {
    onSuccess: (res) => {
      const data = res.data;
      filterForm.setValue('breed', [data.breed]);
      filterForm.setValue('species', [data.animalType === 'Dog' ? PET_SPECIES.DOG : PET_SPECIES.CAT]);
    },
  }
  );

  return (
    <div className='flex justify-center items-center mx-8 relative'>
      <Tooltip content='Tìm kiếm bằng hình ảnh'>
        <button
          className='absolute rounded-full p-1'
          onClick={() => !disable && setShowInput(true)}>
          <CiCamera size={40} color='grey' />
        </button>
      </Tooltip>
      <Popup
        open={showInput}
        onClose={handlePopupOnClose}
        overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="flex flex-col items-center justify-center w-full p-5 mb-5 bg-gray-50 rounded-lg">
          {!disable &&
            <>
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
                  action={() => {
                    const data = new FormData();
                    data.append('', file);
                    predictMutation.mutate(data);
                  }}
                />
              </>}
            </>
          }
          {
            disable && <div
              className='absolute animate-spin bg-gray-800 rounded-full p-1'>
              <ElectronIcon size={40} color='yellow' />
            </div>
          }
        </div>
      </Popup>
    </div>
  );
};