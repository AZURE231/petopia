import { useClickOutside } from '@/src/utils/hooks';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

interface ISortBlock {
  orderBy: 'newest' | 'popular',
  setOrderBy: Dispatch<SetStateAction<'newest' | 'popular'>>,
  disable: boolean,
}

export const PetSortBlock = (props: ISortBlock) => {
  const { orderBy, setOrderBy, disable: isFetching } = props;

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
    !isFetching && order !== orderBy && setOrderBy(order);
    setShowSort(false);
  };

  useClickOutside(() => {
    setShowSort(false);
  }, [buttonRef, listRef]);

  return (
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
  );
};