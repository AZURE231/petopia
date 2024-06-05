import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import {
  ICreatePetProfileRequest,
  IPredictResponse,
  IPetFilterItem,
} from '@/src/interfaces/pet';
import { UseQueryResult } from 'react-query';
import { AxiosResponse } from 'axios';
import { IApiErrorResponse } from '@/src/interfaces/common';
import { BsStars } from 'react-icons/bs';
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
  aiQuery?: UseQueryResult<
    AxiosResponse<IPredictResponse, any>,
    AxiosResponse<IApiErrorResponse, any>
  >;
  enableAI?: boolean;
  testId?: string;
}

export default function AttributeSelect({
  setValue,
  watch,
  label,
  value,
  options,
  testId,
  aiQuery,
  enableAI,
}: AttributeSelectProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="pet-age" className="text-sm flex font-medium">
        {label}
        {aiQuery?.isSuccess && value === 'species' && enableAI && (
          <span className="ml-3 flex text-yellow-500 relative">
            Hỗ trợ bởi AI{' '}
            <span className="text-lg animate-pulse absolute bottom-3 -right-5">
              <BsStars />
            </span>
          </span>
        )}
      </label>
      <select
        test-id={testId}
        onChange={(e) => setValue(value, e.target.value)}
        className={`text-black  border ${
          aiQuery?.isLoading && value === 'species'
            ? 'border-yellow-600 animate-pulse bg-yellow-200'
            : 'border-gray-300 hover:bg-slate-100'
        } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
        value={watch(value)}
        disabled={aiQuery?.isLoading && value === 'species'}
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
