<<<<<<< HEAD


import Image from "next/image";

import BlogSection from "@/src/components/blog/BlogSection";
import { blogs } from "./blogs";
const categories = [
  "Sức khỏe",
  "Đời sống",
  "Công nghệ",
  "Thời trang",
  "Ẩm thực",
];
=======
import Image from 'next/image';
import BlogSection from '@/src/components/blog/BlogSection';
import { BLOG_CATEGORIES, STATIC_URLS } from '@/src/utils/constants';
>>>>>>> c276be220bb91637a72f082021870570d222baa6

export default function page() {
  return (
    <div>
      <div className="container mx-auto my-10">
        {/* <Breadscrum /> */}
        <div className="flex items-center justify-center mt-5">
          <Image
            alt="banner search"
<<<<<<< HEAD
            src={"/img/Banner.png"}
=======
            src={STATIC_URLS.BANNER}
>>>>>>> c276be220bb91637a72f082021870570d222baa6
            width={1180}
            height={378}
          ></Image>
        </div>
        <div className="mt-20">
          <BlogSection
<<<<<<< HEAD
            categories={categories}
            bannerImage="/img/blog_banner.png"
            blogs={blogs}
=======
            categories={BLOG_CATEGORIES}
            bannerImage={STATIC_URLS.BLOG_BANNER}
>>>>>>> c276be220bb91637a72f082021870570d222baa6
          />
        </div>
      </div>
    </div>
  );
}
