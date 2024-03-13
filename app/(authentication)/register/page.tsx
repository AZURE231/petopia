import React from 'react';
import { RegisterForm } from '@/src/components/RegisterForm';
import { Background } from '@/src/components/Background';

export default function page() {
  return (
    <div className="">
      <div className="absolute m-auto left-0 right-0 z-50">
        <RegisterForm />
      </div>
      <Background />
    </div>
  );
}
