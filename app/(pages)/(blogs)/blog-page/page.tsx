import Image from 'next/image';
import { STATIC_URLS } from '@/src/utils/constants';
import { blogs } from '@/app/(pages)/(blogs)/blog/blogs';
import BlogPage from '@/src/components/blog/BlogPage';

export default function Page() {
  const htmlContent = `
  <h2><strong>Duc anh:</strong></h2><figure class="image"><img style="aspect-ratio:845/1200;" src="https://i.ibb.co/HK3FCJX/GIz-ZOe-Ea-UAAz-N-n.jpg" width="845" height="1200"></figure><h2><strong>Hung:</strong></h2><figure class="image"><img style="aspect-ratio:1000/1476;" src="https://i.ibb.co/Fwds4fV/GIu-QSl-Sa-YAASt-O9.jpg" width="1000" height="1476"></figure><h2><strong>Tuan:</strong></h2><figure class="image"><img style="aspect-ratio:1000/1600;" src="https://i.ibb.co/xSfc2HL/GIo-T-XYaw-AA3-W2s.jpg" width="1000" height="1600"></figure><figure class="image"><img style="aspect-ratio:808/758;" src="https://i.ibb.co/HdwK4yG/Untitleggd.png" width="808" height="758"></figure><figure class="image"><img src="https://i.ibb.co/z7B6Gv9/436916092-3238820719748116-8776504512401591200-n.jpg"></figure>
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
