import Breadscrum from '@/src/components/Breadscrum';
import Image from 'next/image';
import { SearchPetSection } from '@/src/components/search/SearchPetSection';

export default function page() {
  return (
    <div>
      <div className="container mx-auto my-10">
        <Breadscrum />
        <div className="flex items-center justify-center mt-5">
          <Image
            alt="banner search"
            src={'/img/Banner.png'}
            width={1180}
            height={378}
          ></Image>
        </div>
        <div>
          <SearchPetSection />
        </div>
      </div>
    </div>
  );
}
