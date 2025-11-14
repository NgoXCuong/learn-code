import React, { useContext } from "react";
import { ProgressContext } from "@/context/ProgressContext";
import { CheckCircle2 } from "lucide-react";
import LessonCode from "./LessonCode";

export default function LessonContent({ lesson, isDark }) {
  const { isLessonRead, markLessonAsRead } = useContext(ProgressContext);
  // Function to parse content with embedded code blocks
  const parseContent = (content) => {
    const parts = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const textBefore = content.slice(lastIndex, match.index);
        if (textBefore.trim()) {
          parts.push({
            type: "text",
            content: textBefore.trim(),
          });
        }
      }

      // Add code block
      parts.push({
        type: "code",
        language: match[1] || lesson.language,
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after last code block
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex);
      if (remainingText.trim()) {
        parts.push({
          type: "text",
          content: remainingText.trim(),
        });
      }
    }

    return parts;
  };

  const contentParts = parseContent(lesson.content);

  return (
    <div
      className={`prose prose-lg max-w-none ${isDark ? "prose-invert" : ""}`}
    >
      {contentParts.map((part, idx) => {
        if (part.type === "text") {
          return (
            <div key={idx} className="mb-6">
              {part.content.split("\n\n").map((para, paraIdx) => (
                <p
                  key={`${idx}-${paraIdx}`}
                  className={
                    isDark ? "text-gray-300 mb-4" : "text-gray-700 mb-4"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          );
        } else if (part.type === "code") {
          return (
            <div key={idx} className="my-6">
              <LessonCode code={part.content} language={part.language} />
            </div>
          );
        }
        return null;
      })}
      {lesson.example_code && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Ví dụ minh họa</h3>
          <LessonCode code={lesson.example_code} language={lesson.language} />
        </div>
      )}

      {/* Mark as Read Button */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <button
            onClick={() => markLessonAsRead(lesson.id)}
            disabled={isLessonRead(lesson.id)}
            className={`btn-shimmer relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all overflow-hidden ${
              isLessonRead(lesson.id)
                ? "bg-green-100 text-green-700 cursor-not-allowed dark:bg-green-900/30 dark:text-green-400"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 ${
                isLessonRead(lesson.id)
                  ? "text-green-600 dark:text-green-400"
                  : "text-white"
              }`}
            />
            {isLessonRead(lesson.id) ? "Đã đọc bài học" : "Đánh dấu đã đọc"}
          </button>
        </div>
        {isLessonRead(lesson.id) && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Bạn đã hoàn thành bài học này!
          </p>
        )}
      </div>
    </div>
  );
}
