import React from "react";
import { BookOpen, Code, GraduationCap } from "lucide-react";

export default function StatsCard({ stats }) {
  const items = [
    {
      icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
      label: "Bài học",
      value: stats.lessonsDone,
    },
    {
      icon: <Code className="w-6 h-6 text-indigo-500" />,
      label: "Dòng code",
      value: stats.codeLines,
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      label: "Khóa học",
      value: stats.coursesJoined,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        📊 Thống kê
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/40 
                       hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            {item.icon}
            <p className="text-3xl font-extrabold text-indigo-600 mt-2">
              {item.value}
            </p>
            <p className="text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
