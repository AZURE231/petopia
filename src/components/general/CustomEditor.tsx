import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";

interface CustomEditorProps {
  initialData: string;
  initialTitle: string;
}

const editorConfiguration = {
  // your CKEditor configuration
};

const CustomEditor: React.FC<CustomEditorProps> = (props) => {
  const [editorData, setEditorData] = useState(props.initialData);
  const [blogTitle, setBlogTitle] = useState(""); // State to hold the blog title

  const handleSubmit = () => {
    console.log("Submit");
    console.log("Title:", blogTitle); // Log the title along with the editor data
    console.log("Editor Data:", editorData);
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
        editor={Editor}
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
