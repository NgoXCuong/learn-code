import React from "react";
import LessonCode from "./LessonCode";

export default function LessonContent({ lesson, isDark }) {
  return (
    <div
      className={`prose prose-lg max-w-none ${isDark ? "prose-invert" : ""}`}
    >
      {lesson.content.split("\n\n").map((para, idx) => (
        <p
          key={idx}
          className={isDark ? "text-gray-300 mb-4" : "text-gray-700 mb-4"}
        >
          {para}
        </p>
      ))}
      {lesson.example_code && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Ví dụ minh họa</h3>
          <LessonCode code={lesson.example_code} language={lesson.language} />
        </div>
      )}
    </div>
  );
}
