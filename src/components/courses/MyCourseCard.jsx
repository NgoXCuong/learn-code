import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, PlayCircle, Clock, ArrowRight } from "lucide-react";

const MyCourseCard = ({ course, darkMode = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    path_id,
    path_name,
    description,
    imageUrl,
    difficulty_level,
    progress_percentage,
    completed_lessons,
    total_lessons_in_path,
    estimated_hours,
  } = course;

  const safeTitle = path_name || "Khoá học chưa có tên";
  
  const getDifficultyStyles = (level) => {
    switch (level) {
      case "beginner":
        return { label: "Cơ bản", class: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" };
      case "intermediate":
        return { label: "Trung cấp", class: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" };
      case "advanced":
        return { label: "Nâng cao", class: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" };
      default:
        return { label: "Dễ", class: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" };
    }
  };

  const diffTag = getDifficultyStyles(difficulty_level);
  const isCompleted = progress_percentage === 100;

  const truncateDescription = (text, wordLimit = 18) => {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div 
      className={`group relative flex flex-col rounded-xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] btn-shimmer
      ${darkMode 
        ? "bg-slate-900 border-slate-800 hover:border-blue-500 hover:shadow-lg" 
        : "bg-white border-slate-200 hover:border-blue-500 hover:shadow-lg"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={safeTitle} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-white/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute top-3 left-3 z-40">
          <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg backdrop-blur-md shadow-sm ${diffTag.class}`}>
            {diffTag.label}
          </span>
        </div>

        {progress_percentage > 0 && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-black shadow-lg z-40">
            {progress_percentage}%
          </div>
        )}

        {/* Hover Action Button Overlay */}
        <div className={`absolute inset-0 z-30 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <Link 
            to={`/courses/${path_id}`}
            className={`w-full max-w-[120px] flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all duration-300 shadow-2xl ${isHovered ? "scale-100" : "scale-90"}
              ${isCompleted 
                ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                : "bg-indigo-600 text-white hover:bg-indigo-700"}`}
          >
            {isCompleted ? "Ôn tập" : "Học tiếp"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className={`text-base font-bold mb-2 line-clamp-1 transition-colors group-hover:text-indigo-500 ${darkMode ? "text-white" : "text-slate-900"}`}>
          {safeTitle}
        </h3>

        <p className={`text-[11px] mb-2 grow min-h-[2rem] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          {truncateDescription(description, 15)}
        </p>
        
        <div className={`flex items-center gap-4 text-[11px] font-bold uppercase tracking-tight mb-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          <div className="flex items-center gap-1.5">
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{completed_lessons}/{total_lessons_in_path} bài</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{estimated_hours}h</span>
          </div>
        </div>

          <div className={`h-1.5 w-full rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? "bg-emerald-500" : "bg-indigo-500"}`}
              style={{ width: `${progress_percentage}%` }}
            ></div>
          </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
