import React from "react";

const tabs = [
  { id: "overview", label: "Tổng quan" },
  { id: "courses", label: "Khóa học" },
  { id: "badges", label: "Huy hiệu" },
];

export default function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex font-exo space-x-2 sm:space-x-4 mb-8 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative btn-shimmer px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-md scale-105"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
            }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500 rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  );
}
