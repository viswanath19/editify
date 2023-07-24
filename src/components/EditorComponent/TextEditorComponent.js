import React, { useEffect } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const TextEditorComponent = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  }

  useEffect(() => {
    const storedContent = localStorage.getItem("currentContent");
    console.log("Coming here", storedContent);
    if (typeof storedContent === 'string') {
        setEditorState(EditorState.createWithContent(ContentState.createFromText(storedContent)));
    }
  },[]);

  const handleContentChanges = (currentEditorState) => {
    localStorage.setItem("currentContent",currentEditorState.getCurrentContent().getPlainText());
  }

  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text", padding: "10px" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={(editorState) => {
            setEditorState(editorState);
            handleContentChanges(editorState);
        }}
        placeholder="Write something!"
      />
    </div>
  );
}

export default TextEditorComponent;