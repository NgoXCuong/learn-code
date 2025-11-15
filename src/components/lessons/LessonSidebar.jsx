import React from "react";
import { ChevronDown, ChevronRight, CheckCircle, Circle } from "lucide-react";

export default function LessonSidebar({
  chapters,
  expandedChapters,
  toggleChapter,
  currentLessonId,
  navigate,
  isDark,
}) {
  return (
    <aside
      className={`fixed lg:sticky font-exo top-[57px] left-0 h-[calc(100vh-57px)] w-64 lg:w-72 border-r overflow-y-auto transition-transform duration-300 z-30 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-4">
        {Object.entries(chapters).map(([chapName, lessons], idx) => (
          <div key={idx} className="mb-2">
            <button
              onClick={() => toggleChapter(chapName)}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
              } transition-colors`}
            >
              <span className="font-medium text-lg">{chapName}</span>
              {expandedChapters.includes(chapName) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {expandedChapters.includes(chapName) && (
              <div className="ml-4 mt-2 relative">
                {/* Vertical connecting line spanning the entire chapter */}
                <div
                  className={`absolute left-2 top-2 bottom-0 w-0.5 ${
                    isDark ? "bg-gray-600" : "bg-gray-300"
                  }`}
                ></div>

                <div className="relative space-y-2">
                  {lessons.map((l, idx) => {
                    const isCurrentLesson = l.id.toString() === currentLessonId;
                    return (
                      <div key={l.id} className="relative flex items-center">
                        {/* Horizontal connector from vertical line to lesson */}
                        <div
                          className={`shrink-0 mr-2 ${
                            isCurrentLesson
                              ? `w-4 h-1 ${
                                  isDark ? "bg-indigo-400" : "bg-indigo-500"
                                }`
                              : l.progress === 100
                              ? `w-3 h-0.5 ${
                                  isDark ? "bg-green-400" : "bg-green-500"
                                }`
                              : `w-3 h-0.5 ${
                                  isDark ? "bg-gray-500" : "bg-gray-400"
                                }`
                          }`}
                        ></div>

                        <button
                          onClick={() =>
                            navigate(`/courses/${l.course_id}/lessons/${l.id}`)
                          }
                          className={`flex-1 flex items-center gap-2 p-2.5 rounded-lg text-left text-base transition-colors ${
                            isCurrentLesson
                              ? isDark
                                ? "bg-indigo-600 text-white border-l-4 border-indigo-300"
                                : "bg-indigo-100 text-indigo-900 border-l-4 border-indigo-300"
                              : isDark
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {l.progress === 100 ? (
                            <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          ) : isCurrentLesson ? (
                            <Circle className="w-4 h-4 text-indigo-400 fill-indigo-400 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 opacity-50 shrink-0" />
                          )}
                          <span className="flex-1">{l.title}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
