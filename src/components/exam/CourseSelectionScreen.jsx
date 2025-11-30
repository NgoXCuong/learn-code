import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressContext } from "@/context/ProgressContext";
import { mockCourses, mockLanguages } from "@/mock/courses";
import {
  BookOpen,
  Trophy,
  CheckCircle,
  PlayCircle,
  Star,
  ArrowLeft,
} from "lucide-react";

export default function CourseSelectionScreen({ onCourseSelect, goHome }) {
  const navigate = useNavigate();
  const { getCourseProgress } = useContext(ProgressContext);

  // Get courses that user has completed
  const completedCourses = mockCourses.filter((course) => {
    const dynamicProgress = getCourseProgress(course.id);
    const displayProgress =
      dynamicProgress > 0 ? dynamicProgress : course.progress;
    return displayProgress === 100;
  });

  const handleCourseClick = (course) => {
    onCourseSelect(course);
  };

  return (
    <div
      className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      <div className="relative z-10 container mx-auto px-6 xl:px-0 pt-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            Bài kiểm tra năng lực cuối khóa
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Chọn một khóa học bạn đã{" "}
            <span className="text-green-600 dark:text-green-400 font-bold">
              hoàn thành 100%
            </span>{" "}
            để thực hiện bài kiểm tra năng lực cuối khóa.
          </p>
        </div>

        {/* Content Section */}
        {completedCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 max-w-2xl mx-auto">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
              <BookOpen className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
              Chưa có khóa học nào hoàn thành
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8 px-4">
              Bạn cần hoàn thành tất cả các bài học trong một khóa học bất kỳ để
              mở khóa tính năng thi thử này.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Tiếp tục học
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {completedCourses.map((course) => {
              const langName =
                mockLanguages.find((l) => l.id === course.lang_id)?.name ||
                "Code";

              return (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                  className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 cursor-pointer border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150" />

                  <div className="relative flex flex-col h-full justify-between gap-6">
                    <div>
                      {/* Top Badge Row */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold tracking-wider rounded-lg border border-slate-200 dark:border-slate-700">
                          {langName}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs  rounded-full border border-green-200 dark:border-green-800">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Done
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                    </div>

                    {/* Footer Action */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-sm">Bắt đầu làm bài</span>
                        <PlayCircle className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
