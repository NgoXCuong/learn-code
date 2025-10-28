import React, { useContext, useRef, useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { ThemeContext } from "../../context/ThemeContext";
import { Copy, Check, Play, Terminal } from "lucide-react";

export default function LessonCode({ code, language = "java" }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const editorRef = useRef(null);
  const [editorHeight, setEditorHeight] = useState(300);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  // mount editor
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    updateEditorHeight(editor);
  };

  // dynamic height
  const updateEditorHeight = (editor) => {
    if (editor) {
      const lineHeight = 20;
      const lineCount = editor.getModel()?.getLineCount() || 1;
      const contentHeight = lineCount * lineHeight + 40;
      setEditorHeight(Math.min(contentHeight, 600));
    }
  };

  useEffect(() => {
    if (editorRef.current) updateEditorHeight(editorRef.current);
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

  // 🎯 Run Code with Piston API
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput("");

    const codeToRun = editorRef.current?.getValue() || code;

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          version: "*",
          files: [{ name: `main.${getFileExtension()}`, content: codeToRun }],
        }),
      });

      const result = await response.json();
      const stdout = result.run?.stdout || "";
      const stderr = result.run?.stderr || "";
      setOutput(stdout || stderr || "Không có kết quả.");
    } catch (err) {
      setOutput("Lỗi khi chạy code. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  if (!code) return null;

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Header */}
      <div
        className={`px-4 py-3 flex justify-between items-center ${
          isDark
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-gray-100 border-b border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            main.{getFileExtension()}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
              ${isRunning ? "opacity-60 cursor-not-allowed" : "hover:scale-105"}
              ${
                isDark
                  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            <Play className="w-3.5 h-3.5" />
            {isRunning ? "Đang chạy..." : "Chạy thử"}
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all text-xs font-medium
              ${
                copied
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : isDark
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Đã copy
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>
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
            readOnly: false,
            padding: { top: 12, bottom: 12 },
            smoothScrolling: true,
            contextmenu: false,
            bracketPairColorization: { enabled: true },
          }}
        />
      </div>

      {/* Output console */}
      <div
        className={`border-t px-4 py-3 font-mono text-sm overflow-y-auto max-h-56 ${
          isDark
            ? "bg-gray-900 border-gray-700 text-gray-100"
            : "bg-gray-50 border-gray-200 text-gray-800"
        }`}
      >
        <div className="flex items-center gap-2 mb-2 font-semibold">
          <Terminal size={14} />
          <span>Kết quả chạy:</span>
        </div>
        <pre className="whitespace-pre-wrap">{output || "..."}</pre>
      </div>
    </div>
  );
}
