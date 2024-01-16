import { STATIC_URLS } from '../utils/constants';
import Image from 'next/image';

export const Background = () => {
  return (
    <div className="flex">
      <div className="bg-white h-screen w-1/2">
        <div className="h-screen relative">
          <Image
            className="object-cover"
            alt="girl and dog"
            src={STATIC_URLS.GIRL_DOG}
            fill={true}
          ></Image>
        </div>
      </div>
      <div className="bg-yellow-300 h-screen w-1/2">
        <div className="h-screen relative">
          <Image
            className="object-cover"
            alt="golden_retriever"
            src={STATIC_URLS.GOLDEN_RETRIEVER}
            fill={true}
          ></Image>
        </div>
      </div>
    </div>
  );
};