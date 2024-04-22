import Image from 'next/image';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FaComment } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import CommentCard from './CommentCard';
import { IoSend } from 'react-icons/io5';
import {
  ICommentPost,
  ICommentResponse,
  IGetPostResponse,
} from '@/src/interfaces/post';
import { getTimeAgo } from '@/src/helpers/getTimeAgo';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import {
  getCommentsPost,
  likePost,
  sendCommentPost,
} from '@/src/services/post.api';
import ImageCarousel from '@/src/components/general/Carousel';
import CommentSkeleton from '../general/CommentSkeleton';
import { useStores } from '@/src/stores';

export default function PetPost({
  post,
  showComment,
  setShowComment,
  setCurrentPostId,
  setAlertShow,
}: {
  post: IGetPostResponse;
  showComment: boolean;
  setShowComment: (showComment: boolean) => void;
  setCurrentPostId: Dispatch<SetStateAction<string>>;
  setAlertShow: Dispatch<SetStateAction<boolean>>;
}) {
  // STATE
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImage, setCurrentImage] = useState(post.images[0]);
  const [comments, setComments] = useState<ICommentResponse[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [commentNumber, setCommentNumber] = useState(post.commentCount);
  const { userStore } = useStores();

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
    setCurrentPostId(post.id);
    setAlertShow(true);
  };

  const handleSentComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendCommentMutation.mutate({ postId: post.id, content: commentContent });
    setCommentContent('');
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

  const sendCommentMutation = useMutation<
    IApiResponse<ICommentResponse>,
    ICommentPost
  >(sendCommentPost, {
    onSuccess: (res) => {
      setComments([res.data.data, ...comments]);
      setCommentNumber(commentNumber + 1);
    },
  });

  return (
    <div>
      <div className="w-full flex items-center justify-center my-5">
        <div className="w-96 md:w-[600px] relative bg-white border border-gray-200 rounded-lg shadow">
          {/* Image carousel */}
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
            {/* User post avatar and name */}
            <a
              href={`/user/${post.creatorId}`}
              className="flex flex-row items-center mb-2 gap-2"
            >
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
            {/* Post content */}
            <p className="mb-3 font-normal text-gray-700">{post.content}</p>
          </div>
          {/* Like, comment, delete button */}
          <div className="flex flex-row items-center gap-6 -mt-10 ">
            <div className="flex flex-row items-center">
              <button
                onClick={handleLikeButton}
                className={`heart ${isAnimating ? 'is_animating' : ''} ${
                  isLiked ? 'liked' : ''
                }`}
              ></button>
              <div className="font-medium -ml-4 text-gray-400">{post.like}</div>
            </div>
            <button
              onClick={handleCommentButton}
              className="flex flex-row items-center gap-2"
            >
              <FaComment className="text-gray-400" size={20} />
              <div className="font-medium text-gray-400">{commentNumber}</div>
            </button>
            <button
              onClick={handleDeleteButton}
              className="flex flex-row items-center gap-2"
            >
              <MdDelete className="text-gray-400" size={20} />
            </button>
          </div>
          {/* Comment section */}
          {showComment && (
            <div className="px-5 pb-5">
              {/* Comment input */}
              <div className="flex flex-row items-center gap-2 mt-5 mb-5">
                <div className="relative w-10 h-10 rounded-full">
                  <Image
                    src={userStore.userContext?.image || '/img/no-avatar.png'}
                    alt="user avatar"
                    fill
                    className="rounded-full object-contain"
                  ></Image>
                </div>
                <form
                  onSubmit={handleSentComment}
                  className="relative flex-1 items-center"
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Thêm bình luận"
                    onChange={(e) => setCommentContent(e.target.value)}
                    value={commentContent}
                  />
                  <button
                    className={`absolute h-full right-0 top-0 p-3 flex items-center justify-center ${
                      commentContent === '' ? '' : 'hover:text-blue-500'
                    } `}
                    type="submit"
                    disabled={commentContent === ''}
                  >
                    <IoSend size={20} />
                  </button>
                </form>
              </div>
              {/* Comments */}
              <div className="flex flex-col gap-3 overflow-y-auto max-h-96">
                {getCommentMutation.isLoading ? (
                  <CommentSkeleton />
                ) : (
                  comments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      creatorId={post.creatorId}
                      getCommentsMutation={() =>
                        getCommentMutation.mutate(post.id)
                      }
                      setCommentCount={setCommentNumber}
                    />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
