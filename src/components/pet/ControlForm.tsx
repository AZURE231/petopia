import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import QueryButton from '../general/QueryButton';

export default function ControlForm({
  handleBack,
  handleNext,
  type,
  isLoading = false,
}: {
  handleBack: () => void;
  handleNext: () => void;
  type: 1 | 2 | 3 | 4;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full bg-white rounded-lg p-5 flex">
      {type !== 1 && (
        <div className="w-full flex justify-start">
          <button
            test-id="back-button-form"
            onClick={handleBack}
            className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
          >
            <span className="ml-1 mt-1 item-center ">
              <FaLongArrowAltLeft />
            </span>
            Quay lại {'  '}
          </button>
        </div>
      )}
      {type !== 4 && (
        <div className="w-full flex justify-end">
          <button
            test-id="next-button-form"
            onClick={handleNext}
            className="w-fit p-3 flex justify-end text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
          >
            Tiếp tục {'  '}
            <span className="ml-1 mt-1 item-center ">
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
      )}
      {type === 4 && <QueryButton name={'Hoàn thành'} isLoading={isLoading} />}
    </div>
  );
}
