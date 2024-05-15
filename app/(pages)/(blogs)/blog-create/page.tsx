'use client';
import React from 'react';
import BlogEditor from '@/src/components/text-editor/BlogEditor';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạo blog - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function page() {
  return (
    <div className="container max-w-3xl p-5 mx-auto shadow-2xl rounded-2xl mt-5">
      <h1 className="text-4xl font-bold text-left my-5">Tạo Blog</h1>
      <BlogEditor />
    </div>
  );
}
