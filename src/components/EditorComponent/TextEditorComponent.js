import React, { useEffect } from "react";
import { ContentState, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

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

  useEffect(() => {
    socket.on("received_editor_content", (data) => {
        if (typeof data.editorContent === 'string') {
            setEditorState(EditorState.createWithContent(ContentState.createFromText(data.editorContent)));
        }
    })
  },[socket]);

  const handleContentChanges = (currentEditorState) => {
    socket.emit("send_message",{editorContent: currentEditorState.getCurrentContent().getPlainText()});
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