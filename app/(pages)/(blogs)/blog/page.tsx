import BlogSection from '@/src/components/blog/BlogSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tin tức - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function page() {
  return (
    <div>
      <div className="container mx-auto my-10">
        <div className="mt-20">
          <BlogSection />
        </div>
      </div>
    </div>
  );
}
