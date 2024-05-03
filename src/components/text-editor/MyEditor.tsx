import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect } from 'react';
import uploadAdapter from './UploadAdapter';
import { watch } from 'fs';

export default function MyEditor({
  data,
  createBlogForm,
  setData,
}: {
  data: string;
  createBlogForm: any;
  setData: any;
}) {
  ClassicEditor.create(document.querySelector('#editor') as HTMLElement, {
    extraPlugins: [uploadAdapter],
  })
    .then((editor: any) => {
      editor.setData(data);
      editor.model.document.on('change:data', () => {
        setData(editor.getData());
      });
    })
    .catch((error: any) => {
      console.error('There was a problem initializing the editor.', error);
    });

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
