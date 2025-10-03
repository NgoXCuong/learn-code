// src/components/compiler/CodeEditor.jsx
import React, { useContext } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Play, Send } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { ThemeContext } from "../../context/ThemeContext";

const CodeEditor = ({
  language = "java",
  code,
  onCodeChange,
  onRunCode,
  onSubmitCode,
  isRunning,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <Card className="flex-1 flex flex-col overflow-hidden rounded-xl shadow-lg border-0">
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
            main.{language === "java" ? "java" : "cpp"}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            onClick={onRunCode}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Play className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">
              {isRunning ? "Running..." : "Run"}
            </span>
          </Button>

          <Button
            onClick={onSubmitCode}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center"
          >
            <Send className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Submit</span>
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-[350px] mt-1">
        <MonacoEditor
          height="100%"
          language={language === "java" ? "java" : "cpp"}
          theme={isDark ? "vs-dark" : "vs-light"}
          value={code}
          onChange={onCodeChange}
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
          }}
        />
      </div>
    </Card>
  );
};

export default CodeEditor;
