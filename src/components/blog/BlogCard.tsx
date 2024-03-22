import React from "react";

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  excerpt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  category,
  title,
  excerpt,
}) => {
  return (
    <div
      className="blog-card rounded-lg overflow-hidden border border-gray-200 relative"
      style={{ width: "380px", height: "424px" }}
    >
      {/* Image with rounded corners */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover object-center rounded-t-lg mt-2 ml-2"
          style={{ width: "364px", height: "240px" }}
        />
        {/* Category */}
        <div className="bg-yellow-400 text-black text-xs font-bold uppercase px-2 py-1 absolute top-0 left-0 rounded-br-lg">
          {category}
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
  );
};

export default BlogCard;
