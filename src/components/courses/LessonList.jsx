import React, { useState, useMemo } from "react";
import {
  PlayCircle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";

// Hàm helper để format thời gian (giả sử input là phút)
const formatTime = (minutes) => {
  if (!minutes) return "00:00";
  const hrs = Math.floor(minutes / 60);
  const mins = Math.floor(minutes % 60);
  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:00`;
  }
  return `${String(mins).padStart(2, "0")}:00`; // Demo hiển thị dạng phút:giây
};

export default function LessonList({ lessons, onLessonClick }) {
  // 1. Nhóm bài học theo chương
  const chapters = useMemo(() => {
    return lessons.reduce((acc, lesson) => {
      if (!acc[lesson.chap]) acc[lesson.chap] = [];
      acc[lesson.chap].push(lesson);
      return acc;
    }, {});
  }, [lessons]);

  // State quản lý đóng/mở chương
  const [openChapters, setOpenChapters] = useState(
    new Set(Object.keys(chapters)) // Mặc định mở hết
  );

  // Tính toán tổng quan cho Header
  const totalChapters = Object.keys(chapters).length;
  const totalLessons = lessons.length;
  const totalDuration = lessons.reduce((sum, l) => {
    // Extract number from "X phút" format
    const minutes = parseInt(l.readTime.replace(" phút", ""));
    return sum + minutes;
  }, 0);

  // Format tổng thời gian hiển thị (Giờ phút)
  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutesLeft = totalDuration % 60;
  const durationText = `${
    totalHours > 0 ? `${totalHours} giờ ` : ""
  }${totalMinutesLeft} phút`;

  const toggleChapter = (chapterName) => {
    const newOpenChapters = new Set(openChapters);
    if (newOpenChapters.has(chapterName)) {
      newOpenChapters.delete(chapterName);
    } else {
      newOpenChapters.add(chapterName);
    }
    setOpenChapters(newOpenChapters);
  };

  const handleToggleAll = () => {
    if (openChapters.size === totalChapters) {
      setOpenChapters(new Set()); // Đóng hết
    } else {
      setOpenChapters(new Set(Object.keys(chapters))); // Mở hết
    }
  };

  const isAllOpen = openChapters.size === totalChapters;

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-200 dark:border-gray-700 rounded-sm p-6 bg-white dark:bg-gray-800">
      {/* HEADER TỔNG QUAN */}
      <div className="mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Nội dung khóa học
        </h1>
        <div className="flex justify-between items-end">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{totalChapters}</span> chương •{" "}
            <span className="font-semibold">{totalLessons}</span> bài học • Thời
            lượng <span className="font-semibold">{durationText}</span>
          </p>
          <button
            onClick={handleToggleAll}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors select-none"
          >
            {isAllOpen ? "Thu gọn tất cả" : "Mở rộng tất cả"}
          </button>
        </div>
      </div>

      {/* DANH SÁCH CHƯƠNG VÀ BÀI HỌC */}
      <div className="flex flex-col gap-2">
        {Object.keys(chapters).map((chapterName, index) => {
          const lessonsInChapter = chapters[chapterName];
          const isOpen = openChapters.has(chapterName);

          return (
            <div key={chapterName} className="select-none">
              {/* THANH TIÊU ĐỀ CHƯƠNG */}
              <div
                onClick={() => toggleChapter(chapterName)}
                className="group flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-transparent border-b-gray-200 dark:border-b-gray-700"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-orange-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-orange-500" />
                  )}
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-base">
                    {index + 1}. {chapterName}
                  </h3>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {lessonsInChapter.length} bài học
                </span>
              </div>

              {/* DANH SÁCH BÀI HỌC TRONG CHƯƠNG */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col">
                  {lessonsInChapter.map((lesson, lessonIndex) => {
                    // Logic xác định icon dựa trên loại bài hoặc trạng thái
                    // Giả sử: progress 100 là xong, nếu không thì hiện nút play
                    const isDone = lesson.progress === 100;
                    const isActive = lesson.isCurrent; // Bài đang học

                    return (
                      <div
                        key={lesson.id}
                        onClick={() =>
                          !lesson.locked && onLessonClick?.(lesson.id)
                        }
                        className={`
                          flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800 cursor-pointer pl-10
                          ${
                            isActive
                              ? "bg-orange-50 dark:bg-orange-900/10"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          }
                        `}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-orange-500 shrink-0 fill-orange-100 dark:fill-orange-900" />
                          )}

                          <div className="flex flex-col flex-1">
                            <span
                              className={`text-sm ${
                                isActive
                                  ? "font-medium text-gray-900 dark:text-white"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {lessonIndex + 1}. {lesson.title}
                            </span>

                            {/* Progress bar */}
                            <div className="flex items-center gap-2 mt-1">
                              <div className="relative flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                                    lesson.progress >= 100
                                      ? "bg-green-500"
                                      : "bg-blue-500"
                                  }`}
                                  style={{ width: `${lesson.progress}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium text-blue-500 dark:text-blue-300 whitespace-nowrap">
                                {lesson.progress}%
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400 ml-4 tabular-nums">
                          {lesson.readTime || "00:00"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
