'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IFilter, IItem } from '../interfaces/filter';
import FilterBarMobile from './FilterBarMobile';
import SearchBar from './SearchBar';
import PetCard from './PetCard';

export default function FilterBar({
  filterContent,
  sortCriteria,
}: {
  filterContent: IFilter[];
  sortCriteria: IItem[];
}) {
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState({});
  const [showFilterMobile, setShowFilterMobile] = useState(false);

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
    <div>
      <FilterBarMobile
        filterContent={filterContent}
        showFilterMobile={showFilterMobile}
        setShowFilterMobile={setShowFilterMobile}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Tìm thú cưng UwU
          </h1>
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
                              id={`filter-${filter.title}-${item.id}`}
                              name={`${filter.title}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${filter.title}-${item.id}`}
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
            {/* <!-- Content --> */}
            <div className="lg:col-span-3">
              {/* <!-- Sort --> */}
              <div className="mb-10">
                <SearchBar />
              </div>
              <div className="flex items-center justify-end">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-full p-3"
                      id="menu-button"
                      onClick={() => setShowSort(!showSort)}
                    >
                      Sắp xếp: Phổ biến
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
                      {sortCriteria.map((item) => (
                        <a
                          key={item.id}
                          href="#"
                          className="font-medium text-gray-900 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex={-1}
                          id="menu-item-0"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
                {/* <!-- Filter button --> */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setShowFilterMobile(true)}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {/* <!-- Product grid --> */}
              <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
