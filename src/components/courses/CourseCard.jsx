import React, { useState } from "react";
import { Star, Users, Clock } from "lucide-react";

export default function CourseCard({ course, language, onEnroll = () => {} }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={() => onEnroll(course.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- Ảnh khóa học --- */}
      <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Huy hiệu ngôn ngữ */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${language.color} shadow-md`}
          >
            {language.name}
          </span>
        </div>

        {/* Đánh giá */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-gray-900/80 px-2 py-1 rounded-md shadow">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-semibold text-gray-800 dark:text-white">
            {course.rating}
          </span>
        </div>

        {/* Nút “Bắt đầu học” khi hover */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEnroll(course.id);
              }}
              className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Bắt đầu học
            </button>
          </div>
        )}
      </div>

      {/* --- Nội dung khóa học --- */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 leading-snug">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
          {course.description}
        </p>

        {/* --- Thông tin học viên + tiến độ --- */}
        <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between mb-2">
            {/* Học viên + thời lượng */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{course.students.toLocaleString()}</span>
              </div>

              <div className="w-px h-3 bg-gray-300 dark:bg-gray-600"></div>

              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{course.duration}</span>
              </div>
            </div>

            {/* Phần trăm tiến độ */}
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {course.progress}%
            </span>
          </div>

          {/* --- Thanh tiến độ nổi bật, dài full card --- */}
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-[width] duration-700 ease-out"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
