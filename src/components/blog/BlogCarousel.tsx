import { IBlogAd } from '@/src/interfaces/blog';
import { IApiResponse } from '@/src/interfaces/common';
import { getBlogAd } from '@/src/services/blog.api';
import { QUERY_KEYS } from '@/src/utils/constants';
import { useQuery } from '@/src/utils/hooks';
import { useEffect, useState } from 'react';

export default function BlogCarousel() {
  const TRANSTION_DURATION = 5000;
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionDuration, setTransitionDuration] =
    useState(TRANSTION_DURATION);
  const [blogAd, setBlogAd] = useState<IBlogAd[]>([]);

  const getAdQuery = useQuery<IApiResponse<IBlogAd[]>>(
    [QUERY_KEYS.GET_BLOG_AD],
    () => getBlogAd(),
    {
      onSuccess: (data) => {
        setBlogAd(data.data.data);
      },
      onError: () => {
        // Handle error
      },
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        if (prevIndex === blogAd.length - 1) {
          getAdQuery.refetch();
          setTransitionDuration(TRANSTION_DURATION);
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    }, transitionDuration);
    console.log('activeIndex', activeIndex);
    return () => clearInterval(interval);
  }, [activeIndex, blogAd.length, getAdQuery, transitionDuration]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? blogAd.length - 1 : prevIndex - 1
    );
    setTransitionDuration(TRANSTION_DURATION); // Reset transition duration
  };

  const goToNextSlide = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === blogAd.length - 1) {
        getAdQuery.refetch();
        setTransitionDuration(TRANSTION_DURATION); // Reset transition duration
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  return (
    <div
      id="default-carousel"
      className="relative max-w-5xl"
      data-carousel="slide"
      style={{ height: '413px', width: '100%' }}
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {blogAd?.map((item, index) => (
          <div
            key={index}
            className={`absolute block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition duration-700 ease-in-out transform opacity-70 ${
              activeIndex === index ? 'visible' : 'hidden'
            }`}
            data-carousel-item
          >
            <img
              src={item.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center">
              <a href={`/blog/${blogAd[activeIndex].id}`}>
                <h2 className="text-white mb-14 font-extrabold text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] transition duration-300 hover:underline hover:text-yellow-500">
                  {item.title}
                </h2>
              </a>
              <p className="text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {item.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-0.5 left-1/2 space-x-3 rtl:space-x-reverse">
        {blogAd.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full border border-black ${
              activeIndex === index ? 'bg-black' : 'bg-white'
            }`}
            aria-current={activeIndex === index ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
        onClick={goToPrevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 group-hover:bg-black">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={goToNextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-300  group-hover:bg-black">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}
