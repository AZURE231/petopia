import AttributeSelect from './AttributeSelect';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import ControlForm from './ControlForm';
import {
  GIVE_PET_STEP,
  PET_SELECT,
  PET_SPECIES,
  QUERY_KEYS,
} from '@/src/utils/constants';
import {
  ICreatePetProfileRequest,
  IPredictResponse,
} from '@/src/interfaces/pet';
import BreedInput from './BreedInput';
import { useQuery } from '@/src/utils/hooks';
import { predict } from '@/src/services/pet.api';

export default function FormPetDetail({
  handleNext,
  handleBack,
  setValue,
  watch,
  enableAI,
}: {
  handleNext: () => void;
  handleBack: () => void;
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
  enableAI: boolean;
}) {
  const formData = new FormData();
  formData.append('', watch('files')[0]);

  const getPetBreed = useQuery<IPredictResponse, FormData>(
    [QUERY_KEYS.GET_PET_BREED_AI],
    () => predict(formData),
    {
      onSuccess: (res) => {
        console.log('data', res);
        setValue('predictedBreed', res.data.breed);
        setValue(
          'species',
          res.data.animalType == 'Dog' ? PET_SPECIES.DOG : PET_SPECIES.CAT
        );
      },
      enabled: watch('files').length > 0 && enableAI,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div className="w-full rounded-2xl bg-yellow-100 p-5">
      <h2 className="font-bold mb-2">Thông tin về thú cưng của bạn</h2>

      {/* form */}
      <div className="w-full p-5 mb-5 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Tên thú cưng */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="pet-name" className="text-sm font-medium">
              Tên thú cưng
            </label>
            <input
              id="pet-name"
              name="pet-name"
              type="text"
              value={watch('name')}
              onChange={(e) => setValue('name', e.target.value)}
              placeholder='Ví dụ: "Miu" hoặc "Lulu"'
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <AttributeSelect
            setValue={setValue}
            watch={watch}
            label="Loài"
            value="species"
            options={PET_SELECT[0].items}
            aiQuery={getPetBreed}
            enableAI={enableAI}
          />
          <BreedInput
            watch={watch}
            setValue={setValue}
            aiQuery={getPetBreed}
            enableAI={enableAI}
          />
          {PET_SELECT.map((filter) => (
            <AttributeSelect
              key={filter.id}
              setValue={setValue}
              watch={watch}
              label={filter.label}
              value={filter.kind}
              options={filter.items}
              aiQuery={getPetBreed}
            />
          ))}

          <div className="flex flex-col space-y-2">
            <label htmlFor="pet-description" className="text-sm font-medium">
              Giới thiệu về thú cưng
            </label>
            <textarea
              id="pet-description"
              name="pet-description"
              value={watch('description')}
              onChange={(e) => setValue('description', e.target.value)}
              placeholder='Ví dụ: "Milu rất nghịch ngợm"'
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>
        <div className="space-x-2">
          <label className="text-sm font-medium" htmlFor="isAvailable">
            Sẵn sàng để cho
          </label>
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            onChange={(e) => setValue('isAvailable', e.target.checked)}
            checked={watch('isAvailable')}
          />
        </div>
      </div>
      {/* Controller */}
      <ControlForm
        handleBack={handleBack}
        handleNext={handleNext}
        step={GIVE_PET_STEP.PET_DETAIL}
      />
    </div>
  );
}
