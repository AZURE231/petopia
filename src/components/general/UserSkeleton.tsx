import CardSkeleton from './CardSkeleton';

export default function UserSkeleton() {
  return (
    <div>
      <div className="container animate-pulse max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-36">
        <div className="flex relative -mb-10">
          <div className="relative bottom-20 flex items-center justify-center w-48 h-48 bg-gray-300 rounded-full">
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
          <div>
            <div className="h-8 ml-5 bg-gray-200 rounded-full w-64 mb-4"></div>
          </div>
        </div>

        <div className="md:px-10">
          <div className="h-2.5 bg-gray-200 rounded-full w-72 mb-4"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-60 mb-4"></div>
          <div className="h-2.5 bg-gray-200 rounded-full w-[90] mb-4"></div>
        </div>
        <div className="mt-5 flex justify-end"></div>
      </div>
      <div className="container max-w-3xl p-5 mx-auto rounded-2xl mt-20">
        <div className="h-6 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
      {/* <ListCards title="Thú cưng của bạn" data={userInfo?.pets!} /></div> */}
    </div>
  );
}
