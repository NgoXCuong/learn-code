import React from "react";
import { Award, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
export default function FeedbackStats({ feedback, isDark }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
      {[
        {
          icon: Award,
          color: "text-yellow-500",
          label: "Điểm số",
          value: feedback.score,
        },
        {
          icon: CheckCircle,
          color: "text-green-500",
          label: "Test cases",
          value: `${feedback.testsPassed}/${feedback.totalTests}`,
        },
        {
          icon: TrendingUp,
          color: "text-blue-500",
          label: "XP nhận được",
          value: feedback.passed ? "+15" : "+5",
        },
        {
          icon: Sparkles,
          color: "text-purple-500",
          label: "Xếp hạng",
          value: feedback.passed ? "A+" : "C",
        },
      ].map(({ icon: Icon, color, label, value }, i) => (
        <div
          key={i}
          className={`p-6 rounded-2xl border backdrop-blur-sm flex justify-between items-center ${
            isDark
              ? "bg-gray-800/50 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Value + Label bên trái */}
          <div className="flex flex-col">
            <div className="text-3xl font-bold">{value}</div>
            <div className={isDark ? "text-gray-400" : "text-gray-600"}>
              {label}
            </div>
          </div>

          {/* Icon bên phải, cao bằng cả card */}
          <Icon className={`w-10 h-10 ${color}`} />
        </div>
      ))}
    </div>
  );
}
