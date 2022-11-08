import React, { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./Editor.css";
import { TextField } from "@mui/material";
import styled from "@emotion/styled";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];


const Title = styled(TextField)(({ theme }) => ({
    
}))
const Editor = ({ data, setData, handleTitle }) => {
  const [quil, setQuil] = useState(null);

  useEffect(() => {
    if (quil === null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      else {
        setData(prevState =>
        {
          return {
            ...prevState,
            content: quil.editor.scroll.domNode.innerHTML,
          };
        });

        //   console.log(quil.getContents());
      }
    };
    quil.on("text-change", handler);

    return () => {
      quil.off("text-change", handler);
    };
  }, [quil]);
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuil(q);
    q.editor.scroll.domNode.innerHTML = data?.content;
  }, []);
  return (
    <>
      <Title fullWidth label="Title" id="fullWidth" value={data?.title} onChange={handleTitle} />
      <div className="container" ref={wrapperRef}></div>
    </>
  );
};

export default Editor;
