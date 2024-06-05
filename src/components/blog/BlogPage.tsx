import React from 'react';
import Image from 'next/image';
import { IoEye } from 'react-icons/io5';
import { ReportBlock } from '../general/ReportBlock';
import { REPORT_ENTITY } from '@/src/utils/constants';

interface Props {
  blogId: string;
  blogTitle: string;
  htmlContent: string;
  view: number;
  userName: string;
  createdAt: string;
  userImage: string;
}

const BlogPage: React.FC<Props> = ({
  blogId,
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
    '<img style="display: block; margin: 0 auto; max-width: 90%; height: auto; object-fit:contain; margin-top: 20px; margin-bottom: 20px;"'
  );


  return (
    <div
      className="relative container max-w-5xl mx-auto mt-10 p-5 justify-center w-full"
    >
      <h1 test-id="blog-page-title" className="text-4xl font-bold">{blogTitle}</h1>
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

        <div className="flex gap-5">
          <div className="flex justify-center items-center">
            <span className="text-gray-800 font-medium text-lg">{view}</span>
            <IoEye size={20} className="ml-2" />
          </div>
          <ReportBlock
            id={blogId}
            type={REPORT_ENTITY.Blog}
          />
        </div>
      </div>
      <div
        className="w-full text-justify mt-10"
        dangerouslySetInnerHTML={{ __html: styledHTMLContent }}
      />
    </div>
  );
};

export default BlogPage;
