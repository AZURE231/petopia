'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import BlogCard from './BlogCard';
import Pagination from '../general/Pagination';
import { getBlogs } from '@/src/services/blog.api';
import { useForm } from 'react-hook-form';
import { IApiResponse, IPaginationModel } from '@/src/interfaces/common';
import {
  BLOG_CATEGORIES_OPTION,
  PAGE_SIZE,
  QUERY_KEYS,
} from '@/src/utils/constants';

import { IBlogCardResponse, IBlogResponse } from '@/src/interfaces/blog';
import { useQuery } from '@/src/utils/hooks';
import { QueryProvider } from '../general/QueryProvider';
import CardSkeleton from '../general/CardSkeleton';

interface BlogSectionProps {
  bannerImage: string;
}

const BlogSection = QueryProvider(({ props }: { props: BlogSectionProps }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [blogs, setBlogs] = useState<IBlogCardResponse[]>([]);
  const [filteredBlogs, setFilteredBlogs] =
    useState<IBlogCardResponse[]>(blogs);

  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    },
  });

  const getBlogsQuery = useQuery<IApiResponse<IBlogResponse[]>>(
    [QUERY_KEYS.GET_BLOGS],
    () =>
      getBlogs({
        pageIndex: paginationForm.getValues('pageIndex'),
        pageSize: PAGE_SIZE,
        filter: selectedCategory,
      }),
    {
      onSuccess: (res) => {
        const { data, pageNumber } = res.data;
        setBlogs(data);
        setFilteredBlogs(data);
        pageNumber && paginationForm.setValue('pageNumber', pageNumber);
      },
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (selectedCategory === -1) {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <section className="blog-section">
      {/* Horizontal Navigation Bar */}
      <nav className="flex justify-center">
        {
          <ul className="flex">
            {BLOG_CATEGORIES_OPTION.map((category) => (
              <li
                key={category.value}
                className={`mr-5 cursor-pointer ${
                  selectedCategory === category.value ? 'underline' : ''
                }`}
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </li>
            ))}
          </ul>
        }
      </nav>

      {/* Banner */}
      <div className="flex items-center justify-center relative mt-5">
        <Image
          alt="blog banner"
          src={props.bannerImage}
          width={1246}
          height={413}
        />
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <div className="bg-red-600">
            <h1 className="">
              {selectedCategory === -1
                ? 'Tất cả'
                : BLOG_CATEGORIES_OPTION[selectedCategory].label}
            </h1>

            <h1 className="text-md md:text-3xl font-bold mt-10">
              Richird Norton photorealistic rendering as real photos
            </h1>
            <p className="mt-10 font-thin">
              The rendering of the project is a process that is carried out
              throughout the project, from the first sketches to the final
              presentation.
            </p>
          </div>
        </div> */}
      </div>

      {/* Blog Cards Grid */}
      <div className="flex justify-center mt-8">
        <div className="blog-grid grid grid-cols-2 md:grid-cols-3 gap-3">
          {getBlogsQuery.isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          {!getBlogsQuery.isLoading &&
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                image={blog.image}
                category={blog.category}
                title={blog.title}
                excerpt={blog.excerpt}
              />
            ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Pagination
          paginationForm={paginationForm}
          disable={false}
          show={true}
        />
      </div>
    </section>
  );
});

export default BlogSection;
