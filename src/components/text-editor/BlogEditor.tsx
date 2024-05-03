import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uploadAdapter from './UploadAdapter';
import { IBlog, IBlogResponse } from '@/src/interfaces/blog';
import { useForm } from 'react-hook-form';
import { BLOG_CATEGORIES_OPTION, QUERY_KEYS } from '@/src/utils/constants';
import Dropzone from '../general/Dropzone';
import { IApiResponse, IUploadImage } from '@/src/interfaces/common';
import { postImage } from '@/src/helpers/postImage';
import { getBlogDetail, postBlog } from '@/src/services/blog.api';
import { useMutation, useQuery } from '@/src/utils/hooks';
import { QueryProvider } from '../general/QueryProvider';
import { Alert } from '../general/Alert';

const BlogEditor = QueryProvider(({ id = '' }: { id?: string }) => {
  // STATE
  const [editorData, setEditorData] = useState('');

  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);

  const uploadImageForm = useForm<IUploadImage>({
    defaultValues: {
      showImages: [],
      files: [],
      images: [],
    },
  });

  const createBlogForm = useForm<IBlog>({
    defaultValues: {
      title: '',
      excerpt: '',
      image: '',
      category: 0,
      content: '',
    },
  });

  const uploadImage = async () => {
    const files = uploadImageForm.getValues('files');

    if (files && files.length > 0) {
      // Convert FileList to array
      const filesArray = Array.from(files);

      // Use Promise.all to await all image uploads
      await Promise.all(
        filesArray.map(async (file) => {
          const formData = new FormData();
          formData.append('image', file);
          const url: string = await postImage(formData);
          url && createBlogForm.setValue('image', url);
        })
      );
    }
    // setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Further actions for submitting the blog
    e.preventDefault();
    await uploadImage();
    postBlogMutation.mutate(createBlogForm.getValues());
  };

  useEffect(() => {
    ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
      extraPlugins: [uploadAdapter],
    })
      .then((editor: any) => {
        editor.setData(editorData);
        editor.model.document.on('change:data', () => {
          setEditorData(editor.getData());
        });
      })
      .catch((error: any) => {
        console.error('There was a problem initializing the editor.', error);
      });
  }, [editorData]);

  // QUERY
  const postBlogMutation = useMutation<IApiResponse<string>, IBlog>(postBlog, {
    onError: (err) => {
      setAlertMessage('Đăng bài thất bại');
      setAlertFailed(true);
      setAlertShow(true);
    },
    onSuccess: () => {
      setAlertMessage('Đăng bài thành công');
      setAlertFailed(false);
      setAlertShow(true);
    },
  });

  useQuery<IApiResponse<IBlogResponse>>(
    [QUERY_KEYS.GET_BREED_DETAIL],
    () => getBlogDetail(id),
    {
      onSuccess: (res) => {
        createBlogForm.setValue('title', res.data.data.title);
        createBlogForm.setValue('excerpt', res.data.data.excerpt);
        createBlogForm.setValue('image', res.data.data.image);
        createBlogForm.setValue('category', res.data.data.category);
        createBlogForm.setValue('content', res.data.data.content);
        uploadImageForm.setValue('showImages', [res.data.data.image]);
        setEditorData(res.data.data.content);
      },
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tiêu đề bài viết"
          value={createBlogForm.watch('title')}
          onChange={(e) => createBlogForm.setValue('title', e.target.value)}
          className="w-full p-3 px-8 rounded-full font-bold shadow-md bg-white border border-gray-300 mb-5"
          maxLength={50}
        />
        <input
          type="text"
          placeholder="Nhập mô tả ngắn cho bài viết"
          value={createBlogForm.watch('excerpt')}
          onChange={(e) => createBlogForm.setValue('excerpt', e.target.value)}
          className="w-full p-3 px-8 rounded-full font-bold shadow-md bg-white border border-gray-300 mb-5"
          maxLength={200}
        />
        <div>
          <div className="block font-bold mb-2">Tải ảnh bìa lên</div>
          <Dropzone
            setValue={uploadImageForm.setValue}
            watch={uploadImageForm.watch}
            imagesNumber={1}
          />
        </div>
        <label htmlFor="category" className="block font-bold mb-2">
          Chọn danh mục
        </label>
        <select
          id="category"
          name="owner-time"
          className="w-fit px-10 p-3 border border-gray-300 rounded-lg mb-5"
          onChange={(e) =>
            createBlogForm.setValue('category', Number(e.target.value))
          }
        >
          {BLOG_CATEGORIES_OPTION.map((category) => (
            <option key={category.label} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <CKEditor
          editor={ClassicEditor as any}
          data={editorData}
          onChange={(event, editor) => {
            const data = editor.getData();
            createBlogForm.setValue('content', data);
          }}
          config={{
            extraPlugins: [uploadAdapter],
          }}
        />
        <button className="w-fit p-3 px-8 rounded-full font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 my-5">
          Đăng bài
        </button>
      </form>
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
      />
    </div>
  );
});

export default BlogEditor;
