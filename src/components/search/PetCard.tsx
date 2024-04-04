import { getPetAgeText, getPetSexText } from '@/src/helpers/getPetTextDetails';
import { IPetResponse } from '@/src/interfaces/pet';
import Image from 'next/image';
import Link from 'next/link';

export function PetCard(props: IPetResponse) {
  const { id, name, breed, sex, age, image } = props;

  return (
    <Link href={`/pet/${id}`}>
      <div className="max-w-xs p-2 bg-white border border-gray-200 rounded-2xl shadow-lg ">
        <div className="flex flex-col">
          <div className="w-full relative pt-[100%]">
            {image ? (
              <Image
                src={image}
                alt="profile"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full top-0 left-0 object-cover rounded-2xl"
              ></Image>
            ) : null}
          </div>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {name}
            </h5>
            <h4 className="font-bold">{breed}</h4>
            <div className="flex flex-row justify-between">
              <div>{`Giới tính: ${getPetSexText(sex)}`}</div>
              <div>{`Tuổi: ${getPetAgeText(age)}`}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
