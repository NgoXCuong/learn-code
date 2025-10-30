import React from "react";
import { Book } from "lucide-react";
import { courses } from "@/mock/profile";

export default function CoursesProgress() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Book className="mr-2 text-blue-600 dark:text-blue-400" size={24} />
          Khóa học đang học
        </h2>
        <button className="text-blue-600 dark:text-blue-400 text-base font-medium hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer group border border-transparent"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center text-3xl text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                {course.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <span className="text-base text-gray-500 dark:text-gray-400">
                    {course.lessons}/{course.totalLessons} bài
                  </span>
                </div>

                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        course.progress === 100 ? "bg-green-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
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
