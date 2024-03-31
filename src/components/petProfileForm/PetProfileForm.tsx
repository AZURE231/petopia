'use client';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QueryProvider } from '../general/QueryProvider';
import FormUploadImage from './FormUploadImage';
import FormPetDetail from './FormPetDetail';
import FormRules from './FormRules';
import axios from 'axios';
import { isEmpty, isNotChecked } from '@/src/helpers/inputValidator';
import { Alert } from '../general/Alert';
import { ICreatePetProfileRequest } from '@/src/interfaces/pet';
import { postPet } from '@/src/services/pet.api';

const RegisterForm = QueryProvider(() => {
  const [error, setError] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

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
      name: '',
      description: '',
      sex: -1,
      age: -1,
      color: -1,
      species: -1,
      size: -1,
      isSterillized: -1,
      isVaccinated: -1,
      isAvailable: true,
      address: 'chưa điền',
      breed: 'chưa rõ',
      files: [],
      imagesFile: null,
      images: [],
    },
  });

  const postImage = async (formData: FormData) => {
    try {
      const res = await axios.post(
        'https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b',
        formData
      );
      console.log(res);
      setValue('images', [...getValues('images'), res.data.data.url]);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadImage = async () => {
    const imagesFile = getValues('imagesFile');

    if (imagesFile && imagesFile.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(imagesFile);

      // Use Promise.all to await all image uploads
      await Promise.all(
        filesArray.map(async (file) => {
          const formData = new FormData();
          formData.append('image', file);
          console.log('formData', formData);
          await postImage(formData); // Wait for each image upload to complete
        })
      );
    }
  };

  const inputValidator = () => {
    let errorMessage = '';

    errorMessage +=
      getValues('images').length === 0 ? 'Ảnh không được để trống;\n' : '';
    errorMessage += isEmpty(getValues('name'))
      ? 'Tên không được để trống;\n'
      : '';
    errorMessage += isEmpty(getValues('description'))
      ? 'Mô tả không được để trống;\n'
      : '';
    errorMessage += isNotChecked(getValues('sex'))
      ? 'Giới tính không được để trống;\n'
      : '';
    errorMessage += isNotChecked(getValues('age'))
      ? 'Tuổi không được để trống;\n'
      : '';
    errorMessage += isNotChecked(getValues('color'))
      ? 'Màu lông không được để trống;\n'
      : '';
    errorMessage += isNotChecked(getValues('species'))
      ? 'Loài không được để trống;\n'
      : '';
    errorMessage += isNotChecked(getValues('size'))
      ? 'Kích thước không được để trống;\n'
      : '';
    errorMessage += isNotChecked(getValues('isSterillized'))
      ? 'Triệt sản phải được chọn;\n'
      : '';
    errorMessage += isNotChecked(getValues('isVaccinated'))
      ? 'Tiêm chủng phải được chọn;\n'
      : '';

    return errorMessage.trim(); // Trim any leading/trailing whitespace
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    await uploadImage();
    let errorMessage = inputValidator();
    if (!errorMessage) createPetMutation.mutate(getValues());
    else {
      setError(errorMessage);
      setShowAlert(true);
    }
  };

  // CREATE PET MUTATION
  const createPetMutation = useMutation<
    IApiResponse<boolean>,
    ICreatePetProfileRequest
  >(postPet, {
    onError: (err) => {
      console.log(err);
      setError('Tạo hồ sơ thú cưng thất bại');
      setShowAlert(true);
    },
    onSuccess: (res) => {
      console.log('success');
      console.log(res);
      setShowSuccess(true);
    },
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

      {/* rules */}
      {activeStep === 2 && (
        <FormRules
          handleSubmit={handleSubmit}
          handleBack={handleBack}
          isLoading={createPetMutation.isLoading}
        />
      )}
      <Alert
        message={error!}
        show={showAlert}
        setShow={setShowAlert}
        failed={true}
      />
      <Alert
        message={'Tạo hồ sơ thú cưng thành công'}
        show={showSuccess}
        setShow={setShowSuccess}
        failed={false}
      />
    </form>
  );
});

export default RegisterForm;
