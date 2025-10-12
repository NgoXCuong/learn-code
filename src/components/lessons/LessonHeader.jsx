import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function LessonHeader({ title, content }) {
  const { theme } = useContext(ThemeContext);
  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-700";

  return (
    <div className="mb-6">
      <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
      <p className={`leading-relaxed ${textSecondary}`}>
        {content || "Chưa có mô tả chi tiết."}
      </p>
    </div>
  );
}
