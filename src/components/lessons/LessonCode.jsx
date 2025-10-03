// src/components/lessons/LessonCode.jsx
import React, { useContext, useRef, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Card } from "../ui/card";
import { ThemeContext } from "../../context/ThemeContext";

export default function LessonCode({ code, language = "java" }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(200); // default height

  if (!code) return null;

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    const lineHeight = editor.getOption(
      window.monaco?.editor.EditorOption.lineHeight
    );
    const lineCount = editor.getModel()?.getLineCount() || 1;
    setEditorHeight(lineHeight * lineCount + 20); // 20px padding
  };

  useEffect(() => {
    if (editorRef.current) {
      const lineHeight = editorRef.current.getOption(
        window.monaco?.editor.EditorOption.lineHeight
      );
      const lineCount = editorRef.current.getModel()?.getLineCount() || 1;
      setEditorHeight(lineHeight * lineCount + 20);
    }
  }, [code]);

  return (
    <Card
      className={`flex flex-col overflow-hidden rounded-xl shadow-lg border-0 mb-6 w-full md:w-1/2`}
    >
      {/* Header kiểu MacOS */}
      <div
        className={`px-4 py-3 flex justify-between items-center ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
            main.{language === "java" ? "java" : "cpp"}
          </span>
        </div>
      </div>

      {/* Monaco Editor */}
      <div style={{ height: editorHeight }} className="w-full">
        <MonacoEditor
          height="100%"
          language={language === "java" ? "java" : "cpp"}
          theme={isDark ? "vs-dark" : "vs-light"}
          value={code}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            lineNumbers: "on",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            renderWhitespace: "all",
            cursorStyle: "line",
            readOnly: true,
          }}
        />
      </div>
    </Card>
  );
}
