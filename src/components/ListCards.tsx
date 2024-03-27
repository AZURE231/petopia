import { IPetResponse } from '../interfaces/pet';
import { PetCard } from './search/PetCard';

export default function ListCards({
  title,
  data,
}: {
  title: string;
  data: IPetResponse[];
}) {
  return (
    <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-20">
      <div className="text-lg font-bold mb-5">{title}</div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {data?.map((item) => (
          <PetCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
