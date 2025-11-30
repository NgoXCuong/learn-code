import React from "react";

const InfoBox = ({ number, label, color }) => {
  const colorClasses = {
    green: {
      wrapper:
        "bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700",
      text: "text-green-600 dark:text-green-400",
    },
    gray: {
      wrapper:
        "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600",
      text: "text-gray-600 dark:text-gray-300",
    },
  };
  return (
    <div
      className={`p-3   rounded-lg text-center border transition-colors duration-300 ${colorClasses[color].wrapper}`}
    >
      <div className={`text-xl font-bold ${colorClasses[color].text}`}>
        {number}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
};

export default InfoBox;
