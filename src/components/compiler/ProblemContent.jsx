import React from "react";
import { AlertCircle, Lightbulb } from "lucide-react";

export default function ProblemContent({ exercise, isDark }) {
  if (!exercise) return null;

  return (
    <div className="space-y-6">
      {/* Mô tả bài toán */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Mô tả bài toán
          </h2>
        </div>
        <p
          className={`text-base leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {exercise.description}
        </p>
      </div>

      {/* Ví dụ */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
          Ví dụ:
        </h3>
        <div
          className={`p-4 rounded-lg font-mono text-base ${
            isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-800"
          }`}
        >
          <div className="mb-2">
            <span className="text-gray-500 dark:text-gray-400">Input:</span>{" "}
            <span className="font-semibold">
              nums = [2,7,11,15], target = 9
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Output:</span>{" "}
            <span className="font-semibold">[0,1]</span>
          </div>
        </div>
      </div>

      {/* Ràng buộc */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
          Ràng buộc:
        </h3>
        <ul
          className={`text-base space-y-1 list-disc list-inside ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <li>2 ≤ nums.length ≤ 10⁴</li>
          <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
          <li>-10⁹ ≤ target ≤ 10⁹</li>
        </ul>
      </div>

      {/* Gợi ý */}
      <div
        className={`p-4 rounded-lg border ${
          isDark
            ? "bg-amber-900/10 border-amber-800/30"
            : "bg-amber-50 border-amber-200"
        }`}
      >
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-1">
              Gợi ý
            </h3>
            <p className="text-base text-amber-800 dark:text-amber-400">
              Sử dụng hash map để tối ưu độ phức tạp thời gian
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
