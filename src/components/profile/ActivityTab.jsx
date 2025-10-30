import React from "react";
import { Clock, Share2 } from "lucide-react";
import { recentActivity } from "@/mock/profile";

export default function ActivityTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Lịch sử hoạt động
      </h2>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {recentActivity.map((activity, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            {/* Icon container */}
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl shadow-sm border border-gray-200 dark:border-gray-600">
              {activity.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {activity.title}
              </h3>
              <p className="text-base text-gray-500 dark:text-gray-400 flex items-center">
                <Clock size={14} className="mr-1" />
                {activity.time}
              </p>
            </div>

            {/* Share button */}
            <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        ))}

        {/* Load More */}
        <button className="w-full py-3 mt-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 transition-colors">
          Xem thêm hoạt động
        </button>
      </div>
    </div>
  );
}
