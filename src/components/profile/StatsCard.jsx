import React from "react";
import { BookOpen, Code, Target, TrendingUp } from "lucide-react";
import { stats } from "@/mock/profile";

const statsData = [
  {
    icon: BookOpen,
    color: "text-blue-500",
    value: stats.lessonsDone,
    label: "Bài học",
  },
  {
    icon: Code,
    color: "text-green-500",
    value: stats.exercisesSolved,
    label: "Bài tập",
  },
  {
    icon: Target,
    color: "text-purple-500",
    value: stats.challengesCompleted,
    label: "Thử thách",
  },
  {
    icon: TrendingUp,
    color: "text-orange-500",
    value: `#${stats.rank}`,
    label: "Xếp hạng",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <stat.icon className={`${stat.color} w-10 h-10 flex-shrink-0`} />
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </div>
            <div className="text-base text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
