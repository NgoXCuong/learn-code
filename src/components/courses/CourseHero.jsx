// src/components/courses/CourseHero.jsx
import React from "react";
import { Users, Clock, Star, Flame, ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CourseHero({
  course,
  completedCount,
  inProgressCount,
  lessons,
}) {
  const navigate = useNavigate();

  return (
    <div className="relative h-auto md:h-96 overflow-hidden rounded-2xl mt-6 font-exo">
      {/* Ảnh nền */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-56 sm:h-64 md:h-96 object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-900/40 to-slate-900" />

      {/* Hiệu ứng nền */}
      <div className="absolute top-10 right-6 md:right-10 w-24 h-24 md:w-32 md:h-32 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-6 md:left-10 w-28 h-28 md:w-40 md:h-40 bg-pink-500/10 rounded-full blur-3xl" />

      {/* Nội dung hero */}
      <div className="absolute inset-0 flex flex-col md:flex-row justify-center md:items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pb-6 md:pb-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          {/* Course Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 sm:mb-3 leading-tight">
              {course.title}
            </h1>

            {/* Mô tả: ẩn bớt trên mobile */}
            <p className="hidden sm:block text-purple-100 text-lg md:text-xl mb-4 max-w-2xl mx-auto md:mx-0 line-clamp-2">
              {course.description}
            </p>

            {/* Thông tin tổng quan */}
            <div className="hidden sm:flex flex-wrap justify-center md:justify-start gap-3 text-base">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                <Users className="w-4 h-4 text-purple-300" />
                <span className="text-white font-semibold">
                  {course.students.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                <Clock className="w-4 h-4 text-purple-300" />
                <span className="text-white font-semibold">
                  {course.duration}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white font-semibold">
                  {course.rating}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-white font-semibold">
                  {lessons.length} bài học
                </span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className=" w-full md:w-80 shrink-0">
            <div className="btn-shimmer bg-linear-to-br from-purple-500 via-pink-500 to-rose-500 rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-5 text-center md:text-left">
                <div>
                  <h3 className="text-white text-sm sm:text-base font-semibold mb-2 flex items-center justify-center md:justify-start gap-2">
                    <Flame className="w-4 h-4" /> Tiến độ khóa học
                  </h3>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
                    {course.progress}%
                  </div>
                  <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden backdrop-blur">
                    <div
                      className="h-full bg-linear-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Ẩn thống kê nhỏ trên mobile */}
                <div className="hidden sm:grid grid-cols-2 gap-3">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                    <div className="text-white font-bold text-xl">
                      {completedCount}
                    </div>
                    <div className="text-white/80 text-sm">Hoàn thành</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
                    <div className="text-white font-bold text-xl">
                      {inProgressCount}
                    </div>
                    <div className="text-white/80 text-sm">Đang học</div>
                  </div>
                </div>

                <button
                  className="btn-shimmer relative w-full bg-white text-purple-600 font-bold py-2 sm:py-3 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base sm:text-lg"
                  onClick={() =>
                    navigate(`/courses/${course.id}/lessons/${lessons[0]?.id}`)
                  }
                >
                  Tiếp tục học <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
