import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ICreatePetProfileRequest } from '@/src/interfaces/petProfile';

interface AttributeSelectProps {
  label: string;
  options: string[];
  value:
    | 'petInfo.breed'
    | 'petInfo.species'
    | 'petInfo.sex'
    | 'petInfo.age'
    | 'petInfo.color'
    | 'petInfo.size'
    | 'petInfo.isVaccinated'
    | 'petInfo.isNeutered';
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}

export default function AttributeSelect({
  setValue,
  watch,
  label,
  value,
  options,
}: AttributeSelectProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="pet-age" className="text-sm font-medium">
        {label}
      </label>
      <select
        name="breed"
        onChange={(e) => setValue(value, e.target.value)}
        className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <option value="">Chọn {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} selected={watch(value) === opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
