// import React from "react";
// import { Clock, BarChart3, Code2, Trophy } from "lucide-react";

// export default function LessonInfoCard({ isDark, lesson, totalExercises }) {
//   const getDifficultyColor = (difficulty) => {
//     const colors = {
//       Dễ: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
//       "Trung bình":
//         "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20",
//       Khó: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20",
//     };
//     return (
//       colors[difficulty] ||
//       "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
//     );
//   };

//   return (
//     <div
//       className={`p-6 rounded-2xl ${
//         isDark
//           ? "bg-gray-800 border border-gray-700"
//           : "bg-white border border-gray-200 shadow-sm"
//       }`}
//     >
//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//         Thông tin bài học
//       </h3>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//           <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//             <Clock className="w-5 h-5" />
//             <span className="text-base font-medium">Thời gian đọc</span>
//           </div>
//           <span className="font-semibold text-gray-900 dark:text-white">
//             {lesson.readTime}
//           </span>
//         </div>

//         <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//           <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//             <BarChart3 className="w-5 h-5" />
//             <span className="text-base font-medium">Độ khó</span>
//           </div>
//           <span
//             className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(
//               lesson.difficulty
//             )}`}
//           >
//             {lesson.difficulty}
//           </span>
//         </div>

//         <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//           <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//             <Code2 className="w-5 h-5" />
//             <span className="text-base font-medium">Ngôn ngữ</span>
//           </div>
//           <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wide">
//             {lesson.language}
//           </span>
//         </div>

//         <div className="flex items-center justify-between py-3">
//           <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//             <Trophy className="w-5 h-5" />
//             <span className="text-base font-medium">Số bài tập</span>
//           </div>
//           <span className="font-semibold text-gray-900 dark:text-white">
//             {totalExercises} bài
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
