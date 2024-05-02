import { IBlogCardResponse, IBlogResponse } from '@/src/interfaces/blog';
import React from 'react';
import Image from 'next/image';
import { BLOG_CATEGORIES_OPTION } from '@/src/utils/constants';
import Link from 'next/link';

const BlogCard = ({
  id,
  image,
  category,
  title,
  excerpt,
}: IBlogCardResponse) => {
  return (
    <Link href={`/blog/${id}`}>
      <div className="max-w-xs p-2 h-full bg-white border border-gray-200 rounded-2xl shadow-lg">
        <div className="flex flex-col" key={id}>
          {/* Image with rounded corners */}
          <div className="relative w-full pt-[100%]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full h-full top-0 left-0 object-cover rounded-2xl"
            />
            {/* Category */}
            <div className="bg-yellow-400 text-black text-xs font-bold uppercase px-2 py-1 absolute top-0 left-0 rounded-br-lg">
              {BLOG_CATEGORIES_OPTION[category + 1].label}
            </div>
          </div>
          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            {/* Excerpt */}
            <p className="text-sm text-gray-600">{excerpt}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
