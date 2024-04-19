'use client';
import { ChangeEvent, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { QueryProvider } from '../general/QueryProvider';
import FormUploadImage from './FormUploadImage';
import FormPetDetail from './FormPetDetail';
import FormRules from './FormRules';
import { isEmpty, isNotChecked } from '@/src/helpers/inputValidator';
import { Alert } from '../general/Alert';
import {
  ICreatePetProfileRequest,
  ICreatePetResponse,
  IPetDetailResponse,
  IUpdatePeResponse,
} from '@/src/interfaces/pet';
import { getPetDetail, postPet, updatePet } from '@/src/services/pet.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { postImage } from '@/src/helpers/postImage';

const PetProfileForm = QueryProvider(
  ({ id = '' }: { id?: string; handleClose?: () => void }) => {
    // STATES
    const [error, setError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // FORMS
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
        images: [],
        showImages: [],
        id: id,
      },
    });

    // CONSTANTS
    const activeStepper = 'text-blue-600';
    const activeStepperBorder = 'border-blue-600';

    // HANDLERS
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      let errorMessage = validateInputs();
      if (errorMessage) {
        setError(errorMessage);
        setShowAlert(true);
      } else {
        await uploadImage();
        if (id) await updatePetMutation.mutateAsync(getValues());
        else await createPetMutation.mutateAsync(getValues());
        // setIsLoading(false);
      }
      setIsLoading(false);
    };

    const uploadImage = async () => {
      const files = getValues('files');

      if (files && files.length > 0) {
        // Convert FileList to array
        const filesArray = Array.from(files);

        // Use Promise.all to await all image uploads
        await Promise.all(
          filesArray.map(async (file) => {
            const formData = new FormData();
            formData.append('image', file);
            const url: string = await postImage(formData);
            url && setValue('images', [...getValues('images'), url]);
          })
        );
      }
    };

    const validateInputs = () => {
      let errorMessage = '';

      errorMessage +=
        getValues('files').length == 0 ? 'Ảnh không được để trống;\n' : '';
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

    // QUERIES AND MUTATIONS
    useQuery<IApiResponse<IPetDetailResponse>>(
      [QUERY_KEYS.GET_PET_DETAIL],
      () => getPetDetail({ id: id }),
      {
        onSuccess: (res) => {
          setValue('name', res.data.data.name);
          setValue('description', res.data.data.description);
          setValue('sex', res.data.data.sex);
          setValue('age', res.data.data.age);
          setValue('color', res.data.data.color);
          setValue('species', res.data.data.species);
          setValue('size', res.data.data.size);
          setValue('isSterillized', res.data.data.isSterillized);
          setValue('isVaccinated', res.data.data.isVaccinated);
          setValue('isAvailable', res.data.data.isAvailable);
          setValue('address', res.data.data.address);
          setValue('breed', res.data.data.breed);
          setValue('images', res.data.data.images);
          setValue('showImages', res.data.data.images);
        },
        refetchOnWindowFocus: false,
        enabled: !!id,
      }
    );

    const updatePetMutation = useMutation<
      IApiResponse<IUpdatePeResponse>,
      ICreatePetProfileRequest
    >(updatePet, {
      onError: () => {
        setError('Cập nhật hồ sơ thú cưng thất bại');
        setShowAlert(true);
      },
      onSuccess: (res) => {
        window.location.replace(`/pet/${res.data.data.id}`);
      },
    });

    const createPetMutation = useMutation<
      IApiResponse<ICreatePetResponse>,
      ICreatePetProfileRequest
    >(postPet, {
      onError: () => {
        setError('Tạo hồ sơ thú cưng thất bại');
        setShowAlert(true);
      },
      onSuccess: (res) => {
        window.location.replace(`/pet/${res.data.data.id}`);
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
            watch={watch}
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
          <FormRules handleBack={handleBack} isLoading={isLoading} />
        )}
        <Alert
          message={error || 'Tạo hồ sơ thú cưng thành công'}
          show={showAlert}
          setShow={setShowAlert}
          failed={true}
        />
      </form>
    );
  }
);

export default PetProfileForm;
