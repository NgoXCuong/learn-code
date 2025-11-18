import React from "react";
import { Users, Target } from "lucide-react";

export const StatsCards = ({ totalParticipants, avgSuccess }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 font-exo">
      {/* Tổng người tham gia */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
              Tổng người tham gia
            </p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalParticipants.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tỷ lệ thành công TB */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
              Tỷ lệ thành công TB
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {avgSuccess}%
            </p>
          </div>
          <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
            <Target className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
