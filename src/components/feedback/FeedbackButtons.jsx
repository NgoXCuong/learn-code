import React from "react";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function FeedbackButtons({
  isDark,
  onBack,
  nextLesson,
  onNextLesson,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 w-full">
      <button
        onClick={onBack}
        className={` btn-shimmer flex items-center justify-center gap-2 w-full cursor-pointer ${
          nextLesson ? "sm:w-1/2" : "sm:w-auto"
        } py-3 px-6 rounded-xl font-medium border transition-all duration-200 ${
          isDark
            ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
            : "bg-white hover:bg-gray-100 text-gray-900 border-gray-300"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Quay lại</span>
      </button>

      {nextLesson && (
        <button
          onClick={onNextLesson}
          className={`btn-shimmer flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 px-6 rounded-xl font-medium shadow-lg transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
              : "bg-linear-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Bài tập tiếp theo</span>
        </button>
      )}
    </div>
  );
}
