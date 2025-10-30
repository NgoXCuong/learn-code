import React from "react";
import { Activity } from "lucide-react";
import { recentActivity } from "@/mock/profile";

export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Activity className="mr-2 text-blue-500" size={24} />
        Hoạt động gần đây
      </h2>
      <div className="space-y-3">
        {recentActivity.map((activity, idx) => (
          <div key={idx} className="flex items-start space-x-3 text-base">
            <span className="text-3xl flex-shrink-0">{activity.icon}</span>
            <div className="flex-1">
              <p className="text-gray-900 dark:text-white font-medium">
                {activity.title}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
