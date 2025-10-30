// import React from "react";
// import { BookOpen, Code, Check, Clock, AlertCircle } from "lucide-react";

// const Sidebar = ({
//   activeTab,
//   setActiveTab,
//   sidebarOpen,
//   quizData,
//   selectedAnswers,
//   markedQuestions,
//   advancedTasks,
// }) => {
//   const completedAdvanced = advancedTasks.filter(
//     (t) => t.status === "completed"
//   ).length;
//   const totalAdvanced = advancedTasks.length;

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <Check className="w-5 h-5 text-green-500" />;
//       case "in_progress":
//         return <Clock className="w-5 h-5 text-yellow-500" />;
//       default:
//         return <AlertCircle className="w-5 h-5 text-gray-400" />;
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case "Dễ":
//         return "text-green-600 dark:text-green-400";
//       case "Trung bình":
//         return "text-yellow-600 dark:text-yellow-400";
//       case "Khó":
//         return "text-red-600 dark:text-red-400";
//       default:
//         return "text-gray-600 dark:text-gray-400";
//     }
//   };

//   if (!sidebarOpen) return null;

//   return (
//     <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen sticky top-16">
//       <div className="p-4">
//         {/* Tab switcher */}
//         <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
//           <button
//             onClick={() => setActiveTab("basic")}
//             className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
//               activeTab === "basic"
//                 ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
//                 : "text-gray-600 dark:text-gray-300"
//             }`}
//           >
//             <BookOpen className="w-4 h-4" />
//             <span className="font-medium">Cơ bản</span>
//           </button>
//           <button
//             onClick={() => setActiveTab("advanced")}
//             className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all ${
//               activeTab === "advanced"
//                 ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
//                 : "text-gray-600 dark:text-gray-300"
//             }`}
//           >
//             <Code className="w-4 h-4" />
//             <span className="font-medium">Nâng cao</span>
//           </button>
//         </div>

