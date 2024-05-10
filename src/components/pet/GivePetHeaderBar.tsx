import { GIVE_PET_STEP } from '@/src/utils/constants';

export const GivePetHeaderBar = ({ activeStep }: { activeStep: number }) => {
  // CONSTANTS
  const activeStepper = 'text-blue-600';
  const activeStepperBorder = 'border-blue-600';

  return (
    <ol className="flex items-center justify-center w-full p-3 mb-5 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm  sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      <li
        className={
          'flex items-center ' + (activeStep === GIVE_PET_STEP.UPLOAD_IMAGE ? activeStepper : '')
        }
      >
        <span
          className={
            'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
            (activeStep === GIVE_PET_STEP.UPLOAD_IMAGE ? activeStepperBorder : 'border-gray-500')
          }
        >
          1
        </span>
        Tải hình ảnh{' '}
        <svg
          className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li
        className={
          'flex items-center ' + (activeStep === GIVE_PET_STEP.PET_DETAIL ? activeStepper : '')
        }
      >
        <span
          className={
            'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
            (activeStep === GIVE_PET_STEP.PET_DETAIL ? activeStepperBorder : 'border-gray-500')
          }
        >
          2
        </span>
        Thông tin thú cưng{' '}
        <svg
          className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 12 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m7 9 4-4-4-4M1 9l4-4-4-4"
          />
        </svg>
      </li>
      <li
        className={
          'flex items-center ' + (activeStep === GIVE_PET_STEP.RULE ? activeStepper : '')
        }
      >
        <span
          className={
            'flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ' +
            (activeStep === GIVE_PET_STEP.RULE ? activeStepperBorder : 'border-gray-500')
          }
        >
          3
        </span>
        Xác nhận
      </li>
    </ol>
  );
};