'use client';
import { Dispatch, SetStateAction, useState } from 'react';

interface ISuccessModal {
  failed?: boolean,
  message: string,
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
}

export function Alert(props: ISuccessModal) {
  const { message, show, setShow, failed = false } = props;
  const [className, setClassName] = useState<string>('animate-fade_in');

  const handleOnAnimationEnd = () => {
    className !== 'animate-fade_in' && setShow(false);
    setClassName('animate-fade_in');
  };

  return (
    show && <div
      className={`transition ${className}`}
      onAnimationEnd={handleOnAnimationEnd}
    >
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto h-screen">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {
                    failed ?
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 bg-red-100">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" id="_24x24_On_Light_Clear-Input" data-name="24x24/On Light/Clear-Input" xmlns="http://www.w3.org/2000/svg">
                          <rect id="view-box" width="24" height="24" fill="#141124" opacity="0" />
                          <path id="Shape" d="M10,20A10,10,0,1,1,20,10,10.011,10.011,0,0,1,10,20Zm0-8.939h0l2.469,2.468a.75.75,0,1,0,1.06-1.06L11.061,10,13.53,7.53a.75.75,0,0,0-1.06-1.061L10,8.94,7.53,6.469A.75.75,0,1,0,6.469,7.53L8.94,10l-2.471,2.47A.75.75,0,1,0,7.53,13.53L10,11.062Z" transform="translate(2 2)" fill="red" />
                        </svg>
                      </div>
                      :
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="w-5 h-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="green"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      </div>
                  }
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {failed ? 'Thất bại' : 'Thành công'}
                    </h3>
                    {
                      message && <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setClassName('animate-fade_out opacity-0')}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
