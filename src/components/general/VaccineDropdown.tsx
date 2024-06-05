import { ICreatePetProfileRequest, IVaccine } from '@/src/interfaces/pet';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/src/utils/hooks';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

export default function Dropdown({
  optionsList,
  setValue,
  watch,
}: {
  optionsList: IVaccine[] | undefined;
  setValue: UseFormSetValue<ICreatePetProfileRequest>;
  watch: UseFormWatch<ICreatePetProfileRequest>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const handleOpen = () => setIsOpen(!isOpen);

  useClickOutside(() => {
    setIsOpen(false);
  }, [buttonRef, listRef]);
  return (
    <div>
      <label htmlFor="pet-health" className="text-sm mb-2 flex font-medium">
        Chọn loại vắc xin
      </label>
      <button
        id="dropdownBgHoverButton"
        data-dropdown-toggle="dropdownBgHover"
        className="relative flex flex-row text-black border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center justify-center items-center w-full"
        type="button"
        onClick={handleOpen}
        ref={buttonRef}
      >
        Chọn loại vắc xin
        <svg
          className="w-2.5 h-2.5 ms-3 absolute right-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="w-full relative">
          <div
            id="dropdownBgHover"
            className="z-10 w-full bg-white rounded-lg shadow absolute top-3"
            ref={listRef}
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 "
              aria-labelledby="dropdownBgHoverButton"
            >
              {optionsList &&
                optionsList.map((option) => (
                  <li key={option.id}>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={`checkbox-item-${option.id}`}
                        type="checkbox"
                        value={option.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500
                         dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 
                         focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        checked={watch('vaccineIds').includes(option.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setValue('vaccineIds', [
                              ...watch('vaccineIds'),
                              option.id,
                            ]);
                          } else {
                            setValue(
                              'vaccineIds',
                              watch('vaccineIds').filter(
                                (id) => id !== option.id
                              )
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={`checkbox-item-${option.id}`}
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        {option.name}
                      </label>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
