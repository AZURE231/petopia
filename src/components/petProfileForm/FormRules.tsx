// Desc: This file contains the form rules of the pet profile form
import { FaLongArrowAltLeft } from 'react-icons/fa';
import ControlForm from './ControlForm';
import { ChangeEvent } from 'react';

export default function FormRules({
  handleBack,
  handleSubmit,
}: {
  handleBack: () => void;
  handleSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="w-full rounded-2xl bg-blue-200 p-5">
      <h2 className="font-bold mb-2">Điều khoản</h2>
      <div className=" w-full p-5 mb-5 bg-gray-50 rounded-lg">sfsd</div>
      {/* Controller */}
      <ControlForm
        handleBack={handleBack}
        handleNext={() => {}}
        type={4}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
