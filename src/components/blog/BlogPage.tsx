import React from 'react';
import Image from 'next/image';
import { IoEye } from 'react-icons/io5';

interface Props {
  blogTitle: string;
  htmlContent: string;
  view: number;
  userName: string;
  createdAt: string;
  userImage: string;
}

const BlogPage: React.FC<Props> = ({
  blogTitle,
  htmlContent,
  view,
  userName,
  createdAt,
  userImage,
}) => {
  // Modify only the images within the htmlContent
  const styledHTMLContent = htmlContent.replace(
    /<img/g,
    '<img style="display: block; margin: 0 auto; max-width: 500px; height: 500px; object-fit:contain;"'
  );

  return (
    <div
      className="container max-w-3xl mx-auto mt-10 p-5 justify-center"
      style={{ width: '1180px' }}
    >
      <h1 className="text-4xl font-bold">{blogTitle}</h1>
      <div className="flex justify-between items-center mt-5">
        <div className="text-gray-400 text-sm flex justify-center items-center">
          <div className="relative h-9 w-9">
            <Image
              src={userImage}
              alt="user-avatar"
              fill
              className="object-cover rounded-full"
            ></Image>
          </div>
          <span className="ml-2 items-center text-lg">
            {userName} - {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex justify-center items-center">
          <span className="text-gray-800 font-medium text-lg">{view}</span>
          <IoEye size={20} className="ml-2" />
        </div>
      </div>
      <div
        className="w-full text-justify mt-10"
        dangerouslySetInnerHTML={{ __html: styledHTMLContent }}
      />
      {/* <div className="container mx-auto mt-20 text-lg font-bold">
        CÓ THỂ BẠN QUAN TÂM
      </div>
      <div className="flex justify-center mt-10">
        <div className="blog-grid grid grid-cols-3 gap-12">
          {blogs.slice(0, 3).map((blog) => (
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
      </div> */}
    </div>
  );
};

export default BlogPage;
