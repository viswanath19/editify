import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const TextEditorComponent = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  }

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text", padding: "10px" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Write something!"
      />
    </div>
  );
}

export default TextEditorComponent;