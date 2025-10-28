// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import LessonHeader from "@/components/lessons/LessonHeader";
// import LessonExercise from "@/components/lessons/LessonExercise";
// import LessonCode from "@/components/lessons/LessonCode";
// import Breadcrumb from "@/components/layout/Breadcrumb";
// import { ThemeContext } from "@/context/ThemeContext";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { mockLessons } from "@/mock/lessons";
// import { mockCourses } from "@/mock/courses";
// import { mockExercises } from "@/mock/exercises";
// import {
//   BookOpen,
//   Code2,
//   Clock,
//   BarChart3,
//   Trophy,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   CheckCircle2,
//   Target,
//   Sparkles,
// } from "lucide-react";
// import { toast } from "sonner";

// export default function LessonPage() {
//   const { courseId, lessonId } = useParams();
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";
//   const navigate = useNavigate();

//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
//   const [exercises, setExercises] = useState([]);
//   const [activeTab, setActiveTab] = useState("theory");

//   useEffect(() => {
//     const c = mockCourses.find((c) => c.id.toString() === courseId);
//     setCourse(c);

//     const l = mockLessons.find(
//       (l) => l.id.toString() === lessonId && l.course_id.toString() === courseId
//     );
//     setLesson(l);

//     const exs = mockExercises.filter(
//       (ex) => ex.lesson_id.toString() === lessonId
//     );
//     setExercises(exs);
//   }, [courseId, lessonId]);

//   if (!lesson || !course)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 dark:text-gray-400 font-medium">
//             Đang tải bài học...
//           </p>
//         </div>
//       </div>
//     );

//   const completedExercises = exercises.filter(
//     (ex) => ex.status === "completed"
//   ).length;

//   const progressPercent = exercises.length
//     ? Math.round((completedExercises / exercises.length) * 100)
//     : 0;

//   const lessonsInCourse = mockLessons.filter(
//     (l) => l.course_id.toString() === courseId
//   );

//   const currentIndex = lessonsInCourse.findIndex(
//     (l) => l.id.toString() === lessonId
//   );
//   const prevLesson = lessonsInCourse[currentIndex - 1];
//   const nextLesson = lessonsInCourse[currentIndex + 1];

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
//     <div className="min-h-screen w-full relative bg-white dark:bg-gray-900 transition-colors duration-500">
//       <Header />
//       <main className="flex-1 w-full px-4 sm:px-6 md:px-14 lg:px-20 py-6">
//         {/* Breadcrumb */}
//         <Breadcrumb
//           items={[
//             { label: "Trang chủ", href: "/" },
//             { label: "Khóa học", href: "/courses" },
//             { label: course.title, href: `/courses/${courseId}` },
//             { label: lesson.title },
//           ]}
//         />

//         {/* Page Title */}
//         <div className="mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
//           <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
//             {lesson.title}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 text-base mb-3">
//             Thuộc khóa học:{" "}
//             <Link
//               to={`/courses/${course.id}`}
//               className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer transition-colors"
//             >
//               {course.title}
//             </Link>
//           </p>
//         </div>

//         {/* Main Content Area */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* LEFT: Main Content (2/3 width) */}
//           <div className="lg:col-span-2">
//             {/* Tabs Navigation */}
//             <Tabs
//               value={activeTab}
//               onValueChange={setActiveTab}
//               className="w-full"
//             >
//               <TabsList
//                 className={`inline-flex rounded-xl p-2 gap-2 mb-6 ${
//                   isDark
//                     ? "bg-gray-800 border border-gray-700"
//                     : "bg-white border border-gray-200 shadow-sm"
//                 }`}
//               >
//                 <TabsTrigger
//                   value="theory"
//                   className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200
//                       ${
//                         isDark
//                           ? "text-gray-400 hover:text-gray-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
//                           : "text-gray-600 hover:text-gray-900 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
//                       }`}
//                 >
//                   <BookOpen className="w-4 h-4" />
//                   Lý thuyết
//                 </TabsTrigger>

