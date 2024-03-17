'use client';
import { use, useEffect, useState } from 'react';
import ControlForm from './ControlForm';
import Image from 'next/image';
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/petProfile';

export default function FormUploadImage({
  handleNext,
  setValue,
  getValue,
}: {
  handleNext: () => void;
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  getValue: UseFormGetValues<ICreatePetProfileRequest>;
}) {
  const [files, setFiles] = useState<string[]>([]);
  useEffect(() => {
    setFiles(getValue('petInfo.files'));
  }, []);
  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const ImagesArray = Object.entries(fileList).map((e) =>
        URL.createObjectURL(e[1])
      );
      setFiles([...files, ...ImagesArray]);
      setValue('petInfo.files', [...files, ...ImagesArray]);
      console.log('files', files);
    }
  };

  const deleteFile = (e: number) => {
    const newFiles = files.filter((item, index) => index !== e);
    setFiles(newFiles);
    setValue('petInfo.files', newFiles);
    console.log('delete', newFiles);
    console.log('number', e);
  };

  return (
    <div className="w-full rounded-2xl bg-blue-200 p-5">
      <h2 className="font-bold mb-2">Hình thú cưng của bạn</h2>

      {/* Dropzone */}
      <div className="flex items-center justify-center w-full p-5 mb-5 bg-gray-50 rounded-lg">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 ">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            disabled={files.length === 3}
            multiple
            type="file"
            className="hidden"
            onChange={handleAddImage}
          />
        </label>
      </div>
      {/* Image preview */}
      <div className="flex gap-3 mb-5">
        {files.length > 0 &&
          files.map((file, index) => (
            <div key={index} className="relative w-1/3 h-24">
              <Image
                src={file}
                alt="preview"
                fill
                className="object-cover rounded-lg"
              ></Image>
              <button
                onClick={() => deleteFile(index)}
                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full"
              >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
      </div>

      {/* Controller */}
      <ControlForm handleBack={() => {}} handleNext={handleNext} type={1} />
    </div>
  );
}
