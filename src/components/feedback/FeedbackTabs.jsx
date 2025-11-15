import React from "react";
import { MessageSquare, Code2, Lightbulb } from "lucide-react";

export default function FeedbackTabs({ isDark, activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 m-4 overflow-x-auto pb-2">
      {[
        {
          id: "feedback",
          icon: MessageSquare,
          label: "Nhận xét chi tiết",
        },
        { id: "solution", icon: Code2, label: "Lời giải mẫu" },
        { id: "suggestions", icon: Lightbulb, label: "Gợi ý cải thiện" },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`btn-shimmer flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
            activeTab === id
              ? isDark
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/50"
                : "bg-indigo-500 text-white shadow-md"
              : isDark
              ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon className="w-5 h-5" />
          {label}
        </button>
      ))}
    </div>
  );
}
