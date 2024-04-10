'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import BlogCard from './BlogCard';
import Pagination from '../general/Pagination';
import { blogs } from '@/app/(pages)/blog/blogs';
import { useForm } from 'react-hook-form';
import { IPaginationModel } from '@/src/interfaces/common';

interface BlogSectionProps {
  categories: string[];
  bannerImage: string;
}

const BlogSection: React.FC<BlogSectionProps> = ({
  categories,
  bannerImage,
}) => {

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );

  const paginationForm = useForm<IPaginationModel>({
    defaultValues: {
      pageIndex: 1,
      pageNumber: 1,
    }
  });

  return (
    <section className="blog-section">
      {/* Horizontal Navigation Bar */}
      <nav className="flex justify-center">
        <ul className="flex">
          {categories.map((category) => (
            <li
              key={category}
              className={`mr-4 ${selectedCategory === category ? 'underline' : ''
                }`}
            >
              <a role="button" onClick={() => setSelectedCategory(category)}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Banner */}
      <div className="flex items-center justify-center relative mt-5">
        <Image alt="blog banner" src={bannerImage} width={1246} height={413} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="">{selectedCategory}</h1>
          <h1 className="text-3xl font-bold mt-10">
            Richird Norton photorealistic rendering as real photos
          </h1>
          <p className="mt-10 font-thin">
            The rendering of the project is a process that is carried out
            throughout the project, from the first sketches to the final
            presentation.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="flex justify-center mt-8">
        <div className="blog-grid grid grid-cols-3 gap-12">
          {blogs.map((blog) => (
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

      <div className='mt-10 flex justify-center'>
        <Pagination
          paginationForm={paginationForm}
          disable={false}
          show={true}
        />
      </div>

      <style jsx>{`
        .underline {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
