// // src/components/courses/LessonCard.jsx
// import React, { useContext } from "react";
// import { Card } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Progress } from "../ui/progress";
// import { ThemeContext } from "../../context/ThemeContext";

// export default function LessonCard({ lesson, progress, onClick }) {
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   // Badge màu theo trạng thái
//   const badgeClass =
//     progress === "completed"
//       ? isDark
//         ? "bg-green-600 text-white"
//         : "bg-green-100 text-green-800"
//       : progress === "in_progress"
//       ? isDark
//         ? "bg-yellow-500 text-white"
//         : "bg-yellow-100 text-yellow-800"
//       : isDark
//       ? "bg-gray-600 text-white"
//       : "bg-gray-100 text-gray-700";

//   // Progress bar màu
//   const progressColor =
//     progress === "completed"
//       ? "bg-green-500"
//       : progress === "in_progress"
//       ? "bg-yellow-500"
//       : "bg-gray-400";

//   return (
//     <Card
//       className={`p-6 flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 ${
//         isDark ? "bg-gray-800" : "bg-white"
//       }`}
//     >
//       <div className="flex flex-col flex-1 gap-3">
//         <div className="flex items-center justify-between">
//           <h3
//             className={`text-xl font-bold ${
//               isDark ? "text-gray-100" : "text-gray-900"
//             }`}
//           >
//             {lesson.title}
//           </h3>
//           <Badge
//             className={`px-2 py-1 text-sm font-medium rounded-full ${badgeClass}`}
//           >
//             {progress === "completed"
//               ? "Hoàn thành"
//               : progress === "in_progress"
//               ? "Đang học"
//               : "Chưa học"}
//           </Badge>
//         </div>

//         <p
//           className={`text-sm ${
//             isDark ? "text-gray-300" : "text-gray-600"
//           } line-clamp-3`}
//         >
//           {lesson.content || "Chưa có mô tả chi tiết."}
//         </p>
//       </div>

//       <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//         <div className="flex-1">
//           <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
//             <div
//               className={`h-2 ${progressColor} rounded-full transition-all duration-500`}
//               style={{
//                 width:
//                   progress === "completed"
//                     ? "100%"
//                     : progress === "in_progress"
//                     ? "50%"
//                     : "0%",
//               }}
//             />
//           </div>
//         </div>

//         <Button
//           onClick={onClick}
//           className={`w-full sm:w-auto mt-2 sm:mt-0 ${
//             isDark
//               ? "bg-indigo-600 hover:bg-indigo-500 text-white"
//               : "bg-blue-600 hover:bg-blue-700 text-white"
//           } font-semibold rounded-lg transition transform`}
//         >
//           Xem bài học
//         </Button>
//       </div>
//     </Card>
//   );
// }
