import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import "../../index.css"; // ✅ CSS hiệu ứng 3D riêng

export default function CourseCard({
  course,
  language,
  onEnroll,
  progress = 0,
}) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleAction = () => {
    if (user) onEnroll(course.id);
    else navigate("/login");
  };

  // 🎨 Header gradient theo ngôn ngữ
  const languageClass = {
    Java: "java-header",
    Python: "python-header",
    "C++": "cpp-header",
    JavaScript: "js-header",
    CSharp: "csharp-header",
    default: "default-header",
  };

  const headerClass = languageClass[language?.name] || languageClass.default;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl 
      transition-all transform hover:-translate-y-1 overflow-hidden flex flex-col
      animate-zoom-in border border-gray-200 dark:border-gray-700"
    >
      {/* 🔹 HEADER – Gradient 3D */}
      <div
        className={`relative h-32 flex items-center justify-center ${headerClass}`}
      >
        <span
          className="language-text text-white dark:text-gray-100 text-3xl font-extrabold tracking-wide drop-shadow-md"
          data-text={language?.name || "CODE"}
        >
          {language?.name || "CODE"}
        </span>
      </div>

      {/* 🧩 BODY – Nội dung khóa học */}
      <div
        className="px-6 py-4 flex-1 flex flex-col bg-gradient-to-br 
        from-white/80 to-gray-50 dark:from-gray-800/60 dark:to-gray-900/50 
        backdrop-blur-sm rounded-2xl transition-colors duration-300"
      >
        {/* Tiêu đề */}
        <h3
          className="text-2xl font-bold text-gray-800 dark:text-white mb-3 
          tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 
          transition-all duration-300 cursor-pointer"
        >
          {course.title}
        </h3>

        {/* Mô tả */}
        <p
          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed 
          flex-1 mb-4 line-clamp-3 transition-colors"
        >
          {course.description}
        </p>

        {/* Thanh tiến độ */}
        {user && 20 > 0 && (
          <div className="mt-auto space-y-1.5 animate-slide-down">
            <Progress
              value={20}
              className="h-2 rounded-full shadow-inner bg-gray-200 dark:bg-gray-700"
            />
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 italic">
              Đã hoàn thành{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {20}%
              </span>
            </p>
          </div>
        )}
      </div>

      {/* 🔵 FOOTER – Nút hành động */}
      <div
        className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 
        bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-b-2xl 
        shadow-inner transition-colors duration-300"
      >
        <Button
          onClick={handleAction}
          className={`w-full py-2 font-semibold text-lg tracking-wide rounded-xl 
          transition-all duration-300 transform ${
            user
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95"
              : "bg-gray-400 dark:bg-gray-600 text-white hover:scale-105"
          }`}
        >
          {user ? "🚀 Bắt đầu học ngay" : "🔐 Đăng nhập để học"}
        </Button>
      </div>
    </div>
  );
}
