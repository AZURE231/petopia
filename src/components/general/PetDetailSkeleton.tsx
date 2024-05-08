import React from 'react';
import SeeMore from './SeeMore';
import CardSkeleton from './CardSkeleton';

export default function PetDetailSkeleton() {
  return (
    <div>
      <div className="container animate-pulse mx-auto p-5 shadow-2xl rounded-2xl">
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-full h-96 bg-gray-300 rounded-lg sm:w-96">
              <svg
                className="w-10 h-10 text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
          <div className="md:pl-10 md:mt-0 mt-5">
            <div className="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>

            <div className="flex flex-col divide-y">
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
              <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-5 shadow-2xl rounded-2xl my-5">
        <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
