"use client";
import React, { useState } from "react";
import Image from "next/image";
import BlogCard from "./BlogCard";

interface BlogSectionProps {
  categories: string[];
  bannerImage: string;
  blogs: {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    image: string;
  }[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  categories,
  bannerImage,
  blogs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0]
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const blogsPerPage = 9;

  // Filter blogs based on selected category
  const filteredBlogs = blogs.filter(
    (blog) => blog.category === selectedCategory
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Calculate index of the last blog on the current page
  const indexOfLastBlog = currentPage * blogsPerPage;

  // Calculate index of the first blog on the current page
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  // Get current blogs to display on the current page
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Function to handle page change
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="blog-section">
      {/* Horizontal Navigation Bar */}
      <nav className="flex justify-center">
        <ul className="flex">
          {categories.map((category) => (
            <li
              key={category}
              className={`mr-4 ${
                selectedCategory === category ? "underline" : ""
              }`}
            >
              <a href={`#`} onClick={() => setSelectedCategory(category)}>
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
          {currentBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              excerpt={blog.excerpt}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination mt-10 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-10 text-base">
            {/* Previous Button */}
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                disabled={currentPage === 1}
              >
                <img
                  src="/img/left_arrow.svg"
                  alt="Previous"
                  className="h-5 w-5 text-003459"
                />
              </button>
            </li>
            {/* Page Buttons */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => onPageChange(index + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight ${
                    currentPage === index + 1
                      ? "text-white bg-black"
                      : "text-black bg-white"
                  } border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            {/* Next Button */}
            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                disabled={currentPage === totalPages}
              >
                <img
                  src="/img/right_arrow.svg"
                  alt="Next"
                  className="h-5 w-5 text-003459"
                />
              </button>
            </li>
          </ul>
        </nav>
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