//         {/* Progress overview */}
//         <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//           <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
//             Tiến trình học tập
//           </h3>
//           <div className="space-y-2">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600 dark:text-gray-400">Cơ bản</span>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 {Object.keys(selectedAnswers).length}/
//                 {quizData.basicQuiz.questions.length}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//               <div
//                 className="bg-blue-600 h-2 rounded-full transition-all"
//                 style={{
//                   width: `${
//                     (Object.keys(selectedAnswers).length /
//                       quizData.basicQuiz.questions.length) *
//                     100
//                   }%`,
//                 }}
//               />
//             </div>
//           </div>
//           <div className="space-y-2 mt-4">
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600 dark:text-gray-400">Nâng cao</span>
//               <span className="font-medium text-gray-900 dark:text-white">
//                 {completedAdvanced}/{totalAdvanced}
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
//               <div
//                 className="bg-green-600 h-2 rounded-full transition-all"
//                 style={{
//                   width: `${(completedAdvanced / totalAdvanced) * 100}%`,
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Question / Task List */}
//         {activeTab === "basic" && (
//           <div>
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
//               Danh sách câu hỏi
//             </h3>
//             <div className="space-y-2">
//               {quizData.basicQuiz.questions.map((q) => (
//                 <div
//                   key={q.id}
//                   className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
//                     selectedAnswers[q.id] !== undefined
//                       ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
//                       : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-medium text-gray-900 dark:text-white">
//                       Câu {q.id}
//                     </span>
//                     <div className="flex items-center gap-2">
//                       {markedQuestions.has(q.id) && (
//                         <AlertCircle className="w-4 h-4 text-orange-500" />
//                       )}
//                       {selectedAnswers[q.id] !== undefined && (
//                         <Check className="w-4 h-4 text-blue-600" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {activeTab === "advanced" && (
//           <div>
//             <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
//               Danh sách bài tập
//             </h3>
//             <div className="space-y-2">
//               {advancedTasks.map((task) => (
//                 <div
//                   key={task.id}
//                   className={`p-3 rounded-lg border-2 transition-all ${
//                     task.status === "completed"
//                       ? "border-green-500 bg-green-50 dark:bg-green-900/20"
//                       : task.status === "in_progress"
//                       ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
//                       : "border-gray-200 dark:border-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       {getStatusIcon(task.status)}
//                       <span className="font-medium text-gray-900 dark:text-white text-sm">
//                         Bài {task.id}
//                       </span>
//                     </div>
//                     <span
//                       className={`text-xs font-medium ${getDifficultyColor(
//                         task.difficulty
//                       )}`}
//                     >
//                       {task.difficulty}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React from "react";
import { BookOpen, Code, Check, Clock, AlertCircle, Award } from "lucide-react";

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  quizData,
  selectedAnswers,
  markedQuestions,
  advancedTasks,
}) => {
  const completedAdvanced = advancedTasks.filter(
    (t) => t.status === "completed"
  ).length;
  const totalAdvanced = advancedTasks.length;

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const totalQuestions = quizData.basicQuiz.questions.length;
  const basicProgress = (answeredQuestions / totalQuestions) * 100;
  const advancedProgress = (completedAdvanced / totalAdvanced) * 100;

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "Dễ":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "Trung bình":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      case "Khó":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400";
    }
  };

  if (!sidebarOpen) return null;

  return (
    <aside className="w-80 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        {/* Tab Switcher - More compact and modern */}
        <div className="flex gap-1 mb-6 bg-gray-200/50 dark:bg-gray-700/50 rounded-xl p-1.5">
          <button
            onClick={() => setActiveTab("basic")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg transition-all font-medium text-sm ${
              activeTab === "basic"
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Cơ bản
          </button>
          <button
            onClick={() => setActiveTab("advanced")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg transition-all font-medium text-sm ${
              activeTab === "advanced"
                ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-md"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
          >
            <Code className="w-4 h-4" />
            Nâng cao
          </button>
        </div>

        {/* Progress Cards - More visual */}
        <div className="space-y-4 mb-6">
          {/* Basic Progress Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-4 text-white shadow-lg">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">Cơ bản</span>
                <Award className="w-5 h-5 opacity-80" />
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold">{answeredQuestions}</span>
                <span className="text-lg opacity-80">/ {totalQuestions}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${basicProgress}%` }}
                />
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>

          {/* Advanced Progress Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 p-4 text-white shadow-lg">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium opacity-90">Nâng cao</span>
                <Code className="w-5 h-5 opacity-80" />
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold">{completedAdvanced}</span>
                <span className="text-lg opacity-80">/ {totalAdvanced}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${advancedProgress}%` }}
                />
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Question List - Basic */}
        {activeTab === "basic" && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Danh sách câu hỏi
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {quizData.basicQuiz.questions.map((q) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isMarked = markedQuestions.has(q.id);

                return (
                  <button
                    key={q.id}
                    className={`relative aspect-square rounded-lg font-semibold text-sm transition-all hover:scale-105 ${
                      isAnswered
                        ? "bg-blue-500 dark:bg-blue-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
                    }`}
                  >
                    {q.id}
                    {isMarked && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                    {isAnswered && (
                      <Check className="absolute bottom-0.5 right-0.5 w-3 h-3" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Task List - Advanced */}
        {activeTab === "advanced" && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Danh sách bài tập
            </h3>
            <div className="space-y-2">
              {advancedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`group relative overflow-hidden rounded-lg p-3 transition-all cursor-pointer ${
                    task.status === "completed"
                      ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800"
                      : task.status === "in_progress"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800"
                      : "bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          task.status === "completed"
                            ? "bg-green-500 dark:bg-green-600 text-white"
                            : task.status === "in_progress"
                            ? "bg-yellow-500 dark:bg-yellow-600 text-white"
                            : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-900 dark:text-white">
                          Bài tập {task.id}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {task.status === "completed"
                            ? "Hoàn thành"
                            : task.status === "in_progress"
                            ? "Đang làm"
                            : "Chưa bắt đầu"}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${getDifficultyBadge(
                        task.difficulty
                      )}`}
                    >
                      {task.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
