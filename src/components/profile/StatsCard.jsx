import React from "react";
import { BookOpen, TrendingUp, Target, Award } from "lucide-react";

export default function StatsCard({ stats }) {
  const statsData = [
    {
      label: "Bài học hoàn thành",
      value: stats.lessonsDone,
      color: "from-blue-500 to-cyan-500",
      icon: BookOpen,
    },
    {
      label: "Bài tập đã giải",
      value: stats.exercisesSolved,
      color: "from-green-500 to-emerald-500",
      icon: Target,
    },
    {
      label: "Thử thách vượt qua",
      value: stats.challengesCompleted,
      color: "from-purple-500 to-pink-500",
      icon: Award,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-5 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        Thống kê
      </h3>

      <div className="space-y-4">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="group p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/30 dark:to-gray-800/30 hover:shadow-lg transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
