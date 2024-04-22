import { ICommentResponse } from '@/src/interfaces/post';
import Image from 'next/image';
import { getTimeAgo } from '@/src/helpers/getTimeAgo';
import { IoIosMore } from 'react-icons/io';
import { Dispatch, SetStateAction, useState } from 'react';
import { useStores } from '@/src/stores';
import { useMutation } from '@/src/utils/hooks';
import { IApiResponse } from '@/src/interfaces/common';
import { deleteComment } from '@/src/services/post.api';

export default function CommentCard({
  comment,
  creatorId,
  getCommentsMutation,
  setCommentCount,
}: {
  comment: ICommentResponse;
  creatorId: string;
  getCommentsMutation: () => void;
  setCommentCount: Dispatch<SetStateAction<number>>;
}) {
  const [showMore, setShowMore] = useState(false);
  const { userStore } = useStores();
  const [showDelete, setShowDelete] = useState(false);

  // HANDLE
  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleDeleteComment = () => {
    deleteCommentMutation.mutate(comment.id);
  };

  //QUERY
  const deleteCommentMutation = useMutation<IApiResponse<boolean>, string>(
    deleteComment,
    {
      onSuccess: (res) => {
        getCommentsMutation();
        setCommentCount((prev) => prev - 1);
      },
    }
  );
  return (
    <div
      className="flex flex-row items-center gap-2"
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => {
        setShowMore(false);
        setShowDelete(false);
      }}
    >
      <div className="relative w-10 h-10 rounded-full">
        <Image
          src={comment.userImage}
          alt="user avatar"
          fill
          className="rounded-full object-contain"
        ></Image>
      </div>
      <div className="bg-gray-100 rounded-2xl p-2">
        <div className="font-medium">
          {comment.userName}
          <span className="font-normal text-gray-400 ml-2 text-sm">
            {getTimeAgo(comment.isCreatedAt)}
          </span>
        </div>
        <div>{comment.content}</div>
      </div>
      <div className="">
        {showMore &&
          (userStore.userContext?.id === comment.userId ||
            userStore.userContext?.id === creatorId) && (
            <div className="relative w-full">
              <button
                className="ml-2 hover:bg-gray-100 rounded-full p-2"
                onClick={handleShowDelete}
              >
                <IoIosMore size={20} />
              </button>
              {showDelete && (
                <button
                  className="absolute  z-10 w-40 top-10 left-5 shadow-lg rounded-lg p-2"
                  onClick={handleDeleteComment}
                >
                  <div className="hover:bg-gray-100 flex items-center justify-center w-full font-medium">
                    Xoá bình luận
                  </div>
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
