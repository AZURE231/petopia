import ProvinceDropdown from './ProvinceDropdown';
import { ILocationResponse } from '../interfaces/petProfile';
import { UseFormWatch } from 'react-hook-form';
import { IUserUpdate } from '../interfaces/user';
import DistrictDropdown from './DistrictDropdown';
import WardDropdown from './WardDropdown';

export default function AddressDropdown({
  province,
  district,
  ward,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
  watch,
}: {
  province: ILocationResponse[];
  district: ILocationResponse[];
  ward: ILocationResponse[];
  handleProvinceChange: any;
  handleDistrictChange: any;
  handleWardChange: any;
  watch: UseFormWatch<IUserUpdate>;
}) {
  return (
    <div className="flex flex-row gap-3">
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Tỉnh thành
        </label>
        <ProvinceDropdown
          provinces={province}
          onChange={handleProvinceChange}
          title="Chọn Tỉnh/Thành phố"
          watch={watch}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Quận huyện
        </label>
        <DistrictDropdown
          districts={district}
          onChange={handleDistrictChange}
          title="Chọn Quận/huyện"
          watch={watch}
        />
      </div>
      <div>
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="province"
        >
          Phường xã
        </label>
        <WardDropdown
          wards={ward}
          onChange={handleWardChange}
          title="Chọn xã/phường"
          watch={watch}
        />
      </div>
    </div>
  );
}
