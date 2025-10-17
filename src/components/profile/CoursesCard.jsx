import React from "react";
import { Tooltip } from "react-tooltip";
import { BookOpen, TrendingUp, Target, Calendar } from "lucide-react";

export default function CoursesCard({ courses }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          Khóa học
        </h3>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {courses.length} khóa
        </span>
      </div>

      <div className="space-y-4">
        {courses.map((c) => (
          <div
            key={c.id}
            className="group p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-800/30 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-300 cursor-pointer border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {c.name}
              </span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {c.progress}%
                </span>
              </div>
            </div>

            {/* Progress bar with gradient */}
            <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${c.progress}%` }}
              />
              <div
                className="absolute top-0 left-0 h-full bg-white/30 rounded-full animate-pulse"
                style={{ width: `${c.progress}%` }}
              />
            </div>

            {/* Mini stats */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                {Math.floor(c.progress / 10)} bài học
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Còn {100 - c.progress} bài
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
