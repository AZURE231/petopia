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
        <div className="text-lg ml-2 font-medium text-right">
          {email || 'Chưa rõ'}
        </div>
      </div>
      <div className="py-2 grid grid-cols-2">
        <div className="block text-gray-500 text-md">Số điện thoại:</div>
        <div className="text-lg ml-2 font-medium text-right">
          {phone || 'Chưa rõ'}
        </div>
      </div>
      <div className="py-2 grid grid-cols-2 ">
        <div className="block text-gray-500 text-md">Địa chỉ:</div>
        <div className="text-lg ml-2 font-medium text-right">
          {address || 'Chưa rõ'}
        </div>
      </div>
    </div>
  );
};
