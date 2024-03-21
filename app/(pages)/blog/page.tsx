import Breadscrum from "@/src/components/Breadscrum";
import Image from "next/image";
import { Footer } from "@/src/components/Footer";
import BlogSection from "@/src/components/blog/BlogSection";

const categories = [
  "Sức khỏe",
  "Đời sống",
  "Công nghệ",
  "Thời trang",
  "Ẩm thực",
];

export default function page() {
  return (
    <div> 
    <div className="container mx-auto my-10">
      <Breadscrum />
      <div className="flex items-center justify-center mt-5">
        <Image
          alt="banner search"
          src={"/img/Banner.png"}
          width={1180}
          height={378}
        ></Image>
      </div>
      <div className="mt-20">
        <BlogSection
          categories={categories}
          bannerImage="/img/blog_banner.png"
          blogs={[]}
        />
      </div>
    </div>
    </div>
  );
}
