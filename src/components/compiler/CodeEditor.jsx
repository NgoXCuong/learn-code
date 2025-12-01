import React, { useContext, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Play, Send } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { ThemeContext } from "../../context/ThemeContext";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

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

  // ✅ Hàm lấy extension chính xác
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

  // Resize Monaco
  useEffect(() => {
    const handleResize = () => editorRef.current?.layout();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className={`px-4 py-2 flex justify-between items-center border-b ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"
        }`}
      >
        {/* File title */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-900 dark:text-gray-100">
            main.{getFileExtension()}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[120px] h-7 text-sm">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={onRunCode}
            disabled={isRunning}
            size="sm"
            className={`h-7 px-3 ${
              isRunning
                ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            <Play className="w-4 h-4 mr-1" />
            {isRunning ? "Running..." : "Run"}
          </Button>

          {onSubmitCode && (
            <Button
              onClick={onSubmitCode}
              disabled={isSubmit}
              size="sm"
              className={`h-7 px-3 ${
                isSubmit
                  ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <Send className="w-4 h-4 mr-1" />
              {isSubmit ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          language={language === "java" ? "java" : language}
          theme={isDark ? "vs-dark" : "vs-light"}
          value={code}
          onChange={onCodeChange}
          options={{
            fontSize: 13,
            fontFamily: "Monaco, 'Courier New', monospace",
            lineNumbers: "on",
            automaticLayout: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: "on",
            renderWhitespace: "selection",
            cursorStyle: "line",
            tabSize: 2,
            insertSpaces: true,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
