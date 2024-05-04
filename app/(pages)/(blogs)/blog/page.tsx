import Image from 'next/image';
import BlogSection from '@/src/components/blog/BlogSection';
import { STATIC_URLS } from '@/src/utils/constants';

export default function page() {
  return (
    <div>
      <div className="container mx-auto my-10">
        <div className="mt-20">
          <BlogSection props={{ bannerImage: STATIC_URLS.BLOG_BANNER }} />
        </div>
      </div>
    </div>
  );
}