//                 <TabsTrigger
//                   value="exercise"
//                   className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200
//                       ${
//                         isDark
//                           ? "text-gray-400 hover:text-gray-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
//                           : "text-gray-600 hover:text-gray-900 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md"
//                       }`}
//                 >
//                   <Code2 className="w-4 h-4" />
//                   Bài tập
//                   {exercises.length > 0 && (
//                     <span
//                       className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
//                         activeTab === "exercise"
//                           ? "bg-white/20 text-white"
//                           : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
//                       }`}
//                     >
//                       {exercises.length}
//                     </span>
//                   )}
//                 </TabsTrigger>
//               </TabsList>

//               {/* THEORY CONTENT */}
//               <TabsContent value="theory" className="space-y-6 mt-0">
//                 <div
//                   className={`p-8 rounded-2xl ${
//                     isDark
//                       ? "bg-gray-800 border border-gray-700"
//                       : "bg-white border border-gray-200 shadow-sm"
//                   }`}
//                 >
//                   <LessonHeader title={lesson.title} content={lesson.content} />
//                 </div>

//                 {lesson.example_code && (
//                   <div
//                     className={`p-8 rounded-2xl ${
//                       isDark
//                         ? "bg-gray-800 border border-gray-700"
//                         : "bg-white border border-gray-200 shadow-sm"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 mb-4">
//                       <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                       <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                         Ví dụ minh họa
//                       </h3>
//                     </div>
//                     <LessonCode
//                       code={lesson.example_code}
//                       language={lesson.language}
//                     />
//                   </div>
//                 )}
//               </TabsContent>

//               {/* EXERCISE CONTENT */}
//               <TabsContent value="exercise" className="mt-0">
//                 {exercises.length > 0 ? (
//                   <LessonExercise
//                     exercises={exercises}
//                     courseId={courseId}
//                     lessonId={lessonId}
//                   />
//                 ) : (
//                   <div
//                     className={`p-16 rounded-2xl text-center ${
//                       isDark
//                         ? "bg-gray-800 border border-gray-700"
//                         : "bg-gray-50 border border-gray-200"
//                     }`}
//                   >
//                     <div
//                       className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
//                         isDark ? "bg-gray-700" : "bg-gray-200"
//                       }`}
//                     >
//                       <Code2 className="w-10 h-10 text-gray-400 dark:text-gray-500" />
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                       Chưa có bài tập
//                     </h3>
//                     <p className="text-gray-500 dark:text-gray-400">
//                       Bài tập sẽ được cập nhật trong thời gian tới
//                     </p>
//                   </div>
//                 )}
//               </TabsContent>
//             </Tabs>

//             {/* Navigation buttons */}
//             <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
//               {prevLesson ? (
//                 <button
//                   onClick={() =>
//                     navigate(`/courses/${courseId}/lessons/${prevLesson.id}`)
//                   }
//                   className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
//                     isDark
//                       ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
//                       : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm hover:shadow"
//                   }`}
//                 >
//                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
//                   <div className="text-left">
//                     <div className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">
//                       Bài trước: {prevLesson.title}
//                     </div>
//                   </div>
//                 </button>
//               ) : (
//                 <div></div>
//               )}

