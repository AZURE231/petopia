import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';

export default function ControlForm({
  handleBack,
  handleNext,
  type,
  handleSubmit,
}: {
  handleBack: () => void;
  handleNext: () => void;
  type: 1 | 2 | 3 | 4;
  handleSubmit?: (event: any) => void;
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
          className="w-fit p-3 flex text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg"
          type="submit"
          onClick={handleSubmit}
        >
          Hoàn thành
        </button>
      )}
    </div>
  );
}
