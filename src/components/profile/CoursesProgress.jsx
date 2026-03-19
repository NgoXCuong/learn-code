import React, { useContext, useMemo } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getMockMyCourses } from "@/mock/myCourses";
import { mockCourses } from "@/mock/courses";

export default function CoursesProgress({ onViewAll }) {
  const { user } = useContext(AuthContext);

  const userCourses = useMemo(() => {
    return getMockMyCourses(user?.id);
  }, [user]);

  const activeCourses = useMemo(() => {
    return userCourses.map(uc => {
      const courseDetails = mockCourses.find(c => c.path_id === uc.path_id);
      if (!courseDetails) return null;
      return {
        ...courseDetails,
        progress_percentage: uc.progress_percentage
      };
    }).filter(c => c !== null);
  }, [userCourses]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Khóa học đang học
          </h2>
        </div>
        <button 
          onClick={onViewAll}
          className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Xem tất cả
        </button>
      </div>
      <div className="space-y-5">
        {activeCourses.length > 0 ? (
          activeCourses.map((course) => {
            const displayProgress = course.progress_percentage || 0;

            return (
              <div
                key={course.path_id}
                className="group relative bg-white dark:bg-gray-800/50 rounded-2xl p-3 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={course.imageUrl}
                      alt={course.path_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800 dark:text-white truncate">
                        {course.path_name}
                      </h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        {course.total_lessons_in_path} bài
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out bg-linear-to-r ${displayProgress === 100
                              ? "from-emerald-400 to-teal-600 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                              : "from-blue-400 to-indigo-600 shadow-[0_0_10px_rgba(96,165,250,0.3)]"
                            }`}
                          style={{ width: `${displayProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 min-w-[32px] text-right">
                        {displayProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Chưa tham gia khóa học nào
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Hãy khám phá các khóa học mới để bắt đầu học nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
