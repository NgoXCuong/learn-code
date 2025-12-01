// src/components/courses/CourseHero.jsx
import React, { useContext } from "react";
import { Users, Clock, Star, Flame, ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProgressContext } from "@/context/ProgressContext";

export default function CourseHero({
  course,
  completedCount,
  inProgressCount,
  lessons,
}) {
  const navigate = useNavigate();
  const { isLessonRead } = useContext(ProgressContext);

  // Calculate progress based on average lesson progress
  const calculateProgress = () => {
    if (lessons.length === 0) return 0;
    const totalProgress = lessons.reduce(
      (sum, lesson) => sum + lesson.progress,
      0
    );
    return Math.round(totalProgress / lessons.length);
  };

  // Find the lesson currently being studied (in progress)
  const getCurrentLesson = () => {
    // First, find lessons that are in progress (0 < progress < 100)
    const inProgressLesson = lessons.find(
      (lesson) => lesson.progress > 0 && lesson.progress < 100
    );
    if (inProgressLesson) return inProgressLesson;

    // If no lesson in progress, find the first lesson that hasn't been started (progress === 0)
    const nextLesson = lessons.find((lesson) => lesson.progress === 0);
    if (nextLesson) return nextLesson;

    // If all lessons are completed, return the first lesson
    return lessons[0];
  };

  const progress = calculateProgress();
  const currentLesson = getCurrentLesson();

  return (
    <div className="relative overflow-hidden rounded-2xl mt-6">
      {/* Container với responsive height */}
      <div className="relative min-h-[300px] sm:min-h-[350px] md:h-96">
        {/* Ảnh nền */}
        <img
          src={course.image}
          alt={course.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/40 to-slate-900" />

        {/* Hiệu ứng nền - responsive */}
        <div className="absolute top-6 right-4 sm:top-10 sm:right-6 md:right-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-6 left-4 sm:bottom-10 sm:left-6 md:left-10 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-pink-500/10 rounded-full blur-3xl" />

        {/* Nội dung hero */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Course Info */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 leading-tight">
                  {course.title}
                </h1>

                {/* Mô tả: hiện trên tablet trở lên */}
                <p className="hidden sm:block text-purple-100 text-sm sm:text-base mb-4 lg:mb-6 max-w-2xl mx-auto lg:mx-0 line-clamp-2 lg:line-clamp-3">
                  {course.description}
                </p>

                {/* Thông tin tổng quan - responsive grid */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg backdrop-blur">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300" />
                    <span className="text-white font-semibold">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg backdrop-blur">
                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    <span className="text-white font-semibold">
                      {lessons.length} bài học
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm sm:max-w-md lg:w-80">
                  <div className="btn-shimmer bg-linear-to-br from-purple-500 via-pink-500 to-rose-500 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="space-y-4 sm:space-y-5 text-center lg:text-left">
                      <div>
                        <h3 className="text-white text-sm sm:text-base font-semibold mb-2 flex items-center justify-center lg:justify-start gap-2">
                          <Flame className="w-3 h-3 sm:w-4 sm:h-4" /> Tiến độ
                          khóa học
                        </h3>
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 sm:mb-3">
                          {progress}%
                        </div>
                        <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur">
                          <div
                            className="h-full bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Thống kê nhỏ - hiện trên tablet trở lên */}
                      <div className="hidden sm:grid grid-cols-2 gap-3">
                        <div className="bg-white/20 backdrop-blur rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                          <div className="text-white font-bold text-base sm:text-lg">
                            {completedCount}
                          </div>
                          <div className="text-white/80 text-xs sm:text-sm">
                            Hoàn thành
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                          <div className="text-white font-bold text-base sm:text-lg">
                            {inProgressCount}
                          </div>
                          <div className="text-white/80 text-xs sm:text-sm">
                            Đang học
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn-shimmer relative w-full bg-white text-purple-600 font-bold py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base lg:text-lg"
                        onClick={() =>
                          navigate(
                            `/courses/${course.id}/lessons/${currentLesson?.id}`
                          )
                        }
                      >
                        Tiếp tục học{" "}
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