//               {nextLesson ? (
//                 <button
//                   onClick={() =>
//                     navigate(`/courses/${courseId}/lessons/${nextLesson.id}`)
//                   }
//                   className="group flex items-center gap-3 px-6 py-3 rounded-xl font-medium text-sm
//                       bg-indigo-600 text-white hover:bg-indigo-700
//                       dark:bg-indigo-600 dark:hover:bg-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg"
//                 >
//                   <div className="text-right">
//                     <div className="text-sm text-white mb-0.5">
//                       Bài tiếp theo: {nextLesson.title}
//                     </div>
//                   </div>
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               ) : (
//                 <button
//                   onClick={() =>
//                     toast.success("🎉 Chúc mừng! Bạn đã hoàn thành khóa học.")
//                   }
//                   className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
//                       bg-gradient-to-r from-green-500 to-emerald-600 text-white
//                       hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
//                 >
//                   <Trophy className="w-5 h-5" />
//                   Hoàn thành khóa học
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* RIGHT: Info Sidebar (1/3 width) */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-24 space-y-6">
//               {/* Progress Card */}
//               <div
//                 className={`p-6 rounded-2xl ${
//                   isDark
//                     ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-800/50"
//                     : "bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
//                 }`}
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                     Tiến độ học tập
//                   </h3>
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Hoàn thành
//                     </span>
//                     <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                       {progressPercent}%
//                     </span>
//                   </div>
//                   <div className="w-full h-3 bg-white/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
//                       style={{ width: `${progressPercent}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-indigo-200/30 dark:border-indigo-700/30">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">
//                     Bài tập đã làm
//                   </span>
//                   <div className="flex items-center gap-2">
//                     <CheckCircle2 className="w-4 h-4 text-green-500" />
//                     <span className="font-bold text-gray-900 dark:text-white">
//                       {completedExercises}/{exercises.length}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Lesson Info Card */}
//               <div
//                 className={`p-6 rounded-2xl ${
//                   isDark
//                     ? "bg-gray-800 border border-gray-700"
//                     : "bg-white border border-gray-200 shadow-sm"
//                 }`}
//               >
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
//                   Thông tin bài học
//                 </h3>

//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//                     <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//                       <Clock className="w-5 h-5" />
//                       <span className="text-sm font-medium">Thời gian đọc</span>
//                     </div>
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       {lesson.readTime}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//                     <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//                       <BarChart3 className="w-5 h-5" />
//                       <span className="text-sm font-medium">Độ khó</span>
//                     </div>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(
//                         lesson.difficulty
//                       )}`}
//                     >
//                       {lesson.difficulty}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
//                     <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//                       <Code2 className="w-5 h-5" />
//                       <span className="text-sm font-medium">Ngôn ngữ</span>
//                     </div>
//                     <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wide">
//                       {lesson.language}
//                     </span>
//                   </div>

//                   <div className="flex items-center justify-between py-3">
//                     <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
//                       <Trophy className="w-5 h-5" />
//                       <span className="text-sm font-medium">Số bài tập</span>
//                     </div>
//                     <span className="font-semibold text-gray-900 dark:text-white">
//                       {exercises.length} bài
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ThemeContext } from "@/context/ThemeContext";
import { mockLessons } from "@/mock/lessons";
import { mockCourses } from "@/mock/courses";
import { mockExercises } from "@/mock/exercises";
import LessonTabs from "@/components/lessons/LessonTabs";
import LessonNavigation from "@/components/lessons/LessonNavigation";
import LessonProgressCard from "@/components/lessons/LessonProgressCard";
import LessonInfoCard from "@/components/lessons/LessonInfoCard";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const c = mockCourses.find((c) => c.id.toString() === courseId);
    setCourse(c);

    const l = mockLessons.find(
      (l) => l.id.toString() === lessonId && l.course_id.toString() === courseId
    );
    setLesson(l);

    const exs = mockExercises.filter(
      (ex) => ex.lesson_id.toString() === lessonId
    );
    setExercises(exs);
  }, [courseId, lessonId]);

  if (!lesson || !course)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Đang tải bài học...
          </p>
        </div>
      </div>
    );

  const completedExercises = exercises.filter(
    (ex) => ex.status === "completed"
  ).length;

  const progressPercent = exercises.length
    ? Math.round((completedExercises / exercises.length) * 100)
    : 0;

  const lessonsInCourse = mockLessons.filter(
    (l) => l.course_id.toString() === courseId
  );

  const currentIndex = lessonsInCourse.findIndex(
    (l) => l.id.toString() === lessonId
  );
  const prevLesson = lessonsInCourse[currentIndex - 1];
  const nextLesson = lessonsInCourse[currentIndex + 1];

  return (
    <div className="min-h-screen w-full relative bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />
      <main className="flex-1 w-full px-4 sm:px-6 md:px-14 lg:px-20 py-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title, href: `/courses/${courseId}` },
            { label: lesson.title },
          ]}
        />

        <div className="mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
            {lesson.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base mb-3">
            Thuộc khóa học:{" "}
            <Link
              to={`/courses/${course.id}`}
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {course.title}
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <LessonTabs
              isDark={isDark}
              lesson={lesson}
              exercises={exercises}
              courseId={courseId}
              lessonId={lessonId}
            />

            <LessonNavigation
              isDark={isDark}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
              courseId={courseId}
              navigate={navigate}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <LessonProgressCard
                isDark={isDark}
                progressPercent={progressPercent}
                completedExercises={completedExercises}
                totalExercises={exercises.length}
              />
              <LessonInfoCard
                isDark={isDark}
                lesson={lesson}
                totalExercises={exercises.length}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
