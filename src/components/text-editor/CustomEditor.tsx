import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uploadAdapter from "./UploadAdapter";

interface CustomEditorProps {
  initialData: string;
  initialTitle: string;
}

const CustomEditor: React.FC<CustomEditorProps> = (props) => {
  const [editorData, setEditorData] = useState(props.initialData);
  const [blogTitle, setBlogTitle] = useState("");


  const handleSubmit = () => {
    // Further actions for submitting the blog
  };

  const uploadAdapterPlugin = (editor: any) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return new uploadAdapter(loader);
    };
  }

  useEffect(() => {
    ClassicEditor.create(document.querySelector("#editor") as HTMLElement, {
      extraPlugins: [uploadAdapterPlugin],
    })
      .then((editor: any) => {
        editor.setData(editorData);
        editor.model.document.on("change:data", () => {
          setEditorData(editor.getData());
        });
      })
      .catch((error: any) => {
        console.error("There was a problem initializing the editor.", error);
      });
  }, []);

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
