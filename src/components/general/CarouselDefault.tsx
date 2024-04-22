import { Carousel, IconButton } from '@material-tailwind/react';
import PetPost from '../post/PetPost';
import { useState } from 'react';
import { useQuery } from '@/src/utils/hooks';
import { IApiErrorResponse, IApiResponse } from '@/src/interfaces/common';
import { IGetPostResponse } from '@/src/interfaces/post';
import { QUERY_KEYS } from '@/src/utils/constants';
import { getPetPosts } from '@/src/services/post.api';
import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';

export function CarouselDefault({
  petId,
  posts,
  query,
}: {
  petId: string;
  posts: IGetPostResponse[];
  query: UseQueryResult<
    AxiosResponse<IApiResponse<IGetPostResponse[]>, any>,
    AxiosResponse<IApiErrorResponse, any>
  >;
}) {
  // STATE
  const [showComment, setShowComment] = useState(false);

  return (
    <>
      {query.isLoading && <div>Loading...</div>}
      {posts && (
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
          {posts.map((post) => (
            <PetPost
              key={post.id}
              post={post}
              query={query}
              showComment={showComment}
              setShowComment={setShowComment}
            />
          ))}
        </Carousel>
      )}
    </>
  );
}
