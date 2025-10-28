// ============================================
// FILE: src/components/challenges/ChallengesTabs.jsx
// ============================================
import React from "react";

export const ChallengesTabs = ({
  activeTab,
  setActiveTab,
  challenges,
  userData,
}) => {
  const tabs = [
    { id: "all", label: "Tất cả", count: challenges.length },
    {
      id: "completed",
      label: "Đã hoàn thành",
      count: userData.completedChallenges.length,
    },
    {
      id: "attempted",
      label: "Đang thử",
      count: userData.attemptedChallenges.length,
    },
  ];

  return (
    <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
            activeTab === tab.id
              ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
              : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};
