'use client';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/petProfile';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QueryProvider } from '../QueryProvider';
import { getProvince } from '../../services/petprofile.api';
import FormUploadImage from './FormUploadImage';
import FormPetDetail from './FormPetDetail';
import FormPetOwner from './FormPetOwner';
import FormRules from './FormRules';
import { http } from '@/src/services/http';
import axios from 'axios';

const RegisterForm = QueryProvider(() => {
  const activeStepper = 'text-blue-600';
  const activeStepperBorder = 'border-blue-600';

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // ADOPT FORM
  const { getValues, setValue, watch } = useForm<ICreatePetProfileRequest>({
    defaultValues: {
      petInfo: {
        name: '',
        files: [],
        imagesFile: null,
        species: '',
        breed: '',
        sex: '',
        age: '',
        color: '',
        size: '',
        isVaccinated: '',
        isNeutered: '',
      },
      userInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
    },
  });

  const uploadImage = () => {
    const imagesFile = getValues('petInfo.imagesFile');
    const formData = new FormData();
    console.log('imagesFile', imagesFile);
    // if (imagesFile) {
    //   for (let i = 0; i < imagesFile.length; i++) {
    imagesFile && formData.append('image', imagesFile);
    console.log('formData', formData);
    //

    axios
      .post(
        'https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b',
        formData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // http.setUrlAPI('https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b');
    // http.post
    //     }
    //   }
    //   // return formData;
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadImage();
    // registerMutation.mutate(getValues());
  };

  // REGISTER MUTATION
  const registerMutation = useMutation<
    IApiResponse<boolean>,
    ICreatePetProfileRequest
  >(getProvince, {
    onError: (err) => {},
    onSuccess: () => {},
  });

  return (
    <form onSubmit={handleSubmit}>
      {/* breadscrum stepper */}
      <ol className="flex items-center justify-center w-full p-3 mb-5 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        <li
          className={
            'flex items-center ' + (activeStep === 0 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 0 ? activeStepperBorder : 'border-gray-500')
            }
          >
            1
          </span>
          Tải hình ảnh{' '}
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={
            'flex items-center ' + (activeStep === 1 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 1 ? activeStepperBorder : 'border-gray-500')
            }
          >
            2
          </span>
          Thông tin thú cưng{' '}
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={
            'flex items-center ' + (activeStep === 2 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 2 ? activeStepperBorder : 'border-gray-500')
            }
          >
            3
          </span>
          Thông tin chủ sở hữu{' '}
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={
            'flex items-center ' + (activeStep === 3 ? activeStepper : '')
          }
        >
          <span
            className={
              'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
              (activeStep === 3 ? activeStepperBorder : 'border-gray-500')
            }
          >
            4
          </span>
          Xác nhận
        </li>
      </ol>

      {/* form upload images */}
      {activeStep === 0 && (
        <FormUploadImage
          handleNext={handleNext}
          setValue={setValue}
          getValue={getValues}
        />
      )}

      {/* form pet detail */}
      {activeStep === 1 && (
        <FormPetDetail
          handleNext={handleNext}
          handleBack={handleBack}
          setValue={setValue}
          watch={watch}
        />
      )}

      {/* form pet owner */}
      {activeStep === 2 && (
        <FormPetOwner
          handleNext={handleNext}
          handleBack={handleBack}
          setValue={setValue}
          watch={watch}
        />
      )}

      {/* rules */}
      {activeStep === 3 && (
        <FormRules handleSubmit={handleSubmit} handleBack={handleBack} />
      )}
    </form>
  );
});

export default RegisterForm;
