import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uploadAdapter from './UploadAdapter';
import { IBlog } from '@/src/interfaces/blog';
import { useForm } from 'react-hook-form';
import { BLOG_CATEGORIES_OPTION } from '@/src/utils/constants';

interface CustomEditorProps {
  initialData: string;
  initialTitle: string;
}

const CustomEditor: React.FC<CustomEditorProps> = (props) => {
  const [editorData, setEditorData] = useState(props.initialData);
  const [blogTitle, setBlogTitle] = useState(props.initialTitle);
  const [blogExcerpt, setBlogExcerpt] = useState('');

  const { getValues, setValue, watch } = useForm<IBlog>({});

  const handleSubmit = () => {
    // Further actions for submitting the blog
    console.log(editorData);
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

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập tiêu đề bài viết"
        value={blogTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        className="w-full p-3 px-8 rounded-full font-bold shadow-md bg-white border border-gray-300 mb-5"
        maxLength={50}
      />
      <input
        type="text"
        placeholder="Nhập mô tả ngắn cho bài viết"
        value={blogExcerpt}
        onChange={(e) => setBlogExcerpt(e.target.value)}
        className="w-full p-3 px-8 rounded-full font-bold shadow-md bg-white border border-gray-300 mb-5"
        maxLength={200}
      />
      <label htmlFor="category" className="block font-bold mb-2">
        Chọn danh mục
      </label>
      <select
        id="category"
        name="owner-time"
        className="w-fit px-10 p-3 border border-gray-300 rounded-lg mb-5"
        // onChange={(e) => setValue('adoptTime', parseInt(e.target.value))}
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
          setEditorData(data);
        }}
        config={{
          extraPlugins: [uploadAdapter],
        }}
      />
      <button
        className="w-fit p-3 px-8 rounded-full font-bold shadow-md bg-yellow-300 hover:bg-yellow-400 my-5"
        onClick={handleSubmit}
      >
        Đăng bài
      </button>
    </div>
  );
};

export default CustomEditor;
