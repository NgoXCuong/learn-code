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
      className={`fixed lg:sticky top-[57px] left-0 h-[calc(100vh-57px)] w-64 lg:w-72 border-r overflow-y-auto transition-transform duration-300 z-30 ${
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
              <div className="ml-2 mt-1 space-y-1">
                {lessons.map((l) => (
                  <button
                    key={l.id}
                    onClick={() =>
                      navigate(`/courses/${l.course_id}/lessons/${l.id}`)
                    }
                    className={`w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-base transition-colors ${
                      l.id.toString() === currentLessonId
                        ? isDark
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-900"
                        : isDark
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {l.progress === 100 ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 opacity-50" />
                    )}
                    <span className="flex-1 ">{l.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
