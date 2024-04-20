import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CommentCard from './CommentCard';
import { IoSend } from 'react-icons/io5';
import { ICommentResponse, IGetPostResponse } from '@/src/interfaces/post';
import { getTimeAgo } from '@/src/helpers/getTimeAgo';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { getCommentsPost, likePost } from '@/src/services/post.api';
import ImageCarousel from '@/src/components/general/Carousel';

export default function PetPost({
  post,
  showComment,
  setShowComment,
}: {
  post: IGetPostResponse;
  showComment: boolean;
  setShowComment: (showComment: boolean) => void;
}) {
  // STATE
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImage, setCurrentImage] = useState(post.images[0]);
  const [comments, setComments] = useState<ICommentResponse[]>([]);

  useEffect(() => {
    setIsLiked(post.isLiked);
  }, [post.isLiked]);

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
    likeMutation.mutate(post.id);
  };

  const handleCommentButton = () => {
    setShowComment(!showComment);
    if (!showComment) {
      getCommentMutation.mutate(post.id);
    }
  };

  const handleDeleteButton = () => {
    console.log('Delete button clicked');
  };

  const handleSentComment = () => {
    console.log('Sent comment');
  };

  //QUERY
  const likeMutation = useMutation<IApiResponse<number>, string>(likePost, {
    onSuccess: (res) => {
      post.like = res.data.data;
    },
  });

  const getCommentMutation = useMutation<
    IApiResponse<ICommentResponse[]>,
    string
  >(getCommentsPost, {
    onSuccess: (res) => {
      setComments(res.data.data);
    },
  });

  const sentCommentMutation = useMutation<
    IApiResponse<ICommentResponse[]>,
    string
  >(getCommentsPost, {
    onSuccess: (res) => {
      setComments(res.data.data);
    },
  });

  return (
    <div className="w-full flex items-center justify-center my-5">
      <div className="w-96 md:w-[600px] relative bg-white border border-gray-200 rounded-lg shadow">
        <div className="relative w-full h-80">
          <Image
            className="rounded-t-lg object-contain"
            src={currentImage}
            alt="post image"
            fill
          />
        </div>
        <div className="mt-5 flex items-center justify-center">
          <ImageCarousel
            disPlayedImage={currentImage}
            setDisplayedImage={setCurrentImage}
            images={post.images}
          />
        </div>
        <div className="p-5">
          <a href="#" className="flex flex-row items-center mb-2 gap-2">
            <div className="relative w-10 h-10 rounded-full">
              <Image
                className="rounded-full object-contain"
                src={post.userImage}
                alt=""
                fill
              />
            </div>
            <div className="flex flex-col">
              <h5 className=" text-xl font-bold tracking-tight text-gray-900">
                {post.userName}
              </h5>
              <p className="text-sm font-normal text-gray-400">
                {getTimeAgo(post.isCreatedAt)}
              </p>
            </div>
          </a>
          <p className="mb-3 font-normal text-gray-700">{post.content}</p>
        </div>
        <div className="flex flex-row items-center gap-6 -mt-14 ">
          <div className="flex flex-row items-center">
            <button
              onClick={handleLikeButton}
              className={`heart ${isAnimating ? 'is_animating' : ''} ${
                isLiked ? 'liked' : ''
              }`}
            ></button>
            <div className="font-medium -ml-7 text-gray-400">{post.like}</div>
          </div>

          <button
            onClick={handleCommentButton}
            className="flex flex-row items-center gap-2"
          >
            <FaComment className="text-gray-400" size={30} />
            <div className="font-medium text-gray-400">{post.commentCount}</div>
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
            {/* Comment input */}
            <div className="flex flex-row items-center gap-2 mt-5 mb-5">
              <div className="bg-red-400 w-10 h-10 rounded-full"></div>
              <div className="relative flex-1 items-center">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Thêm bình luận"
                />
                <button
                  className="absolute right-0 top-0 p-3 hover:text-blue-500"
                  onClick={handleSentComment}
                >
                  <IoSend size={20} />
                </button>
              </div>
            </div>
            {/* Comments */}
            <div className="flex flex-col gap-3">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
