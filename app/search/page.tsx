import Breadscrum from '@/src/components/Breadscrum';
import FilterBar from '@/src/components/FilterBar';
import FilterBarMobile from '@/src/components/FilterBarMobile';
import Image from 'next/image';

export default function page() {
  return (
    <div className="container mx-auto bg-red-600 my-5">
      <Breadscrum />
      <div>
        <Image
          alt="banner search"
          src={'/img/Banner.png'}
          width={1180}
          height={378}
        ></Image>
      </div>
      <div>
        <FilterBarMobile />
        <FilterBar />
      </div>
    </div>
  );
}
