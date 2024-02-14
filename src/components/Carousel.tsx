// Carousel.tsx
import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    console.log('startIndex changed:', startIndex);
  }, [startIndex]);

  const nextImages = () => {
    console.log('Next Clicked');
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 5));
  };

  const prevImages = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={prevImages}
      >
        Previous
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={nextImages}
      >
        Next
      </button>
      <div className="grid grid-cols-5 gap-x-3">
        {images.slice(startIndex, startIndex + 5).map((url, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              src={url}
              alt={`Image ${startIndex + index + 1}`}
              className="w-full h-auto"
              style={{ aspectRatio: '1/1', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
      {startIndex}
    </div>
  );
};

export default Carousel;
