// src/components/general/CustomEditor.tsx

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

interface CustomEditorProps {
  initialData: string;
}

const editorConfiguration = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'alignment',
      '|',
      'outdent',
      'indent',
      'fontSize',
      '|',
      // 'ckbox',
      // 'imageInsert',
      // '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo'
    ]
  },
  language: 'vi',
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  }
};

const handleSubmit = () => {
  console.log("Submit");
};

const CustomEditor: React.FC<CustomEditorProps> = (props) => {
  return (
    <div>
      <script src="https://example.com/ckfinder/ckfinder.js"></script>
      <CKEditor
        editor={Editor}
        config={editorConfiguration}
        data={props.initialData}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
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
