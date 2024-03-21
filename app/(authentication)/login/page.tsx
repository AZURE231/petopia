import React from 'react';
import { LoginForm } from '@/src/components/LoginForm';
import { Background } from '@/src/components/Background';

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
