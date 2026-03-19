import React, { useContext } from "react";
import { ProgressContext } from "@/context/ProgressContext";
import { CheckCircle2 } from "lucide-react";
import LessonCode from "./LessonCode";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonContent({ lesson, isDark }) {
  const { isLessonRead, markLessonAsRead } = useContext(ProgressContext);

  // Custom components for ReactMarkdown to use our styled components
  const MarkdownComponents = {
    // Custom code block renderer
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeValue = String(children).replace(/\n$/, "");

      if (!inline && match) {
        return (
          <div className="my-6">
            <LessonCode
              code={codeValue}
              language={match[1] || lesson.language}
              lessonId={lesson.id}
            />
          </div>
        );
      }

      return (
        <code
          className={`${className} px-1.5 py-0.5 rounded-sm ${isDark ? "bg-gray-800 text-pink-400" : "bg-gray-100 text-pink-600"
            } font-mono text-sm`}
          {...props}
        >
          {children}
        </code>
      );
    },
    // Styled paragraph
    p: ({ children }) => (
      <p
        className={`leading-relaxed mb-5 ${isDark ? "text-gray-300" : "text-gray-700"
          }`}
      >
        {children}
      </p>
    ),
    // Styled headings
    h1: ({ children }) => (
      <h1
        className={`text-3xl font-bold mb-6 mt-8 ${isDark ? "text-white" : "text-gray-900"
          }`}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        className={`text-2xl font-bold mb-4 mt-8 ${isDark ? "text-white" : "text-gray-800"
          }`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`text-xl font-bold mb-3 mt-6 ${isDark ? "text-white" : "text-gray-800"
          }`}
      >
        {children}
      </h3>
    ),
    // Styled lists
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
    li: ({ children }) => (
      <li className={isDark ? "text-gray-300" : "text-gray-700"}>{children}</li>
    ),
    // Styled blockquotes
    blockquote: ({ children }) => (
      <blockquote
        className={`pl-4 border-l-4 italic my-6 ${isDark
          ? "border-blue-500/50 text-gray-400"
          : "border-blue-500 text-gray-600"
          }`}
      >
        {children}
      </blockquote>
    ),
    // Bold text
    strong: ({ children }) => (
      <strong className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
        {children}
      </strong>
    ),
  };

  return (
    <div className="max-w-none animate-fadeIn">
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MarkdownComponents}
        >
          {lesson.content}
        </ReactMarkdown>
      </div>

      {lesson.example_code && (
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <h3 className="text-xl font-bold tracking-tight">Ví dụ thực tế</h3>
          </div>
          <LessonCode code={lesson.example_code} language={lesson.language} />
        </div>
      )}

      {/* Mark as Read Button */}
      <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-gray-50 dark:bg-gray-800/30">
          <button
            onClick={() => markLessonAsRead(lesson.id)}
            disabled={isLessonRead(lesson.id)}
            className={`btn-shimmer relative flex items-center gap-3 px-8 py-3 rounded-xl font-bold transition-all shadow-xl hover:shadow-2xl active:scale-95 ${isLessonRead(lesson.id)
              ? "bg-green-100 text-green-700 cursor-not-allowed dark:bg-green-900/30 dark:text-green-400"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              }`}
          >
            <CheckCircle2
              className={`w-6 h-6 ${isLessonRead(lesson.id)
                ? "text-green-600 dark:text-green-400"
                : "text-white"
                }`}
            />
            {isLessonRead(lesson.id) ? "Đã học bài học này" : "Hoàn thành bài học"}
          </button>

          {isLessonRead(lesson.id) && (
            <p className="text-center text-sm font-medium text-green-600 dark:text-green-400 mt-4 animate-bounce">
              Tuyệt vời! Bạn đã tích lũy thêm XP từ bài học này.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
