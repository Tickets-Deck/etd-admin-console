"use client"
import dynamic from "next/dynamic";
import { Dispatch, FunctionComponent, ReactElement, SetStateAction, useState } from "react";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface TextEditorProps {
    content: string | undefined
    setTextContent: (value: string) => void
}

const TextEditor: FunctionComponent<TextEditorProps> = ({ content, setTextContent }): ReactElement => {
    const myColors = [
        "#8133f1",
        "#ceb0fa",
        "#efe6fd",
        "#f4f1f1",
        "#adadbc",
        "#fee755",
        "white"
    ];
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            // ["link", "image"],
            // ["image"],
            [{ color: myColors }],
            [{ background: myColors }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        // "link",
        "color",
        "image",
        "background",
        "align"
    ];

    const handleProcedureContentChange = (content: any) => {
        setTextContent(content)
    };

    return (
        <>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleProcedureContentChange}
                placeholder="Start by typing here..."
            />
        </>
    );
}

export default TextEditor;