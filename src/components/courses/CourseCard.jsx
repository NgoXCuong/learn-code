// src/components/courses/CourseCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export default function CourseCard({ course, language, onEnroll }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleAction = () => {
    if (user) {
      onEnroll(course.id);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1">
      {/* Nội dung chính */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 truncate">
            {course.title}
          </h3>

          {/* Hiển thị ngôn ngữ ngay cạnh title */}
          {language && (
            <span
              className="inline-block px-2 py-0.5 text-xs font-medium rounded-full 
                         bg-blue-50 text-blue-800 dark:bg-blue-800 dark:text-blue-100 
                         shadow-sm ml-2"
            >
              {language.name}
            </span>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 flex-1 line-clamp-3">
          {course.description}
        </p>
      </div>

      {/* Nút hành động */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-center">
        <Button
          onClick={handleAction}
          className={`w-full py-3 font-semibold rounded-lg transition transform ${
            user
              ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
              : "bg-gray-500 text-white hover:bg-gray-600 hover:scale-105"
          }`}
        >
          {user ? "Bắt đầu học" : "Đăng nhập để học"}
        </Button>
      </div>
    </div>
  );
}
