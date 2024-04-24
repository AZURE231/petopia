import { IPetResponse } from '@/src/interfaces/pet';
import { PetCard } from '../search/PetCard';

export default function SeeMore({ petList }: { petList: IPetResponse[] }) {
  return (
    <div className="container max-w-5xl mx-auto p-5 shadow-2xl rounded-2xl my-5">
      <div className="my-5 text-2xl font-bold">Thú cưng khác</div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-3">
        {petList.map((pet) => (
          <PetCard key={pet.id} {...pet} />
        ))}
      </div>
    </div>
  );
}
