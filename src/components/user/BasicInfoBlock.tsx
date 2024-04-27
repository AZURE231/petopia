import { Tooltip } from '@material-tailwind/react';

export const BasicInfoBlock = ({
  email,
  phone,
  address,
}: {
  email: string;
  phone: string;
  address: string;
}) => {
  return (
    <div className="p-5 md:px-10 border w-fit rounded-xl divide-y-2 ">
      <div className="py-2 grid grid-cols-2">
        <div className="block text-gray-500 text-md">Email:</div>
        <Tooltip content={email}>
          <div className="text-md md:text-lg ml-2 font-medium text-right tracking-wide truncate">
            {email || 'Chưa rõ'}
          </div>
        </Tooltip>
      </div>
      <div className="py-2 grid grid-cols-2">
        <div className="block text-gray-500 text-md">Số điện thoại:</div>
        <div className="text-md md:text-lg ml-2 font-medium text-right tracking-wide">
          {phone || 'Chưa rõ'}
        </div>
      </div>
      <div className="py-2 grid grid-cols-2 ">
        <div className="block text-gray-500 text-md">Địa chỉ:</div>
        <div className="text-md md:text-lg ml-2 font-medium text-right">
          {address || 'Chưa rõ'}
        </div>
      </div>
    </div>
  );
};
