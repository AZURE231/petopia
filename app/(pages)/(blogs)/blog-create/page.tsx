'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const CustomEditor = dynamic(
  () => import('@/src/components/text-editor/CustomEditor'),
  { ssr: false }
);

export default function page() {
  return (
    <div className="container max-wcontainer max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-5">
      <h1 className="text-4xl font-bold text-left my-5">Tạo Blog</h1>

      <CustomEditor initialData={''} initialTitle={''} />
    </div>
  );
}
