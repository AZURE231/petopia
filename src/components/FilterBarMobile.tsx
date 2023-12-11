export default function FilterBarMobile() {
  return (
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
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
            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
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
            <h3 className="sr-only">Categories</h3>
            <ul role="list" className="px-2 py-3 font-medium text-gray-900">
              <li>
                <a href="#" className="block px-2 py-3">
                  Totes
                </a>
              </li>
              <li>
                <a href="#" className="block px-2 py-3">
                  Backpacks
                </a>
              </li>
              <li>
                <a href="#" className="block px-2 py-3">
                  Travel Bags
                </a>
              </li>
              <li>
                <a href="#" className="block px-2 py-3">
                  Hip Bags
                </a>
              </li>
              <li>
                <a href="#" className="block px-2 py-3">
                  Laptop Sleeves
                </a>
              </li>
            </ul>

            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                  aria-controls="filter-section-mobile-0"
                  aria-expanded="false"
                >
                  <span className="font-medium text-gray-900">Color</span>
                  <span className="ml-6 flex items-center">
                    {/* <!-- Expand icon, show/hide based on section open state. --> */}
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    {/* <!-- Collapse icon, show/hide based on section open state. --> */}
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
                  </span>
                </button>
              </h3>
              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div className="pt-6" id="filter-section-mobile-0">
                <div className="space-y-6">
                  <div className="flex items-center">
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
                      White
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-color-1"
                      name="color[]"
                      value="beige"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-color-1"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      Beige
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                  aria-controls="filter-section-mobile-1"
                  aria-expanded="false"
                >
                  <span className="font-medium text-gray-900">Category</span>
                  <span className="ml-6 flex items-center">
                    {/* <!-- Expand icon, show/hide based on section open state. --> */}
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    {/* <!-- Collapse icon, show/hide based on section open state. --> */}
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
                  </span>
                </button>
              </h3>
              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div className="pt-6" id="filter-section-mobile-1">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-category-0"
                      name="category[]"
                      value="new-arrivals"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-category-0"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      New Arrivals
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-category-1"
                      name="category[]"
                      value="sale"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-category-1"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      Sale
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="-mx-2 -my-3 flow-root">
                {/* <!-- Expand/collapse section button --> */}
                <button
                  type="button"
                  className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                  aria-controls="filter-section-mobile-2"
                  aria-expanded="false"
                >
                  <span className="font-medium text-gray-900">Size</span>
                  <span className="ml-6 flex items-center">
                    {/* <!-- Expand icon, show/hide based on section open state. --> */}
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    {/* <!-- Collapse icon, show/hide based on section open state. --> */}
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
                  </span>
                </button>
              </h3>
              {/* <!-- Filter section, show/hide based on section state. --> */}
              <div className="pt-6" id="filter-section-mobile-2">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-size-0"
                      name="size[]"
                      value="2l"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-size-0"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      2L
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="filter-mobile-size-1"
                      name="size[]"
                      value="6l"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="filter-mobile-size-1"
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      6L
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
