import React from 'react';
import { ClipLoader } from 'react-spinners';

export default function QueryButton({
  name,
  isLoading,
}: {
  name: string;
  isLoading: boolean;
}) {
  return (
    <button
      type="submit"
      className="w-full text-black bg-yellow-300 hover:bg-primary-700 focus:ring-4 focus:outline-none 
      focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
