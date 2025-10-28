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

  // Gọi layout khi resize
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
        {/* File name + status dots */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>

          <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">
            main.{language}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Select (shadcn/ui) */}
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger
              className={`w-[140px] text-sm border rounded transition-colors ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-100"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <SelectValue placeholder="Ngôn ngữ" />
            </SelectTrigger>
            <SelectContent
              className={isDark ? "bg-gray-800 border-gray-700 text-white" : ""}
            >
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Run button */}
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

          {/* Submit button */}
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
      <div className="flex-1 min-h-0 mt-1 h-[calc(100vh-220px)]">
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
            automaticLayout: true,
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
