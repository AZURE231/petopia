import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { plugin } from "postcss";



interface CustomEditorProps {
  initialData: string;
  initialTitle: string;
}
const uploadAdapter = (loader:any) => {
  return {
    upload: async () => {
      const data = new FormData();
      data.append("image", await loader.file);

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b",
        {
          method: "POST",
          body: data,
        }
      ).then((res) => res.json());

      return {
        default: response.data.url,
      };

    },
  };
};

const uploadAdapterPlugin = (editor:any) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader:any) => {
    return uploadAdapter(loader);
  };
};

const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "subscript",
      "superscript",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "fontSize",
      "|",
      "alignment",
      "numberedList",
      "bulletedList",
      "|",
      "indent",
      "outdent",
      "|",
      'imageUpload',
      "link",
      "blockQuote",
      "insertTable",
      "|",
      "undo",
      "redo",
    ],
  },

  // ckfinder: {
  //   uploadUrl: "https://api.imgbb.com/1/upload?key=375280be5017acaf5d4d8561abc4f13b",
  // },

  plugins: [ uploadAdapterPlugin ],

};



const CustomEditor: React.FC<CustomEditorProps> = (props) => {
  const [editorData, setEditorData] = useState(props.initialData);
  const [blogTitle, setBlogTitle] = useState(""); // State to hold the blog title

  const handleSubmit = () => {
    // console.log("Submit");
    // console.log("Title:", blogTitle); // Log the title along with the editor data
    // console.log("Editor Data:", editorData);
    // Further actions for submitting the blog
  };

  
  
  
  return (
    <div>
      <input
        type="text"
        placeholder="Enter blog title"
        defaultValue={props.initialTitle}
        onChange={(e) => setBlogTitle(e.target.value)}
        className="w-full p-3 px-8 rounded-full font-bold shadow-md bg-white border border-gray-300 mb-5"
      />
      <CKEditor
        editor={ClassicEditor as any}
        config={editorConfiguration}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
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
