import Image from 'next/image';
import { STATIC_URLS } from '@/src/utils/constants';
import { blogs } from '@/app/(pages)/blog/blogs';
import BlogPage from '@/src/components/blog/BlogPage';

export default function Page() {
  const htmlContent = `
  <h2><strong>CHIPPY CHIPPY CHAPPA CHAPPA</strong></h2><figure class="image"><img style="aspect-ratio:420/420;" src="https://i.ibb.co/vq3dgTK/Freshlycat.png" width="420" height="420"></figure>  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
  <img src="https://i.ibb.co/vq3dgTK/Freshlycat.png" width="420" height="420" style="display: block; margin: auto;">
</div><p>TUBI DU</p>
<div class="image-container">
  <figure class="image">
    <img style="aspect-ratio:843/844;" src="https://i.ibb.co/Wvm8RZ3/436916092-3238820719748116-8776504512401591200-n.jpg" width="843" height="844">
  </figure>
</div>
`;
  const blogTitle = 'Cầu nối cho quan hệ hữu nghị Việt Nam - Trung Quốc';

  return (
    <div>
      <div className="container mx-auto my-10">
        <div className="flex items-center justify-center mt-5">
          <Image
            alt="banner search"
            src={STATIC_URLS.BANNER}
            width={1180}
            height={378}
          />
        </div>
        <BlogPage
          blogTitle={blogTitle}
          htmlContent={htmlContent}
          blogs={blogs}
        />
      </div>
    </div>
  );
}
