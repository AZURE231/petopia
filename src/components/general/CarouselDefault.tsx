import { Carousel, IconButton } from '@material-tailwind/react';
import PetPost from '../post/PetPost';
import { useState } from 'react';

export function CarouselDefault() {
  const [showComment, setShowComment] = useState(false);
  const handleShowComment = () => {
    setShowComment(!showComment);
  };
  return (
    <Carousel
      className="rounded-xl bg-gray-50 mt-5"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-1 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={` block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-black' : 'w-4 bg-gray-300'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={() => {
            handlePrev();
            setShowComment(false);
          }}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={() => {
            handleNext();
            setShowComment(false);
          }}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <PetPost showComment={showComment} setShowComment={setShowComment} />
      <PetPost showComment={showComment} setShowComment={setShowComment} />
    </Carousel>
  );
}
