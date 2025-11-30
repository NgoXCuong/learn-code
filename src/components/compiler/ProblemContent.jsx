import React from "react";
import { AlertCircle, Lightbulb } from "lucide-react";

export default function ProblemContent({ exercise, isDark }) {
  if (!exercise) return null;

  return (
    <div className="space-y-6">
      {/* Mô tả bài toán */}
      <div className=" ">
        <div className="flex items-center  gap-2 mb-3">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Mô tả bài toán
          </h2>
        </div>
        <p
          className={`text-sm leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {exercise.description}
        </p>
      </div>

      {/* Input */}
      {exercise.input && (
        <div className=" ">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            Input:
          </h3>
          <div
            className={`p-2 rounded-sm font-mono text-sm ${
              isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-800"
            }`}
          >
            <span className="font-medium">{exercise.input}</span>
          </div>
        </div>
      )}

      {/* Output */}
      {exercise.output && (
        <div className=" ">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
            Output:
          </h3>
          <div
            className={`p-2 rounded-sm font-mono text-sm ${
              isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-800"
            }`}
          >
            <span className="font-medium text-sm">{exercise.output}</span>
          </div>
        </div>
      )}

      {/* Gợi ý */}
      {exercise.hint && (
        <div
          className={`p-2 rounded-sm border ${
            isDark
              ? "bg-amber-900/10 border-amber-800/30"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex items-start gap-2  ">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-1">
                Gợi ý
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-400">
                {exercise.hint}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
