import React from 'react';

export default function CommentSkeleton() {
  return (
    <div className="flex flex-row items-center gap-2 animate-pulse">
      <div className="relative w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="bg-gray-200 w-52 h-20 rounded-2xl p-2"></div>
    </div>
  );
}
