import Link from 'next/link';

export default function BlogCreateCard() {
  return (
    <div className="relative">
      <Link href={`/blog-create`}>
        <div className="max-w-xs p-2 h-full bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="flex flex-col">
            {/* Image with rounded corners */}
            <div className="relative w-full pt-[100%]">
              <div className="w-full h-full flex items-center justify-center bg-gray-200 border-dashed border border-gray-400 rounded-2xl">
                <span className="text-4xl text-gray-400">+</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-2 md:p-4">
              {/* Title */}
              <h2 className="text-xl font-bold mb-2 truncate">Tạo Blog</h2>
              {/* Excerpt */}
              {/* <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
