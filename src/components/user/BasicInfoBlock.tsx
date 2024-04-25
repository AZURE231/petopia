export const BasicInfoBlock = ({ email, phone, address }
  : { email: string, phone: string, address: string }) => {
  return (
    <div className="md:px-10">
      <div className="flex mb-2">
        <div className="block text-gray-700 text-lg font-bold">
          Email:
        </div>
        <div className="text-lg ml-2">
          {email || 'Chưa rõ'}
        </div>
      </div>
      <div className="flex mb-2">
        <div className="block text-gray-700 text-lg font-bold">
          Số điện thoại:
        </div>
        <div className="text-lg ml-2">
          {phone || 'Chưa rõ'}
        </div>
      </div>
      <div className="flex mb-2">
        <div className="block text-gray-700 text-lg font-bold">
          Địa chỉ:
        </div>
        <div className="text-lg ml-2">
          {address || 'Chưa rõ'}
        </div>
      </div>
    </div>
  );
};