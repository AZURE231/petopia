import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import QueryButton from '../general/QueryButton';
import { GIVE_PET_STEP } from '@/src/utils/constants';

export default function ControlForm({
  handleBack,
  handleNext,
  step,
  isLoading = false,
}: {
  handleBack: () => void;
  handleNext: () => void;
  step: number;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full bg-white rounded-lg p-5 flex">
      {step !== GIVE_PET_STEP.UPLOAD_IMAGE && (
        <div className="w-full flex justify-start">
          <div
            test-id="back-button-form"
            onClick={handleBack}
            className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg cursor-pointer"
          >
            <span className="ml-1 mt-1 item-center ">
              <FaLongArrowAltLeft />
            </span>
            Quay lại {'  '}
          </div>
        </div>
      )}
      {step !== GIVE_PET_STEP.RULE && (
        <div className="w-full flex justify-end">
          <div
            test-id="next-button-form"
            onClick={handleNext}
            className="w-fit p-3 flex justify-end text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg cursor-pointer"
          >
            Tiếp tục {'  '}
            <span className="ml-1 mt-1 item-center ">
              <FaLongArrowAltRight />
            </span>
          </div>
        </div>
      )}
      {step === GIVE_PET_STEP.RULE && (
        <QueryButton
          testId="submit-give-pet-button"
          name={'Hoàn thành'}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
