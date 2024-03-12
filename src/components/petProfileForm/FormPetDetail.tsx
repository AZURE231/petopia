import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import AttributeSelect from '../AttributeSelect';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/petProfile';
import ControlForm from './ControlForm';

export default function FormPetDetail({
  handleNext,
  handleBack,
  setValue,
  watch,
}: {
  handleNext: () => void;
  handleBack: () => void;
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}) {
  const dogBreeds = [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
    // Add more dog breeds as needed
  ];

  const petSex = ['Đực', 'Cái', 'Không biết'];
  const petAge = ['Dưới 1 năm', '1 - 3 năm', 'Trên 3 năm'];
  const petColor = ['Vàng', 'Đen', 'Đỏ'];
  const petVaccination = ['7 mũi', 'Dại', 'Uốn ván'];
  const petSize = ['Nhỏ', 'Trung bình', 'Lớn'];
  const petSpecies = ['Chó', 'Mèo', 'Chim', 'Cá', 'Khác'];
  return (
    <div className="w-full rounded-2xl bg-blue-200 p-5">
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
              value={watch('petInfo.name')}
              onChange={(e) => setValue('petInfo.name', e.target.value)}
              placeholder='Ví dụ: "Miu" hoặc "Lulu"'
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Giới tính */}
          <AttributeSelect
            setValue={setValue}
            watch={watch}
            label="Giới tính"
            value="petInfo.sex"
            options={petSex}
          />

          {/* Giống */}
          <AttributeSelect
            setValue={setValue}
            watch={watch}
            label="Giống loại"
            value="petInfo.breed"
            options={dogBreeds}
          />

          {/* Độ tuổi */}
          <AttributeSelect
            setValue={setValue}
            watch={watch}
            label="Độ tuổi"
            value="petInfo.age"
            options={petAge}
          />

          {/* Màu sắc */}
          <AttributeSelect
            setValue={setValue}
            watch={watch}
            label="Màu sắc"
            value="petInfo.color"
            options={petColor}
          />

          {/* Tiêm chủng */}
          <AttributeSelect
            setValue={setValue}
            watch={watch}
            label="Tiêm chủng"
            value="petInfo.isVaccinated"
            options={petVaccination}
          />
        </div>
      </div>
      {/* Controller */}
      <ControlForm handleBack={handleBack} handleNext={handleNext} type={2} />
    </div>
  );
}
