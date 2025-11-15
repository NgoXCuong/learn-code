import React from "react";
import { MessageSquare, Code2, Lightbulb } from "lucide-react";

export default function FeedbackTabs({ isDark, activeTab, setActiveTab }) {
  const tabs = [
    { id: "feedback", icon: MessageSquare, label: "Nhận xét chi tiết" },
    { id: "solution", icon: Code2, label: "Lời giải mẫu" },
    { id: "suggestions", icon: Lightbulb, label: "Gợi ý cải thiện" },
  ];

  const getTabClasses = (isActive) => {
    if (isActive) {
      return isDark
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-[1.02]"
        : "bg-indigo-500 text-white shadow-md scale-[1.02]";
    }

    return isDark
      ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200 border border-gray-700"
      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200";
  };

  return (
    <div className="flex gap-2 m-4 overflow-x-auto pb-2 no-scrollbar font-exo">
      {tabs.map(({ id, icon: Icon, label }) => {
        const isActive = id === activeTab;

        return (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${getTabClasses(
              isActive
            )}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "" : "opacity-80"}`} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
