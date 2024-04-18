import Image from 'next/image';

export default function PetPost() {
  return (
    <div className="w-full flex items-center justify-center m-5">
      <div className="max-w-2xl bg-white border border-gray-200 rounded-lg shadow">
        <div className="relative w-full h-80">
          <Image
            className="rounded-t-lg object-contain"
            src="/img/avatar.png"
            alt=""
            fill
          />
        </div>
        <div className="p-5">
          <a href="#" className="flex flex-row items-center mb-2 gap-2">
            <div className="bg-red-400 w-10 h-10 rounded-full"></div>
            <h5 className=" text-xl font-bold tracking-tight text-gray-900">
              Huynh Vo Tuan
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
}
