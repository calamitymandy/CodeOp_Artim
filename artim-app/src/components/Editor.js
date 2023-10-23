import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Editor({ onEditorChange }) {

  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []); // run on mounting

  if (loaded) {
    return (
      <CKEditor
        editor={ClassicEditor}
        //data={editorData}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          //console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onEditorChange(data);
        }}
        onBlur={(event, editor) => {
          //console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          //console.log("Focus.", editor);
        }}
      />
    );
  } else {
    return <h2> Editor is loading </h2>;
  }
}

export default Editor;
