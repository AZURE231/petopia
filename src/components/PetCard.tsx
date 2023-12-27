import Image from 'next/image';

export default function PetCard() {
  return (
    <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-2xl shadow-lg ">
      <div className="flex flex-col">
        <div className="w-full relative pt-[100%]">
          <Image
            src={'/img/puppy.jpg'}
            alt="profile"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full top-0 left-0 object-cover rounded-2xl"
          ></Image>
        </div>

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Milu
          </h5>
          <h4 className="font-bold">Pomeranian White</h4>
          <div className="flex flex-row justify-between">
            <div>Giới tính: Đực</div>
            <div>Tuổi: 06 tháng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
