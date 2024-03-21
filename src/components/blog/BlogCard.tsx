
interface BlogCardProps { 
    title: string; 
    image: string; 
    excerpt: string; 
    link: string; 
}


const BlogCard: React.FC<BlogCardProps>= ({ title, image, excerpt, link }) => {
    return (
      <div className="blog-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <a href={link}>Read More</a>
      </div>
    );
  };
  
  export default BlogCard;