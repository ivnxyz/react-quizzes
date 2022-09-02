import React, { forwardRef, useState } from "react";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./quillFormInput.css";
const draftToHtml = require("draftjs-to-html");

export default forwardRef((props: any, ref) => {
  const {
    value,
    onChange,
    currentLanguage,
  } = props;

  const blocksFromHTML = convertFromHTML(value[currentLanguage] || "");

  const defaultState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  );

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(defaultState)
  );

  const handleEditorChanged = (state: any) => {
    setEditorState(state);
    onChange({ ...value, [currentLanguage]: draftToHtml(convertToRaw(state.getCurrentContent())) });
  };

  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChanged}
        toolbar={{
          options: ["inline", "blockType", "list"],
          blockType: {
            inDropdown: false,
          },
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
        }}
        placeholder="Escribe aquí..."
        editorClassName="wysiwyg-editor"
      />
    </div>
  );
});
