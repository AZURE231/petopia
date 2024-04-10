import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import ClipLoader from 'react-spinners/ClipLoader';

export default function ControlForm({
  handleBack,
  handleNext,
  type,
  handleSubmit,
  isLoading = false,
}: {
  handleBack: () => void;
  handleNext: () => void;
  type: 1 | 2 | 3 | 4;
  handleSubmit?: (event: any) => void;
  isLoading?: boolean;
}) {
  return (
    <div className="w-full bg-white rounded-lg p-5 flex">
      {type !== 1 && (
        <div className="w-full flex justify-start">
          <button
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
      {type === 4 && (
        <button
          className="whitespace-nowrap whitespace-no-wrap p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg items-center"
          type="submit"
          onClick={handleSubmit}
        >
          Hoàn thành
          <span className="ml-2 leading-5">
            <ClipLoader
              color={'#000000'}
              loading={isLoading}
              size={14}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </span>
        </button>
      )}
    </div>
  );
}
