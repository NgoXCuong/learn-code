// src/components/lessons/LessonCode.jsx
import React, { useContext, useRef, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ThemeContext } from "../../context/ThemeContext";
import { Copy, Check } from "lucide-react";

export default function LessonCode({ code, language = "java" }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(300);
  const [copied, setCopied] = useState(false);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    updateEditorHeight(editor);
  };

  const updateEditorHeight = (editor) => {
    if (editor) {
      const lineHeight = 20; // Monaco default line height
      const lineCount = editor.getModel()?.getLineCount() || 1;
      const contentHeight = lineCount * lineHeight + 40;
      setEditorHeight(Math.min(contentHeight, 600)); // Max 600px
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      updateEditorHeight(editorRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Không thể copy:", err);
    }
  };

  const getFileExtension = () => {
    const extensions = {
      java: "java",
      cpp: "cpp",
      python: "py",
      javascript: "js",
      typescript: "ts",
      csharp: "cs",
      php: "php",
    };
    return extensions[language] || language;
  };

  if (!code) return null;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Header kiểu MacOS */}
      <div
        className={`px-4 py-3 flex justify-between items-center ${
          isDark
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-gray-100 border-b border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full hover:opacity-80 cursor-pointer"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full hover:opacity-80 cursor-pointer"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full hover:opacity-80 cursor-pointer"></div>
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            main.{getFileExtension()}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-medium ${
            copied
              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : isDark
              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Đã copy
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Monaco Editor */}
      <div
        style={{ height: `${editorHeight}px` }}
        className="w-full overflow-hidden"
      >
        <MonacoEditor
          height="100%"
          language={language}
          theme={isDark ? "vs-dark" : "vs-light"}
          value={code}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Courier New', monospace",
            lineNumbers: "on",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            renderWhitespace: "selection",
            cursorStyle: "line",
            readOnly: true,
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            contextmenu: false,
            bracketPairColorization: {
              enabled: true,
            },
          }}
        />
      </div>
    </div>
  );
}
