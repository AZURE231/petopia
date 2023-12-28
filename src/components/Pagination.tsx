export default function Pagination() {
  return (
    <div>
      <nav>
        <ul className="inline-flex space-x-1 text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white  rounded-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <svg
                className="w-6 h-6 text-gray-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight text-black font-bold bg-white  hover:bg-gray-100 hover:text-gray-700 "
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight text-black font-bold bg-white  hover:bg-gray-100 hover:text-gray-700 "
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex items-center justify-center rounded-lg px-3 h-8 text-black font-bold bg-yellow-300 hover:bg-yellow-400 hover:text-black "
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight text-black font-bold bg-white  hover:bg-gray-100 hover:text-gray-700 "
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center rounded-lg px-3 h-8 leading-tight text-black font-bold bg-white  hover:bg-gray-100 hover:text-gray-700 "
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-black font-bold bg-white  rounded-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <svg
                className="w-6 h-6 text-gray-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
