import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function QueryButton({
  testId,
  name,
  isLoading,
  action = undefined,
}: {
  testId?: string;
  name: string;
  isLoading: boolean;
  action?: () => void;
}) {
  return (
    <button
      test-id={testId}
      type={action ? 'button' : 'submit'}
      className="w-full text-black bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:outline-none 
      focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      onClick={() => action && action()}
    >
      {name}
      <span className="ml-2">
        <ClipLoader
          color={'#000000'}
          loading={isLoading}
          size={14}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </span>
    </button>
  );
}
