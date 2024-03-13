// Carousel.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);

  const nextImages = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 5));
  };

  const prevImages = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-60"
        onClick={prevImages}
      >
        <SlArrowLeft size={30} color="white" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        onClick={nextImages}
      >
        <SlArrowRight size={30} color="white" />
      </button>
      <div className="grid grid-cols-5 gap-x-3">
        {images.slice(startIndex, startIndex + 5).map((url, index) => (
          <div key={index} className="w-full relative pt-[100%]">
            <Image
              alt={`Image ${startIndex + index + 1}`}
              src={url}
              fill
              className="w-full h-3/4 top-0 left-0 rounded-lg"
              style={{ aspectRatio: '1/1', objectFit: 'cover' }}
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
