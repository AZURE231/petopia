'use client';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { GIVE_PET_STEP, QUERY_KEYS } from '@/src/utils/constants';
import { postImage } from '@/src/helpers/postImage';
import { GivePetHeaderBar } from './GivePetHeaderBar';

const PetProfileForm = QueryProvider(
  ({ id = '' }: { id?: string; handleClose?: () => void }) => {
    // STATES
    const [error, setError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState(GIVE_PET_STEP.UPLOAD_IMAGE);

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
        breed: '',
        predictedBreed: '',
        presetBreed: '',
        files: [],
        images: [],
        showImages: [],
        id: id,
        listBreed: [],
        vaccineIds: [],
      },
    });

    // HANDLERS
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      let errorMessage = validateInputs();
      if (errorMessage) {
        setError(errorMessage);
        setShowAlert(true);
      } else {
        !getValues('breed') && setValue('breed', 'Không rõ');
        await uploadImagesMutation.mutateAsync(undefined);
        if (id) await updatePetMutation.mutateAsync(getValues());
        else await createPetMutation.mutateAsync(getValues());
      }
    };

    const uploadImage = async () => {
      const files = getValues('files');

      if (files && files.length > 0) {
        const filesArray = Array.from(files);
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
        getValues('showImages').length == 0 ? 'Ảnh không được để trống;\n' : '';
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
          setValue('presetBreed', res.data.data.breed);
          setValue('images', res.data.data.images);
          setValue('showImages', res.data.data.images);
          setValue(
            'vaccineIds',
            res.data.data.vaccines.map((v) => v.id)
          );
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
        // window.location.replace(`/pet/${res.data.data.id}`);
      },
    });

    const uploadImagesMutation = useMutation<void, undefined>(uploadImage);

    return (
      <form onSubmit={handleSubmit} className="max-h-screen overflow-y-auto">
        {/* breadscrum stepper */}
        <GivePetHeaderBar activeStep={activeStep} />

        {/* form upload images */}
        {activeStep === GIVE_PET_STEP.UPLOAD_IMAGE && (
          <FormUploadImage
            handleNext={handleNext}
            setValue={setValue}
            watch={watch}
          />
        )}

        {/* form pet detail */}
        {activeStep === GIVE_PET_STEP.PET_DETAIL && (
          <FormPetDetail
            handleNext={handleNext}
            handleBack={handleBack}
            setValue={setValue}
            watch={watch}
            enableAI={id === ''}
          />
        )}

        {/* rules */}
        {activeStep === GIVE_PET_STEP.RULE && (
          <FormRules
            handleBack={handleBack}
            isLoading={
              createPetMutation.isLoading ||
              updatePetMutation.isLoading ||
              uploadImagesMutation.isLoading
            }
          />
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
