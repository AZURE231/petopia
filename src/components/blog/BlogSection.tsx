"use client";
import React, { useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js for image optimization
import BlogCard from "./BlogCard";

interface BlogSectionProps {
  categories: string[];
  bannerImage: string;
  blogs: { id: string; [key: string]: any }[];
}

const BlogSection: React.FC<BlogSectionProps> = ({
  categories,
  bannerImage,
  blogs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0] // Initially select the first category
  );

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

      {/* Blog Cards */}
      {/* <div className="blog-grid">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div> */}

      {/* Pagination */}
      <div className="pagination">{/* Add Pagination component here */}</div>

      <style jsx>{`
        .underline {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;
