import Image from 'next/image';
import { useState } from 'react';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CommentCard from './CommentCard';
import { set } from 'mobx';

export default function PetPost() {
  // STATE
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComment, setShowComment] = useState(false);

  // HANDLE
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

  const handleCommentButton = () => {
    setShowComment(!showComment);
  };

  const handleDeleteButton = () => {
    console.log('Delete button clicked');
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
            <div className="flex flex-col">
              <h5 className=" text-xl font-bold tracking-tight text-gray-900">
                Huynh Vo Tuan
              </h5>
              <p className="text-sm font-normal text-gray-400">2 hours ago</p>
            </div>
          </a>
          <p className="mb-3 font-normal text-gray-700">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
        <div className="flex flex-row items-center gap-6 -mt-14 ">
          <div className="flex flex-row items-center">
            <button
              onClick={handleLikeButton}
              className={`heart ${isAnimating ? 'is_animating' : ''} ${
                isLiked ? 'liked' : ''
              }`}
            ></button>
            <div className="font-medium -ml-7 text-gray-400">199</div>
          </div>

          <button
            onClick={handleCommentButton}
            className="flex flex-row items-center gap-2"
          >
            <FaComment className="text-gray-400" size={30} />
            <div className="font-medium text-gray-400">199</div>
          </button>
          <button
            onClick={handleDeleteButton}
            className="flex flex-row items-center gap-2"
          >
            <MdDelete className="text-gray-400" size={30} />
          </button>
        </div>
        {showComment && (
          <div className="px-5 pb-5">
            <div className="flex flex-row items-center gap-2 mt-5 mb-5">
              <div className="bg-red-400 w-10 h-10 rounded-full"></div>
              <input
                type="text"
                className="flex-1 p-3 border border-gray-300 rounded-lg"
                placeholder="Thêm bình luận"
              />
            </div>
            <div className="flex flex-col gap-3">
              <CommentCard />
              <CommentCard />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
