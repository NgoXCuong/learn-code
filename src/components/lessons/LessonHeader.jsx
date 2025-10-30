// src/components/lessons/LessonHeader.jsx
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

export default function LessonHeader({ title, content }) {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Phân tích content thành các đoạn văn
  const paragraphs = content
    ? content.split("\n\n").filter((p) => p.trim())
    : [];

  return (
    <div className="space-y-4">
      {title && (
        <h2
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
      )}

      <div
        className={`space-y-4 leading-relaxed ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed">
              {paragraph}
            </p>
          ))
        ) : (
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Chưa có mô tả chi tiết.
          </p>
        )}
      </div>
    </div>
  );
}
