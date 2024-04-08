// src/components/BlogPage.tsx

import React from "react";

interface BlogPageProps {
  htmlContent: string; // HTML content for the blog
}

const BlogPage: React.FC<BlogPageProps> = ({ htmlContent }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default BlogPage;
