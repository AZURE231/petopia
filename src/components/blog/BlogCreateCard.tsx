import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { STATIC_URLS } from '@/src/utils/constants';

export default function BlogCreateCard() {
  const [styleHover, setStyleHover] = useState('opacity-0');
  const handleMouseEnter = () => {
    setStyleHover('opacity-10');
  };

  const handleMouseLeave = () => {
    setStyleHover('opacity-0');
  };

  return (
    <Link
      href={'/blog-create'}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div test-id="blog-create-card" className="max-w-xs p-2 h-full bg-white border border-gray-200 rounded-2xl shadow-lg">
        <div className="flex flex-col">
          {/* Image with rounded corners */}
          <div className="relative w-full pt-[100%]">
            <Image
              src={STATIC_URLS.BLOG_CREATE_CARD}
              alt="create blog"
              fill
              className="rounded-t-2xl object-cover"
            ></Image>
          </div>
          {/* Content */}
          <div className="p-2 md:p-4">
            {/* Title */}
            <h2 className="text-xl text-center font-bold mb-2 truncate">
              Tạo Blog
            </h2>
            <div className="w-full h-full flex items-center justify-center bg-gray-200 border-dashed border border-gray-400 rounded-2xl">
              <span className="text-4xl text-gray-400">+</span>
            </div>
          </div>
        </div>
      </div>
      {/* Hover effect */}
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-2xl bg-black ${styleHover}`}
      ></div>
    </Link>
  );
}
