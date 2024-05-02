import { IBlogCardResponse, IBlogResponse } from '@/src/interfaces/blog';
import React, { useState } from 'react';
import Image from 'next/image';
import { BLOG_CATEGORIES_OPTION } from '@/src/utils/constants';
import Link from 'next/link';
import { CiEdit } from 'react-icons/ci';
import Popup from 'reactjs-popup';
import { MdDelete } from 'react-icons/md';
import { Alert } from '../general/Alert';
import { useMutation } from '@/src/utils/hooks';
import { deleteBlog } from '@/src/services/blog.api';

interface IBlogCard extends IBlogCardResponse {
  isEditable?: boolean;
}

const BlogCard = ({
  id,
  image,
  category,
  title,
  excerpt,
  isEditable,
}: IBlogCard) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => {
    window.location.reload();
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowAlert(true);
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowEdit(!showEdit);
  };

  const deleteBlogMutation = useMutation(deleteBlog, {
    onSuccess: () => {
      console.log('Delete blog success');
      window.location.reload();
    },
  });

  const deleteBlogFunc = () => {
    console.log('Delete pet', id);
    deleteBlogMutation.mutate(id);
  };
  return (
    <div className="relative">
      <Link href={`/blog/${id}`}>
        <div className="max-w-xs p-2 h-full bg-white border border-gray-200 rounded-2xl shadow-lg">
          <div className="flex flex-col" key={id}>
            {/* Image with rounded corners */}
            <div className="relative w-full pt-[100%]">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-full top-0 left-0 object-cover rounded-2xl"
              />
              {/* Category */}
              <div className="bg-yellow-400 text-black text-xs font-bold uppercase px-2 py-1 absolute top-0 left-0 rounded-br-lg">
                {BLOG_CATEGORIES_OPTION[category + 1].label}
              </div>
            </div>
            {/* Content */}
            <div className="p-2 md:p-4">
              {/* Title */}
              <h2 className="text-xl font-bold mb-2 truncate">{title}</h2>
              {/* Excerpt */}
              <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>
            </div>
          </div>
        </div>
      </Link>
      {isEditable && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Popup
            modal
            overlayStyle={{ background: 'rgba(0, 0, 0, 0.5)' }}
            trigger={
              <button
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                onClick={handleEdit}
              >
                <CiEdit size={20} />
              </button>
            }
          >
            haha{/* <PetProfileForm id={id} handleClose={handleClose} /> */}
          </Popup>

          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handleDelete}
          >
            <MdDelete size={20} />
          </button>
        </div>
      )}
      <Alert
        message={'Bạn có chắc muốn xoá không?'}
        failed={true}
        show={showAlert}
        title="Xác nhận xoá"
        setShow={setShowAlert}
        action={deleteBlogFunc}
      />
    </div>
  );
};

export default BlogCard;
