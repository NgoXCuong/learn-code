import React from "react";
import { Award, CheckCircle, TrendingUp, Sparkles } from "lucide-react";

export default function FeedbackStats({ feedback, isDark }) {
  console.log("FeedbackStats received feedback:", feedback);

  if (!feedback) {
    return <div>Loading feedback stats...</div>;
  }

  const cards = [
    {
      icon: Award,
      color: "text-yellow-400",
      label: "Điểm số",
      value: feedback.score,
    },
    {
      icon: CheckCircle,
      color: "text-green-400",
      label: "Test cases",
      value: `${feedback.testsPassed}/${feedback.totalTests}`,
    },
    {
      icon: TrendingUp,
      color: "text-blue-400",
      label: "XP nhận được",
      value: feedback.passed ? "+15" : "+5",
    },
    {
      icon: Sparkles,
      color: "text-purple-400",
      label: "Xếp hạng",
      value: feedback.passed ? "A+" : "C",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mt-6 px-6 ">
      {cards.map(({ icon: Icon, color, label, value }, i) => (
        <div
          key={i}
          className={`p-6 rounded-lg border backdrop-blur-md transition-all duration-300 
            flex justify-between items-center group cursor-default
            ${
              isDark
                ? "bg-gray-800/90 border-gray-700 hover:border-indigo-400/40 hover:shadow-lg hover:shadow-indigo-500/10"
                : "bg-white border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-300/20"
            }
          `}
        >
          {/* Text bên trái */}
          <div className="flex flex-col">
            <div
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {value}
            </div>
            <div
              className={`text-base ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {label}
            </div>
          </div>

          {/* Icon bên phải */}
          <Icon
            className={`w-10 h-10 ${color} opacity-90 transition-all 
              group-hover:scale-110 group-hover:opacity-100`}
          />
        </div>
      ))}
    </div>
  );
}
