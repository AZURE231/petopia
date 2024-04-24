'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import BlogEditor from '@/src/components/text-editor/BlogEditor';



export default function page() {
  return (
    <div className="container max-wcontainer max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-5">
      <h1 className="text-4xl font-bold text-left my-5">Tạo Blog</h1>

      <BlogEditor initialData={''} initialTitle={''} />
    </div>
  );
}
