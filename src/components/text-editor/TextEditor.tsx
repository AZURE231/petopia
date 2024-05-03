// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useState } from 'react';
import uploadAdapter from './UploadAdapter';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { watch } from 'fs';

export default function TextEditor({
  data,
  createBlogForm,
  setData,
}: {
  data: string;
  createBlogForm: any;
  setData: any;
}) {
 
    useEffect(() => {
        setData(data);
    }, [data]);


  return (
    <CKEditor
      editor={ClassicEditor as any}
      data={data}
      onChange={(event, editor) => {
        const data = editor.getData();
        createBlogForm.setValue('content', data);
      }}
      config={{
        extraPlugins: [uploadAdapter],
      }}
    />
  );
}