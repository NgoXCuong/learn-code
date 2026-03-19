import React, { useContext, useMemo } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getMockMyCourses } from "@/mock/myCourses";
import { mockCourses } from "@/mock/courses";

export default function CoursesProgress() {
  const { user } = useContext(AuthContext);

  const userCourses = useMemo(() => {
    return getMockMyCourses(user?.id);
  }, [user]);

  const activeCourses = useMemo(() => {
    return userCourses.map(uc => {
      const courseDetails = mockCourses.find(c => c.id === uc.path_id);
      if (!courseDetails) return null;
      return {
        ...courseDetails,
        progress: uc.progress_percentage
      };
    }).filter(c => c !== null);
  }, [userCourses]);

  return (
    <div className="bg-white   hover:shadow-2xl shadow-xl dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          Khóa học đang học
        </h2>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {activeCourses.length > 0 ? (
          activeCourses.map((course) => {
            const displayProgress = course.progress;

            return (
              <div
                key={course.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500 transition-all cursor-pointer group border border-transparent"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {course.lessons} bài học
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            displayProgress === 100
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }`}
                          style={{ width: `${displayProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {displayProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Chưa tham gia khóa học nào</p>
            <p className="text-sm mt-2">
              Hãy khám phá các khóa học mới để bắt đầu học nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
