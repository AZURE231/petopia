// src/components/general/CustomEditor.tsx

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

interface CustomEditorProps {
    initialData: string;
}

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'alignment',
        'fontSize',
        '|',
        'imageUpload',
        'blockQuote',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};

const CustomEditor: React.FC<CustomEditorProps> = (props) => {
    return (
        <CKEditor
            editor={ Editor }
            config={ editorConfiguration }
            data={ props.initialData }
            onChange={ (event, editor ) => {
                const data = editor.getData();
                console.log( { event, editor, data } );
            } }
        />
    )
}

export default CustomEditor;
