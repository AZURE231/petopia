// Carousel.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface CarouselProps {
  images: string[];
  disPlayedImage: string;
  setDisplayedImage: Dispatch<SetStateAction<string>>;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  setDisplayedImage,
  disPlayedImage,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextImages = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 5, images.length - 1));
  };

  const prevImages = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  return (
    <div className="relative  w-fit">
      {images.length > 5 && (
        <>
          <button
            className="absolute rounded left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60"
            onClick={prevImages}
          >
            <SlArrowLeft size={30} color="white" />
          </button>
          <button
            className="absolute rounded right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60"
            onClick={nextImages}
          >
            <SlArrowRight size={30} color="white" />
          </button>
        </>
      )}
      <div className="flex flex-row gap-x-3">
        {images.slice(startIndex, startIndex + 5).map((url, index) => (
          <div
            key={index}
            className="w-20 h-20 relative cursor-pointer"
            onClick={() => setDisplayedImage(url)}
          >
            <Image
              alt={`Image ${startIndex + index + 1}`}
              src={url}
              fill
              className={`${
                url == disPlayedImage && 'border-4 border-blue-600'
              } rounded-lg`}
              style={{ aspectRatio: '1/1', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
