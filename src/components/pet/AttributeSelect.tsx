import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ICreatePetProfileRequest, IPetFilterItem } from '@/src/interfaces/pet';
interface AttributeSelectProps {
  label: string;
  options: IPetFilterItem[];
  value:
    | 'breed'
    | 'species'
    | 'sex'
    | 'age'
    | 'color'
    | 'size'
    | 'isVaccinated'
    | 'isSterillized';
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
  testId?: string;
}

export default function AttributeSelect({
  setValue,
  watch,
  label,
  value,
  options,
  testId,
}: AttributeSelectProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="pet-age" className="text-sm font-medium">
        {label}
      </label>
      <select
        test-id={testId}
        onChange={(e) => setValue(value, e.target.value)}
        className="text-black hover:bg-slate-100 border border-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        defaultValue={watch(value)}
      >
        <option value="-1">Chọn {label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
