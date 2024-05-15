import Image from 'next/image';
import { SearchPetSection } from '@/src/components/search/SearchPetSection';
import { STATIC_URLS } from '@/src/utils/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tìm kiếm - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function page() {
  return (
    <div>
      <div className="container mx-auto">
        {/* <Breadscrum /> */}
        <div className="flex items-center justify-center mt-5">
          <Image
            alt="banner search"
            src={STATIC_URLS.BANNER}
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
