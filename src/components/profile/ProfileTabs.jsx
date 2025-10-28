import React from "react";

const tabs = [
  { id: "overview", label: "Tổng quan" },
  { id: "courses", label: "Khóa học" },
  { id: "badges", label: "Huy hiệu" },
  { id: "activity", label: "Hoạt động" },
];

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
              : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
