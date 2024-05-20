import React, { useState, useEffect } from 'react';
import uploadAdapter from './UploadAdapter';
import { IBlog, IBlogResponse, IBlogUpdate } from '@/src/interfaces/blog';
import { useForm } from 'react-hook-form';
import { BLOG_CATEGORIES_OPTION, QUERY_KEYS } from '@/src/utils/constants';
import Dropzone from '../general/Dropzone';
import { IApiResponse, IUploadImage } from '@/src/interfaces/common';
import { postImage } from '@/src/helpers/postImage';
import { getBlogDetail, postBlog, updateBlog } from '@/src/services/blog.api';
import { useMutation, useQuery, useRunOnce } from '@/src/utils/hooks';
import { QueryProvider } from '../general/QueryProvider';
import { Alert } from '../general/Alert';
import QueryButton from '../general/QueryButton';

const BlogEditor = QueryProvider(({ id = '' }: { id?: string }) => {
  // STATE
  const [content, setContent] = useState<string>('');
  const [alertShow, setAlertShow] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertFailed, setAlertFailed] = useState<boolean>(false);
  const [myEditor, setMyEditor] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAd, setIsAd] = useState<boolean>(false);
  const [showAdOption, setShowAdOption] = useState<boolean>(true);
  const [action, setAction] = useState(() => () => {});

  // FORMS
  const uploadImageForm = useForm<IUploadImage>({
    defaultValues: {
      showImages: [],
      files: [],
      images: [],
    },
  });

  const blogForm = useForm<IBlogUpdate>({
    defaultValues: {
      id: id,
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
          url && blogForm.setValue('image', url);
        })
      );
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Further actions for submitting the blog
    e.preventDefault();
    setIsLoading(true);
    await uploadImage();
    //check if all fields are filled
    if (!blogForm.getValues('image') || !blogForm.getValues('content')) {
      setAlertMessage('Vui lòng điền đầy đủ thông tin');
      setAlertFailed(true);
      setAlertShow(true);
      setIsLoading(false);
      return;
    }
    if (!id)
      postBlogMutation.mutate({
        title: blogForm.getValues('title'),
        excerpt: blogForm.getValues('excerpt'),
        image: blogForm.getValues('image'),
        category: blogForm.getValues('category'),
        content: blogForm.getValues('content'),
      });
    else updateBlogMutation.mutate(blogForm.getValues());
  };

  // QUERY
  const postBlogMutation = useMutation<IApiResponse<string>, IBlog>(postBlog, {
    onError: () => {
      setAlertMessage('Đăng bài thất bại');
      setAlertFailed(true);
      setAlertShow(true);
    },
    onSuccess: (res) => {
      setAlertMessage('Đăng bài thành công');
      setAlertFailed(false);
      setAlertShow(true);
      blogForm.setValue('id', res.data.data);
      setAction(() =>
        window.location.replace(
          isAd
            ? `/blog-ad/${blogForm.getValues('id')}`
            : `/blog/${blogForm.getValues('id')}`
        )
      );
    },
  });

  const updateBlogMutation = useMutation<IApiResponse<string>, IBlogUpdate>(
    updateBlog,
    {
      onError: () => {
        setAlertMessage('Cập nhật bài viết thất bại');
        setAlertFailed(true);
        setAlertShow(true);
      },
      onSuccess: () => {
        setAlertMessage('Cập nhật bài viết thành công');
        setAlertFailed(false);
        setAlertShow(true);
        setAction(() =>
          window.location.replace(
            isAd
              ? `/blog-ad/${blogForm.getValues('id')}`
              : `/blog/${blogForm.getValues('id')}`
          )
        );
      },
    }
  );

  useQuery<IApiResponse<IBlogResponse>>(
    [QUERY_KEYS.GET_BLOG_DETAIL],
    () => getBlogDetail(id),
    {
      onSuccess: (res) => {
        blogForm.setValue('title', res.data.data.title);
        blogForm.setValue('excerpt', res.data.data.excerpt);
        blogForm.setValue('image', res.data.data.image);
        blogForm.setValue('category', res.data.data.category);
        blogForm.setValue('content', res.data.data.content);
        uploadImageForm.setValue('showImages', [res.data.data.image]);
        if (res.data.data.isAdvertised) setShowAdOption(false);
        setContent(res.data.data.content);
      },
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  useRunOnce(() => {
    import('@ckeditor/ckeditor5-build-classic')
      .then((ClassicEditor) => {
        ClassicEditor.default
          .create(document.querySelector('#editor') as HTMLElement, {
            extraPlugins: [uploadAdapter],
          })
          .then((editor: any) => {
            setMyEditor(editor);
            editor.model.document.on('change:data', () => {
              blogForm.setValue('content', editor.getData());
            });
          })
          .catch(() => {});
      })
      .catch(() => {});
  });

  useEffect(() => {
    if (myEditor) {
      myEditor.setData(content);
    }
  }, [content, myEditor]);

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tiêu đề bài viết"
          value={blogForm.watch('title')}
          onChange={(e) => blogForm.setValue('title', e.target.value)}
          className="w-full p-3 px-8 rounded-full font-bold shadow-md bg-white border border-gray-300 mb-5"
          required
          maxLength={50}
        />
        <input
          type="text"
          placeholder="Nhập mô tả ngắn cho bài viết"
          value={blogForm.watch('excerpt')}
          onChange={(e) => blogForm.setValue('excerpt', e.target.value)}
          required
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
            blogForm.setValue('category', Number(e.target.value))
          }
        >
          {BLOG_CATEGORIES_OPTION.slice(1).map((category) => (
            <option key={category.label} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        {showAdOption && (
          <div>
            <label className="block font-bold mb-2">Quảng cáo</label>
            <input
              type="radio"
              id="isAd"
              name="isAd"
              value="true"
              onChange={() => setIsAd(true)}
            />
            <label htmlFor="isAd" className="mx-2">
              Áp dụng quảng cáo cho bài viết
            </label>
          </div>
        )}
        <label className="block font-bold my-5">Nội dung</label>
        <div id="editor" />
        <div className="mt-5" />
        {id === '' && (
          <QueryButton
            name={'Đăng bài'}
            isLoading={postBlogMutation.isLoading || isLoading}
          />
        )}
        {id !== '' && (
          <QueryButton
            name={'Cập nhật'}
            isLoading={updateBlogMutation.isLoading || isLoading}
          />
        )}
      </form>
      <Alert
        message={alertMessage}
        show={alertShow}
        setShow={setAlertShow}
        failed={alertFailed}
        showCancel={false}
        action={action}
      />
    </div>
  );
});

export default BlogEditor;
