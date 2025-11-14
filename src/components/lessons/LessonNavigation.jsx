import React from "react";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { toast } from "sonner";

export default function LessonNavigation({
  isDark,
  prevLesson,
  nextLesson,
  courseId,
  navigate,
}) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      {prevLesson ? (
        <button
          onClick={() =>
            navigate(`/courses/${courseId}/lessons/${prevLesson.id}`)
          }
          className={`btn-shimmer group relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 overflow-hidden ${
            isDark
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow"
          }`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <div className="text-left">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">
              Bài trước: {prevLesson.title}
            </div>
          </div>
        </button>
      ) : (
        <div></div>
      )}

      {nextLesson ? (
        <button
          onClick={() =>
            navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)
          }
          className="btn-shimmer group relative flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm overflow-hidden
            bg-indigo-600 text-white hover:bg-indigo-700
            dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <div className="text-right">
            <div className="text-sm text-white mb-0.5">
              Bài tiếp theo: {nextLesson.title}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      ) : (
        <button
          onClick={() =>
            toast.success("🎉 Chúc mừng! Bạn đã hoàn thành khóa học.")
          }
          className="btn-shimmer relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden
            bg-linear-to-r from-green-500 to-emerald-600 text-white
            hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Trophy className="w-5 h-5" />
          Hoàn thành khóa học
        </button>
      )}
    </div>
  );
}
