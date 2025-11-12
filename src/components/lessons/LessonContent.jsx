import React from "react";
import LessonCode from "./LessonCode";

export default function LessonContent({ lesson, isDark }) {
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
    </div>
  );
}
