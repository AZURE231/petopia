// Desc: This file contains the form rules of the pet profile form
import { FaLongArrowAltLeft } from 'react-icons/fa';
import ControlForm from './ControlForm';

export default function FormRules({ handleBack }: { handleBack: () => void }) {
  return (
    <div className="w-full rounded-2xl bg-blue-200 p-5">
      <h2 className="font-bold mb-2">Điều khoản</h2>
      <div className=" w-full p-5 mb-5 bg-gray-50 rounded-lg">sfsd</div>
      {/* Controller */}
      <ControlForm handleBack={handleBack} handleNext={() => {}} type={4} />
    </div>
  );
}
