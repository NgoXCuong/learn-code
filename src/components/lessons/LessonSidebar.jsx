import React from "react";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  ChevronLeft,
} from "lucide-react";

export default function LessonSidebar({
  chapters,
  expandedChapters,
  toggleChapter,
  currentLessonId,
  navigate,
  isDark,
  isOpen, // Prop này có vẻ dùng cho mobile toggle, cẩn thận nhầm với toggleChapter
  isCollapsed,
  setIsCollapsed,
}) {
  return (
    <aside
      className={`sticky top-[57px] h-[calc(100vh-57px)] border-r z-30
      overflow-y-auto overflow-x-hidden lg:sticky lg:top-[57px] lg:h-[calc(100vh-57px)] lg:border-r lg:z-30 left-0 w-80
      ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      style={{
        width: isCollapsed ? "64px" : "320px",
        transition: "width 0.5s ease-in-out, transform 0.3s ease-in-out",
      }}
    >
      {/* Header with collapse toggle */}
      <div
        className={`p-4 border-b h-[65px] flex items-center ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Chỉ hiện title khi sidebar mở, dùng whitespace-nowrap để không bị vỡ khi animation */}
          <div
            className={`transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"
            }`}
          >
            <h2
              className={`font-semibold whitespace-nowrap ${
                isDark ? "text-gray-100" : "text-gray-900"
              }`}
            >
              Nội dung khóa học
            </h2>
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg transition-colors ml-auto ${
              isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Chapter List */}
      <div className={`flex flex-col gap-2 ${isCollapsed ? "p-1" : "p-2"}`}>
        {Object.entries(chapters).map(([chapName, lessons], idx) => {
          const isChapterOpen = expandedChapters.includes(chapName);

          return (
            <div key={idx} className="select-none">
              {/* Chapter Header */}
              <div
                onClick={() => !isCollapsed && toggleChapter(chapName)}
                className={`${
                  isCollapsed
                    ? "flex items-center justify-center py-2 px-1"
                    : "group flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg"
                } cursor-pointer transition-colors ${
                  isCollapsed
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent border-b-gray-200 dark:border-b-gray-700"
                }`}
              >
                {isCollapsed ? (
                  <span className="text-xs font-bold text-center text-gray-600 dark:text-gray-300">
                    {idx + 1}
                  </span>
                ) : (
                  // Bọc nội dung trong min-w-0 để flexbox xử lý text overflow tốt hơn
                  <div className="flex items-center justify-between w-full overflow-hidden">
                    <div className="flex items-center gap-3 min-w-0">
                      {isChapterOpen ? (
                        <ChevronDown className="w-4 h-4 text-orange-500 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-orange-500 shrink-0" />
                      )}
                      {/* Thêm whitespace-nowrap và truncate để text không bị xuống dòng khi sidebar đang mở rộng */}
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base whitespace-nowrap truncate">
                        {idx + 1}. {chapName}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0 ml-2">
                      {lessons.length} bài
                    </span>
                  </div>
                )}
              </div>

              {/* Lessons List - Chỉ render khi sidebar mở */}
              {!isCollapsed && (
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isChapterOpen
                      ? "max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col">
                    {lessons.map((lesson, lessonIdx) => {
                      const isCurrentLesson =
                        lesson.id.toString() === currentLessonId;
                      const isDone = lesson.progress === 100;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() =>
                            navigate(
                              `/courses/${lesson.course_id}/lessons/${lesson.id}`
                            )
                          }
                          className={`flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer pl-10 ${
                            isCurrentLesson
                              ? "bg-orange-50 dark:bg-orange-900/10"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }`}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            ) : (
                              <PlayCircle className="w-4 h-4 text-orange-500 shrink-0 fill-orange-100 dark:fill-orange-900" />
                            )}

                            {/* Text bài học cũng cần whitespace-nowrap */}
                            <span
                              className={`text-sm whitespace-nowrap truncate ${
                                isCurrentLesson
                                  ? "font-medium text-gray-900 dark:text-white"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {lessonIdx + 1}. {lesson.title}
                            </span>
                          </div>

                          <div className="text-xs text-gray-500 dark:text-gray-400 ml-4 tabular-nums shrink-0">
                            {lesson.readTime || "00:00"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
