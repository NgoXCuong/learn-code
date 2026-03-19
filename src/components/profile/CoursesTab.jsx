import React, { useContext, useMemo } from "react";
import FavoriteCoursesSection from "@/components/profile/FavoriteCoursesSection";
import { AuthContext } from "@/context/AuthContext";
import { getMockMyCourses } from "@/mock/myCourses";
import { mockCourses } from "@/mock/courses";
import CourseCard from "@/components/courses/CourseCard";
import { ThemeContext } from "@/context/ThemeContext";

export default function CoursesTab() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const darkMode = theme === "dark";

  const activeCourses = useMemo(() => {
    const userEnrolled = getMockMyCourses(user?.id);
    return userEnrolled.map(uc => {
      const courseDetails = mockCourses.find(c => c.path_id === uc.path_id);
      if (!courseDetails) return null;
      return {
        ...courseDetails,
        progress_percentage: uc.progress_percentage
      };
    }).filter(c => c !== null);
  }, [user]);

  return (
    <div className="space-y-8">
      {/* Enrolled Courses Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Khóa học đang tham gia
        </h3>
        
        {activeCourses.length === 0 ? (
          <div className="text-center py-10">
             <p className="text-gray-500 dark:text-gray-400">Bạn chưa tham gia khóa học nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <CourseCard
                key={course.path_id}
                course={course}
                language={{ name: course.language || "Web", color: "from-blue-500 to-indigo-500" }}
                darkMode={darkMode}
                onViewDetail={(id) => window.location.href = `/courses/${id}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Favorites Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <FavoriteCoursesSection darkMode={darkMode} />
      </div>
    </div>
  );
}
