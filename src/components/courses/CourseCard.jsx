import React, { useState, useContext } from "react";
import { Star, Users, Clock, BookOpen, Heart, ArrowRight } from "lucide-react";
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
      case "Cơ bản":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "Intermediate":
      case "Trung cấp":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Advanced":
      case "Nâng cao":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-300";
    }
  };

  const getProgressStatus = (progress) => {
    if (progress === 0) return { text: "Chưa bắt đầu", color: "text-slate-500" };
    if (progress < 100) return { text: "Đang tiến triển", color: "text-indigo-600 dark:text-indigo-400" };
    return { text: "Hoàn thành", color: "text-emerald-600 dark:text-emerald-400" };
  };
  const truncateDescription = (text, wordLimit = 18) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div
      className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] cursor-pointer btn-shimmer
        ${darkMode
          ? "bg-slate-900 border-slate-800 hover:border-blue-500 hover:shadow-lg"
          : "bg-white border-slate-200 hover:border-blue-500 hover:shadow-lg"
        }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetail(course.id)}
    >
      {/* Glossy shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className={`absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out`}></div>
      </div>

      {/* Image Container */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-40">
          <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold shadow-sm backdrop-blur-md ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>

        <button
          onClick={toggleFavorite}
          className={`absolute top-4 right-4 z-40 p-2.5 rounded-2xl backdrop-blur-xl transition-all duration-300 shadow-lg
            ${favorite
              ? "bg-rose-500 text-white hover:bg-rose-600 scale-110"
              : darkMode
                ? "bg-gray-900/60 text-white/70 hover:text-rose-400 hover:bg-gray-900"
                : "bg-white/80 text-slate-400 hover:text-rose-500 hover:bg-white"
            }`}
        >
          <Heart
            className={`w-4.5 h-4.5 transition-transform duration-300 ${isHovered && !favorite ? "scale-110" : ""}`}
            fill={favorite ? "currentColor" : "none"}
          />
        </button>

        {/* Category Label */}
        <div className="absolute bottom-4 left-4 z-40 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/90 text-white text-[10px] font-bold tracking-wide backdrop-blur-sm">
                {language?.name || "Code"}
            </span>
        </div>

        {/* Hover Action Buttons Overlay */}
        <div className={`absolute inset-0 z-30 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className={`w-full max-w-[200px] transition-transform duration-300 ${isHovered ? "scale-100" : "scale-90"}`}>
            {course.progress > 0 ? (
              <button 
                  onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail(course.id);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-2xl
                      ${course.progress === 100 
                          ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                          : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
              >
                  {course.progress === 100 ? "Ôn tập lại" : "Tiếp tục học"}
                  <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!user) {
                    navigate("/login");
                  } else {
                    onEnroll(course.id);
                  }
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm shadow-2xl transition-all duration-300
                  ${darkMode 
                    ? "bg-white text-slate-900 hover:bg-indigo-500 hover:text-white" 
                    : "bg-slate-900 text-white hover:bg-indigo-600"}`}
              >
                {!user ? "Đăng nhập" : "Tham gia ngay"}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col grow">
        <h3 className={`text-lg font-bold leading-tight mb-2 line-clamp-1 transition-colors group-hover:text-indigo-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
          {course.title}
        </h3>

        <p className={`text-sm mb-3 grow min-h-[2.5rem] ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
          {truncateDescription(course.description)}
        </p>

        {/* Metadata Grid */}
        <div className={`grid grid-cols-2 gap-4 py-3 border-t border-slate-100 dark:border-slate-700/50 mb-3`}>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${darkMode ? "bg-slate-800 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
              <BookOpen className="w-4 h-4" />
            </div>
            <span className={`text-xs font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              {course.lessons} bài học
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${darkMode ? "bg-slate-800 text-amber-400" : "bg-amber-50 text-amber-600"}`}>
              <Clock className="w-4 h-4" />
            </div>
            <span className={`text-xs font-semibold ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
              {course.duration}
            </span>
          </div>
        </div>

        {/* Progress Display (Always visible if progress > 0) */}
        {course.progress > 0 && (
          <div className="space-y-3 mt-auto">
            <div className="flex justify-between items-end">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${getProgressStatus(course.progress).color}`}>
                {getProgressStatus(course.progress).text}
              </span>
              <span className={`text-sm font-black ${darkMode ? "text-white" : "text-slate-900"}`}>
                {course.progress}%
              </span>
            </div>
            <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(79,70,229,0.3)]
                    ${course.progress === 100 ? "bg-emerald-500" : "bg-linear-to-r from-indigo-500 to-purple-500"}`}
                    style={{ width: `${course.progress}%` }}
                />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
