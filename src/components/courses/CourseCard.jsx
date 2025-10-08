import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Clock, BookOpen, Star } from "lucide-react";
import "../../index.css"; // Hiệu ứng 3D, animation, gradient

// 🖼️ Import logo ngôn ngữ
import java from "../../assets/java.svg";
import cplus from "../../assets/c++.svg";
import python from "../../assets/python.svg";
import js from "../../assets/javascript.svg";

export default function CourseCard({
  course,
  language,
  onEnroll,
  progress = 5,
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

  // 🎨 Gradient header cho từng ngôn ngữ
  const languageClass = {
    Java: "java-header",
    Python: "python-header",
    "C++": "cpp-header",
    JavaScript: "js-header",
    default: "default-header",
  };
  const headerClass = languageClass[language?.name] || languageClass.default;

  // 🧩 Map logo ngôn ngữ
  const logoMap = {
    Java: java,
    Python: python,
    "C++": cplus,
    JavaScript: js,
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl
      transition-all transform hover:-translate-y-1 overflow-hidden flex flex-col
      animate-zoom-in border border-gray-200 dark:border-gray-700"
    >
      {/* 🔹 HEADER */}
      <div
        className={`relative h-32 flex items-center justify-center ${headerClass}`}
      >
        <img
          src={language?.logo || logoMap[language?.name] || java}
          alt={language?.name || "Code"}
          className="w-20 h-20 object-contain drop-shadow-md animate-float-slow"
        />
      </div>

      {/* 🧩 BODY */}
      <div
        className="px-6 py-5 flex-1 flex flex-col bg-gradient-to-br 
        from-white/80 to-gray-50 dark:from-gray-800/60 dark:to-gray-900/50 
        backdrop-blur-sm transition-colors duration-300"
      >
        <h3
          className="text-2xl font-bold text-gray-800 dark:text-white mb-2 
          tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 
          transition-all duration-300 cursor-pointer"
        >
          {course.title || "Java cơ bản: Lập trình hướng đối tượng"}
        </h3>

        <p
          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed 
          mb-4 line-clamp-3"
        >
          {course.description ||
            "Xây dựng ứng dụng console đầu tiên và nắm vững 4 tính chất cốt lõi của OOP."}
        </p>

        <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> <span>24 giờ học</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> <span>12 chương</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />{" "}
            <span>4.8 (1,520 học viên)</span>
          </div>
        </div>

        {user && progress > 0 && (
          <div className="mt-auto space-y-1.5 animate-slide-down">
            <Progress
              value={progress}
              className="h-2 rounded-full shadow-inner bg-gray-200 dark:bg-gray-700"
            />
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 italic">
              Đã hoàn thành{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {progress}%
              </span>
            </p>
          </div>
        )}
      </div>

      {/* 🔵 FOOTER */}
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
          {user
            ? progress > 0
              ? "▶ Tiếp tục học"
              : "🚀 Bắt đầu học ngay"
            : "🔐 Đăng nhập để học"}
        </Button>
      </div>
    </div>
  );
}
