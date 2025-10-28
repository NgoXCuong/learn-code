import React from "react";
import { Book, Clock } from "lucide-react";
import { courses } from "@/mock/profile";

export default function CoursesProgress() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Book className="mr-2 text-purple-600" size={24} />
          Khóa học đang học
        </h2>
        <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                {course.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {course.lessons}/{course.totalLessons} bài
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        course.progress === 100
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {course.progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
