import { ArrowRight, CheckCircle, Clock, Zap } from "lucide-react";

export default function HomeScreen({ startQuiz, startExercises }) {
  return (
    <div
      className="h-full bg-linear-to-br  from-slate-50 via-blue-50 to-indigo-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 xl:px-0 py-6 sm:py-8 md:py-10 pb-8 sm:pb-12 md:pb-15 max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
            Trung Tâm Kiểm Tra Kỹ Năng Lập Trình
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hoàn thành các bài thi lập trình được thiết kế chuẩn xác để đánh giá
            năng lực, tư duy thuật toán và mức độ thành thạo công nghệ của bạn.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Quiz Card */}
          <div
            onClick={startQuiz}
            className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-400 hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-900 rounded-full opacity-60 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative p-6 sm:p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-50 group-hover:text-blue-600 transition-colors">
                    Trắc nghiệm Kiến thức
                  </h2>
                  <div className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-xs sm:text-sm font-bold self-start sm:self-auto">
                    25 câu hỏi
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  Kiểm tra kiến thức lập trình với bài trắc nghiệm toàn diện.
                  Nhận phản hồi chi tiết và điểm kinh nghiệm sau mỗi bài thi.
                </p>

                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                  {[
                    "25 câu hỏi đa dạng về lập trình",
                    "Giải thích chi tiết cho mỗi đáp án",
                    "Hệ thống đánh giá 5 cấp độ",
                    "Gợi ý học tập cá nhân hóa",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 border-t-2 border-gray-100 dark:border-gray-700 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">~15 phút</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-bold">+150 EXP</span>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base group-hover:gap-4 transition-all">
                  Bắt đầu
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Exercises Card */}
          <div
            onClick={startExercises}
            className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-2 border-transparent hover:border-purple-400 hover:-translate-y-2 flex flex-col justify-between"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-700 dark:to-purple-900 rounded-full opacity-60 group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative p-6 sm:p-8 md:p-10 flex-1 flex flex-col justify-between">
              <div>
                <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-50 group-hover:text-purple-600 transition-colors">
                    Bài tập Lập trình
                  </h2>
                  <div className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 rounded-full text-xs sm:text-sm font-bold self-start sm:self-auto">
                    10 bài tập
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                  Thực hành code với bộ sưu tập bài tập từ dễ đến khó. Rèn luyện
                  tư duy thuật toán và kỹ năng giải quyết vấn đề.
                </p>

                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base">
                  {[
                    "30 bài tập đa cấp độ kỹ năng",
                    "Code trực tiếp trên trình soạn thảo",
                    "Test cases tự động kiểm tra",
                    "Ước tính thời gian hoàn thành",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 pt-4 border-t-2 border-gray-100 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">5-25 phút/bài</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-bold">50-160 EXP/bài</span>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm sm:text-base group-hover:gap-4 transition-all">
                  Bắt đầu
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
