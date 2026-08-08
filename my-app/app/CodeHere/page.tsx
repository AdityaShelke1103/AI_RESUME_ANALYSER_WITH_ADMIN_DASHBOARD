'use client';
import { useState } from "react";
import Editor from "@monaco-editor/react";
const page = () => {
    const [code, setCode] = useState("// Write your code here");

    return (
        <Editor
            height="500px"
            defaultLanguage="javascript"
            defaultValue="// Start coding..."
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
        />
    );
}

export default page