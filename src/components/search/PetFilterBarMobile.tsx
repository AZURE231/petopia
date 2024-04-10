'use client';
import { IPetFilter } from '@/src/interfaces/pet';
import { useState } from 'react';

export function PetFilterBarMobile({
  filterContent,
  showFilterMobile,
  setShowFilterMobile,
}: {
  filterContent: IPetFilter[];
  showFilterMobile: boolean;
  setShowFilterMobile: (showFilterMobile: boolean) => void;
}) {
  const [showFilter, setShowFilter] = useState({});
  const handleShowFilter = (id: number) => {
    setShowFilter({
      ...showFilter,
      [id]: !showFilter[id as keyof typeof showFilter],
    });
  };
  if (!showFilterMobile) return null;
  return (
    <div className="relative z-40 lg:hidden" role="dialog">
      {/* <!--
            Off-canvas menu backdrop, show/hide based on off-canvas menu state.

            Entering: "transition-opacity ease-linear duration-300"
            From: "opacity-0"
            To: "opacity-100"
            Leaving: "transition-opacity ease-linear duration-300"
            From: "opacity-100"
            To: "opacity-0"
            --> */}
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>

      <div className="fixed inset-0 z-40 flex">
        {/* <!--
            Off-canvas menu, show/hide based on off-canvas menu state.

            Entering: "transition ease-in-out duration-300 transform"
                From: "translate-x-full"
                To: "translate-x-0"
            Leaving: "transition ease-in-out duration-300 transform"
                From: "translate-x-0"
                To: "translate-x-full"
            --> */}
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            {/* <!-- Close button --> */}
            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              onClick={() => setShowFilterMobile(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            {filterContent.map((filter) => (
              <div
                key={filter.id}
                className="border-t border-gray-200 px-4 py-6"
              >
                <h3 className="-mx-2 -my-3 flow-root">
                  {/* <!-- Expand/collapse section button --> */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                    onClick={() => handleShowFilter(filter.id)}
                  >
                    <span className="font-medium text-gray-900">
                      {filter.label}
                    </span>
                    <span className="ml-6 flex items-center">
                      {/* <!-- Expand icon, show/hide based on section open state. --> */}
                      {!showFilter[filter.id as keyof typeof showFilter] && (
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                      )}
                      {/* <!-- Collapse icon, show/hide based on section open state. --> */}
                      {showFilter[filter.id as keyof typeof showFilter] && (
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </h3>
                {/* <!-- Filter section, show/hide based on section state. --> */}
                {showFilter[filter.id as keyof typeof showFilter] && (
                  <div className="pt-6" id="filter-section-mobile-0">
                    <div className="space-y-6">
                      {filter.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id="filter-mobile-color-0"
                            name="color[]"
                            value="white"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="filter-mobile-color-0"
                            className="ml-3 min-w-0 flex-1 text-gray-500"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
