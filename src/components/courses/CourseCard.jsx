import React, { useState, useContext } from "react";
import { Star, Users, Clock, BookOpen, Heart } from "lucide-react";
import { UserCoursesContext } from "@/context/UserCoursesContext";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  course,
  language,
  onEnroll = () => {},
  onViewDetail = () => {},
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(UserCoursesContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const darkMode = theme === "dark";
  const favorite = isFavorite(course.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    favorite ? removeFavorite(course.id) : addFavorite(course);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "Advanced":
        return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300";
    }
  };

  const getProgressStatus = (progress) => {
    if (progress === 0) return { text: "Chưa học", color: "text-gray-400" };
    if (progress < 100) return { text: "Đang học", color: "text-blue-400" };
    return { text: "Hoàn thành", color: "text-green-400" };
  };

  return (
    <div
      className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-105 ${
        darkMode
          ? "bg-gray-800 border-gray-700 hover:border-blue-500 hover:shadow-purple-500/20"
          : "bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetail(course.id)}
    >
      {/* Ảnh khóa học */}
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            favorite
              ? "bg-red-500/90 text-white hover:bg-red-600"
              : darkMode
              ? "bg-gray-700/70 hover:bg-gray-600/80 text-red-400"
              : "bg-white/70 hover:bg-red-100 text-red-500"
          }`}
        >
          <Heart
            className="w-5 h-5"
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        {/* Overlay hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-10 transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!user) {
                  navigate("/login");
                } else {
                  onEnroll(course.id);
                }
              }}
              className={`px-6 py-2 font-semibold rounded-full shadow-lg transition-all duration-200 hover:scale-105
      ${
        !user
          ? "bg-orange-600 text-white hover:bg-orange-700" // Đăng nhập để bắt đầu
          : course.progress === 0
          ? "bg-blue-600 text-white hover:bg-blue-700" // Trạng thái: Bắt đầu học
          : "bg-purple-600 text-white hover:bg-purple-700" // Trạng thái: Tiếp tục học
      }`}
            >
              {!user
                ? "Đăng nhập để bắt đầu"
                : course.progress === 0
                ? "Bắt đầu học"
                : "Tiếp tục học"}
            </button>
          </div>
        )}
      </div>

      {/* Nội dung */}
      <div className="p-5 flex flex-col grow space-y-2">
        {/* Level + ngôn ngữ */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-sm px-2.5 py-1 rounded-full font-medium ${getLevelColor(
              course.level
            )}`}
          >
            {course.level}
          </span>
          <span
            className={`text-sm px-2.5 py-1 rounded-full font-medium bg-linear-to-r ${language.color} text-white`}
          >
            {language.name}
          </span>
        </div>

        <h3
          className={`text-xl font-semibold line-clamp-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {course.title}
        </h3>

        <p
          className={`text-base line-clamp-2 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {course.description}
        </p>

        {/* Thông tin khóa học */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 text-base gap-y-1 mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> {course.lessons} bài
          </div>

          <div className="flex items-center gap-1 md:justify-center">
            <Clock className="w-4 h-4" /> {course.duration}
          </div>

          <div className="flex items-center gap-1 md:justify-center">
            <Users className="w-4 h-4" /> {course.students.toLocaleString()} HV
          </div>

          <div className="flex items-center gap-1 justify-end">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />{" "}
            {course.rating}
          </div>
        </div>

        {/* Thanh tiến độ (ShadCN) */}
        <div className="mt-3 space-y-1">
          <div className="text-gray-500 dark:text-white flex justify-between text-base font-medium">
            <span className={getProgressStatus(course.progress).color}>
              {getProgressStatus(course.progress).text}
            </span>
            <span>{course.progress}%</span>
          </div>

          <Progress
            value={course.progress}
            className="h-2 bg-gray-200 dark:bg-gray-700 [&>div]:bg-linear-to-r [&>div]:from-blue-500 [&>div]:via-purple-500 [&>div]:to-pink-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
