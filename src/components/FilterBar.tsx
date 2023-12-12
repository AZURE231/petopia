'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IFilter } from '../interfaces/filter';

export default function FilterBar({
  filterContent,
}: {
  filterContent: IFilter[];
}) {
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState({
    1: false,
    2: false,
    3: false,
  });

  const handleShowFilter = (id: number) => {
    setShowFilter({
      ...showFilter,
      [id]: !showFilter[id as keyof typeof showFilter],
    });
  };

  const sortVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          New Arrivals
        </h1>

        {/* <!-- Sort --> */}
        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                id="menu-button"
                onClick={() => setShowSort(!showSort)}
              >
                Sort
                <svg
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}

            <motion.div
              animate={showSort ? 'open' : 'closed'}
              variants={sortVariants}
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {/* <!--
                  Active: "bg-gray-100", Not Active: ""

                  Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
                --> */}
                <a
                  href="#"
                  className="font-medium text-gray-900 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  Most Popular
                </a>
                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  Best Rating
                </a>
                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  Newest
                </a>
                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-3"
                >
                  Price: Low to High
                </a>
                <a
                  href="#"
                  className="text-gray-500 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-4"
                >
                  Price: High to Low
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* <!-- Filters --> */}
          <form className="hidden lg:block">
            {filterContent.map((filter) => (
              <div key={filter.id} className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  {/* <!-- Expand/collapse section button --> */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                    onClick={() => handleShowFilter(filter.id)}
                  >
                    <span className="font-medium text-gray-900">
                      {filter.title}
                    </span>
                    <span className="ml-6 flex items-center">
                      {/* <!-- Expand icon, show/hide based on section open state. --> */}
                      {!showFilter[filter.id as keyof typeof showFilter] && (
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
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
                  <div className="pt-6" id="filter-section-0">
                    <div className="space-y-4">
                      {filter.items.map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id="filter-color-0"
                            name="color[]"
                            value="white"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor="filter-color-0"
                            className="ml-3 text-sm text-gray-600"
                          >
                            {item.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </form>
          <div className="lg:col-span-3">content</div>
        </div>
      </section>
    </main>
  );
}
