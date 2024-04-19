import Image from 'next/image';
import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function PetPost() {
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleLikeButton = () => {
    setIsLiked(!isLiked);
    if (isLiked === false) {
      setIsAnimating(true);

      // Reset animation after 0.8s (same duration as CSS animation)
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  };
  return (
    <div className="w-full flex items-center justify-center my-5">
      <div className="max-w-sm md:max-w-2xl relative bg-white border border-gray-200 rounded-lg shadow">
        <div className="relative w-full h-80">
          <Image
            className="rounded-t-lg object-contain"
            src="/img/avatar.png"
            alt=""
            fill
          />
        </div>
        <div className="p-5">
          <a href="#" className="flex flex-row items-center mb-2 gap-2">
            <div className="bg-red-400 w-10 h-10 rounded-full"></div>
            <h5 className=" text-xl font-bold tracking-tight text-gray-900">
              Huynh Vo Tuan
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        <div className="absolute -top-3 -right-3 flex flex-row items-center gap-2">
          <div className="font-bold -mr-7">199</div>
          <button
            onClick={handleLikeButton}
            className={`heart ${isAnimating ? 'is_animating' : ''} ${
              isLiked ? 'liked' : ''
            }`}
          ></button>
        </div>
      </div>
    </div>
  );
}
