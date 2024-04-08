import React from "react";
import BlogCard from "./BlogCard";

interface Blog {
  id: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
}

interface Props {
  blogTitle: string;
  htmlContent: string;
  blogs: Blog[];
}

const BlogPage: React.FC<Props> = ({ blogTitle, htmlContent, blogs }) => {
  return (
    <div className="container mx-auto mt-10 cols justify-center" style={{ width: "1080px" }}>
      <h1 className="text-4xl font-bold">{blogTitle}</h1>
      <div className="w-full text-justify mt-10" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <div className="container mx-auto mt-20 text-lg font-bold">CÓ THỂ BẠN QUAN TÂM</div>
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
      </div>
    </div>
  );
};

export default BlogPage;
