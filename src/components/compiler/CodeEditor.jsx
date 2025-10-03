import React, { useContext, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Play, Send } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { ThemeContext } from "../../context/ThemeContext";

const CodeEditor = ({
  languages = [],
  language,
  onLanguageChange,
  code,
  onCodeChange,
  onRunCode,
  onSubmitCode,
  isRunning,
  isSubmit,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const editorRef = useRef(null);

  // Gọi layout khi resize window
  useEffect(() => {
    const handleResize = () => {
      editorRef.current?.layout();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Card className="flex flex-col flex-1 overflow-hidden rounded-xl shadow-lg border-0 min-h-0">
      {/* Header */}
      <div
        className={`px-4 py-1 flex justify-between items-center ${
          isDark ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
            main.{language}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <select
            className={`ml-2 px-2 py-1 border rounded text-sm ${
              isDark
                ? "bg-gray-700 text-gray-100 border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
            }`}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.id} value={lang.name.toLowerCase()}>
                {lang.name}
              </option>
            ))}
          </select>

          <Button
            onClick={onRunCode}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center justify-center text-sm"
          >
            <Play className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline text-sm">
              {isRunning ? "Running..." : "Run"}
            </span>
          </Button>

          <Button
            onClick={onSubmitCode}
            disabled={isSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md flex items-center justify-center text-sm"
          >
            <Send className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline text-sm">
              {isSubmit ? "Submitting..." : "Submit"}
            </span>
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0 mt-1">
        <MonacoEditor
          height="100%"
          language={language === "java" ? "java" : language}
          theme={isDark ? "vs-dark" : "vs-light"}
          value={code}
          onChange={onCodeChange}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', monospace",
            lineNumbers: "on",
            automaticLayout: true, // vẫn giữ
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            renderWhitespace: "all",
            cursorStyle: "line",
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </Card>
  );
};

export default CodeEditor;
