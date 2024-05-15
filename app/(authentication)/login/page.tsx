import React from 'react';
import { LoginForm } from '@/src/components/login/LoginForm';
import { Background } from '@/src/components/general/Background';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng nhập - Petopia',
  description: 'Nền tảng nhận nuôi thú cưng trực tuyến',
};

export default function page() {
  return (
    <div className="">
      <div className="absolute m-auto left-0 right-0 z-50">
        <LoginForm />
      </div>
      <Background />
    </div>
  );
}
