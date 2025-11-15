import React, { useContext } from "react";
import { UserCoursesContext } from "@/context/UserCoursesContext";
import { Heart } from "lucide-react";
import CourseCard from "@/components/courses/CourseCard";

const FavoriteCoursesSection = ({ language, darkMode = false }) => {
  const { favoriteCourses } = useContext(UserCoursesContext);

  return (
    <div className="font-exo">
      <h3 className="text-3xl  font-bold text-gray-900 dark:text-white mb-6  ">
        Khóa học yêu thích
      </h3>

      {favoriteCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="w-16 h-16  dark:text-gray-600 mb-4 text-red-400" />
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Bạn chưa thích khóa học nào!
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              language={
                language || {
                  name: "React",
                  color: "from-indigo-500 to-purple-500",
                }
              }
              darkMode={darkMode}
              onViewDetail={(id) => console.log("Xem chi tiết", id)}
              onEnroll={(id) => console.log("Học khóa", id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteCoursesSection;
