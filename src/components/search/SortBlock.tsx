import { useClickOutside } from '@/src/utils/hooks';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

interface ISortBlock {
  setShowFilterMobile: Dispatch<SetStateAction<boolean>>,
  orderBy: 'newest' | 'popular',
  setOrderBy: Dispatch<SetStateAction<'newest' | 'popular'>>,
  isFetching: boolean,
}

export const SortBlock = (props: ISortBlock) => {
  const { setShowFilterMobile, orderBy, setOrderBy, isFetching } = props;

  const [showSort, setShowSort] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sortVariants = {
    open: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  const getSortLabel = (orderBy: 'newest' | 'popular') => {
    return orderBy === 'newest' ? 'Mới nhất' : 'Phổ biến';
  };

  const handleOnClickSort = (order: 'newest' | 'popular') => {
    !isFetching && order!== orderBy && setOrderBy(order);
    setShowSort(false);
  };

  useClickOutside(() => {
    setShowSort(false);
  }, [buttonRef, listRef]);

  return (
    <div className="flex items-center justify-end">
      <div className="relative inline-block text-left">
        <div>
          <button
            className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-full p-3"
            onClick={() => setShowSort(!showSort)}
            ref={buttonRef}
          >
            {`Sắp xếp: ${getSortLabel(orderBy)}`}
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

        <motion.div
          animate={showSort ? 'open' : 'closed'}
          variants={sortVariants}
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div 
            className="py-1" 
            role="none"
            ref={listRef}
          >
            <div
              className="font-medium text-gray-900 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleOnClickSort('newest')}
            >
              Mới nhất
            </div>
            <div
              className="font-medium text-gray-900 block px-4 py-2 text-sm cursor-pointer"
              onClick={() => handleOnClickSort('popular')}
            >
              Phổ biến
            </div>
          </div>
        </motion.div>
      </div>

      {/* Show mobile filter bar button */}
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
  );
};