// // src/pages/Compiler.jsx
// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Breadcrumb from "@/components/layout/Breadcrumb";
// import CodeEditor from "@/components/compiler/CodeEditor";
// import Output from "@/components/compiler/Output";
// import EmotionAnalysis from "@/components/compiler/EmotionAnalysis";
// import { ThemeContext } from "@/context/ThemeContext";

// import { mockCourses } from "@/mock/courses";
// import { mockLessons } from "@/mock/lessons";
// import { mockExercises } from "@/mock/exercises";

// // Mock API chạy code (demo)
// const runCode = async ({ language, code }) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ output: `Kết quả giả lập (${language}):\n${code}` });
//     }, 500);
//   });
// };

// // Mock API submit code (demo)
// const submitExercise = async ({ exerciseId, code }) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         passed: true,
//         message: "Submit thành công!",
//         comments: [],
//       });
//     }, 500);
//   });
// };

// export default function Compiler() {
//   const { courseId, lessonId, exerciseId } = useParams();
//   const navigate = useNavigate();
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
//   const [exercises, setExercises] = useState([]);
//   const [currentExercise, setCurrentExercise] = useState(null);
//   const [currentCode, setCurrentCode] = useState("");
//   const [isRunning, setIsRunning] = useState(false);
//   const [output, setOutput] = useState("");

//   const [languages, setLanguages] = useState([
//     "javascript",
//     "python",
//     "cpp",
//     "java",
//     "csharp",
//   ]);
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");

//   // Load dữ liệu từ mock
//   useEffect(() => {
//     const c = mockCourses.find((c) => c.id.toString() === courseId);
//     setCourse(c);

//     const l = mockLessons.find(
//       (l) => l.id.toString() === lessonId && l.course_id.toString() === courseId
//     );
//     setLesson(l);

//     const exs = mockExercises.filter(
//       (e) => e.lesson_id.toString() === lessonId
//     );
//     setExercises(exs);

//     const selectedEx =
//       exs.find((e) => e.id.toString() === exerciseId) || exs[0];
//     setCurrentExercise(selectedEx);
//     setCurrentCode(selectedEx?.example_code || "");
//     setSelectedLanguage(selectedEx?.language || "javascript");
//   }, [courseId, lessonId, exerciseId]);

//   const handleRun = async () => {
//     setIsRunning(true);
//     try {
//       const res = await runCode({
//         language: selectedLanguage,
//         code: currentCode,
//       });
//       setOutput(res.output);
//     } catch (err) {
//       setOutput("Lỗi khi chạy code: " + err.message);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!currentExercise) return;
//     try {
//       const res = await submitExercise({
//         exerciseId: currentExercise.id,
//         code: currentCode,
//       });
//       navigate(
//         `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
//         { state: { feedback: res } }
//       );
//     } catch (err) {
//       navigate(
//         `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
//         {
//           state: {
//             feedback: { passed: false, message: err.message, comments: [] },
//           },
//         }
//       );
//     }
//   };

//   // Breadcrumb
//   const breadcrumbItems = [{ label: "Trang chủ", href: "/" }];
//   if (course) breadcrumbItems.push({ label: "Khóa học", href: "/courses" });
//   if (course && lesson) {
//     breadcrumbItems.push({ label: course.title, href: `/courses/${courseId}` });
//     breadcrumbItems.push({
//       label: lesson.title,
//       href: `/courses/${courseId}/lessons/${lessonId}`,
//     });
//   }
//   breadcrumbItems.push({ label: "Compiler" });

//   return (
//     <div className="flex flex-col max-h-screen h-[1000px] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
//       <Header />

//       <main className="flex-1 w-full px-4 sm:px-10 lg:px-16 py-4 flex flex-col h-[calc(100vh-140px)] gap-4">
//         <Breadcrumb items={breadcrumbItems} />

//         <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full min-h-0">
//           {/* Trái: 2/3 width */}
//           <div className="flex-[2] flex flex-col gap-4 min-h-0">
//             {/* Trên trái: Nội dung bài tập */}
//             <div
//               className={`h-1/4 p-4 md:p-6 rounded-md overflow-auto min-h-0 ${
//                 isDark
//                   ? "bg-gray-800 text-gray-100 border border-gray-700"
//                   : "bg-white text-gray-900 border border-gray-200"
//               }`}
//             >
//               {currentExercise && lesson && (
//                 <>
//                   <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
//                   <h3 className="text-lg font-semibold mb-1">
//                     {currentExercise.title}
//                   </h3>
//                   <p className="text-sm">{currentExercise.description}</p>
//                 </>
//               )}
//             </div>

//             {/* Dưới trái: Code Editor */}
//             <div className="h-3/4 flex flex-col min-h-0">
//               <CodeEditor
//                 languages={languages}
//                 language={selectedLanguage}
//                 onLanguageChange={setSelectedLanguage}
//                 code={currentCode}
//                 onCodeChange={setCurrentCode}
//                 onRunCode={handleRun}
//                 onSubmitCode={handleSubmit}
//                 isRunning={isRunning}
//               />
//             </div>
//           </div>

//           {/* Phải: 1/3 width */}
//           <div className="flex-1 flex flex-col gap-4 min-h-0">
//             {/* Emotion Analysis */}
//             <div
//               className={`h-1/4 p-2 md:p-3 rounded-md overflow-auto min-h-0 ${
//                 isDark
//                   ? "bg-gray-800 text-gray-100 border border-gray-700"
//                   : "bg-white text-gray-900 border border-gray-200"
//               }`}
//             >
//               <EmotionAnalysis />
//             </div>

//             {/* Output */}
//             <div
//               className={`h-3/4 p-2 md:p-3 rounded-md overflow-auto min-h-0 ${
//                 isDark
//                   ? "bg-gray-800 text-gray-100 border border-gray-700"
//                   : "bg-white text-gray-900 border border-gray-200"
//               }`}
//             >
//               <Output output={output} />
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// import React, { useEffect, useState, useContext, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Breadcrumb from "@/components/layout/Breadcrumb";
// import CodeEditor from "@/components/compiler/CodeEditor";
// import Output from "@/components/compiler/Output";
// import EmotionAnalysis from "@/components/compiler/EmotionAnalysis";
// import { ThemeContext } from "@/context/ThemeContext";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// import { mockCourses } from "@/mock/courses";
// import { mockLessons } from "@/mock/lessons";
// import { mockExercises } from "@/mock/exercises";

// import {
//   Code2,
//   Play,
//   Send,
//   AlertCircle,
//   Target,
//   Clock,
//   Lightbulb,
//   ChevronLeft,
//   ChevronRight,
//   GripVertical,
//   FileText,
//   Terminal,
//   Brain,
// } from "lucide-react";

// // Mock API
// const runCode = async ({ language, code }) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ output: `Kết quả giả lập (${language}):\n${code}` });
//     }, 500);
//   });
// };

// const submitExercise = async ({ exerciseId, code }) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         passed: true,
//         message: "Submit thành công!",
//         comments: [],
//       });
//     }, 500);
//   });
// };

// // Resizable Divider Component
// const ResizableDivider = ({ onResize, orientation = "vertical", isDark }) => {
//   const [isDragging, setIsDragging] = useState(false);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!isDragging) return;
//       onResize(e);
//     };

//     const handleMouseUp = () => {
//       setIsDragging(false);
//     };

//     if (isDragging) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isDragging, onResize]);

//   return (
//     <div
//       className={`group relative flex items-center justify-center select-none ${
//         orientation === "vertical"
//           ? "w-1 cursor-col-resize hover:w-1.5"
//           : "h-1 cursor-row-resize hover:h-1.5"
//       } ${
//         isDark
//           ? "bg-gray-800 hover:bg-indigo-600"
//           : "bg-gray-200 hover:bg-indigo-500"
//       } transition-all ${isDragging ? "bg-indigo-500 w-1.5 h-1.5" : ""}`}
//       onMouseDown={handleMouseDown}
//     >
//       <div
//         className={`absolute ${
//           orientation === "vertical"
//             ? "left-1/2 -translate-x-1/2"
//             : "top-1/2 -translate-y-1/2"
//         } opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
//           isDark ? "text-gray-600" : "text-gray-400"
//         }`}
//       >
//         <GripVertical
//           className={
//             orientation === "vertical" ? "w-4 h-4" : "w-4 h-4 rotate-90"
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default function Compiler() {
//   const { courseId, lessonId, exerciseId } = useParams();
//   const navigate = useNavigate();
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   const [course, setCourse] = useState(null);
//   const [lesson, setLesson] = useState(null);
//   const [exercises, setExercises] = useState([]);
//   const [currentExercise, setCurrentExercise] = useState(null);
//   const [currentCode, setCurrentCode] = useState("");
//   const [isRunning, setIsRunning] = useState(false);
//   const [output, setOutput] = useState("");
//   const [showProblem, setShowProblem] = useState(true);
//   const [activeTab, setActiveTab] = useState("problem");

//   // Resizable state
//   const [leftWidth, setLeftWidth] = useState(600);
//   const [rightWidth, setRightWidth] = useState(600);
//   const [rightTopHeight, setRightTopHeight] = useState(40);
//   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

//   const containerRef = useRef(null);

//   const [languages] = useState([
//     "javascript",
//     "python",
//     "cpp",
//     "java",
//     "csharp",
//   ]);
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");

//   // Load dữ liệu
//   useEffect(() => {
//     const c = mockCourses.find((c) => c.id.toString() === courseId);
//     setCourse(c);

//     const l = mockLessons.find(
//       (l) => l.id.toString() === lessonId && l.course_id.toString() === courseId
//     );
//     setLesson(l);

//     const exs = mockExercises.filter(
//       (e) => e.lesson_id.toString() === lessonId
//     );
//     setExercises(exs);

//     const selectedEx =
//       exs.find((e) => e.id.toString() === exerciseId) || exs[0];
//     setCurrentExercise(selectedEx);
//     setCurrentCode(selectedEx?.example_code || "");
//     setSelectedLanguage(selectedEx?.language || "javascript");
//   }, [courseId, lessonId, exerciseId]);

//   const handlePrevExercise = () => {
//     if (currentExerciseIndex > 0) {
//       setCurrentExerciseIndex(currentExerciseIndex - 1);
//     }
//   };

//   const handleNextExercise = () => {
//     if (currentExerciseIndex < exercises.length - 1) {
//       setCurrentExerciseIndex(currentExerciseIndex + 1);
//     }
//   };

//   const handleRun = async () => {
//     setIsRunning(true);
//     try {
//       const res = await runCode({
//         language: selectedLanguage,
//         code: currentCode,
//       });
//       setOutput(res.output);
//     } catch (err) {
//       setOutput("Lỗi khi chạy code: " + err.message);
//     } finally {
//       setIsRunning(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!currentExercise) return;
//     try {
//       const res = await submitExercise({
//         exerciseId: currentExercise.id,
//         code: currentCode,
//       });
//       navigate(
//         `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
//         { state: { feedback: res } }
//       );
//     } catch (err) {
//       navigate(
//         `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
//         {
//           state: {
//             feedback: { passed: false, message: err.message, comments: [] },
//           },
//         }
//       );
//     }
//   };

//   // Resize handlers
//   const handleLeftResize = (e) => {
//     if (!containerRef.current) return;
//     const containerRect = containerRef.current.getBoundingClientRect();
//     const newWidth = e.clientX - containerRect.left;
//     if (newWidth >= 280 && newWidth <= 600) {
//       setLeftWidth(newWidth);
//     }
//   };

//   const handleRightResize = (e) => {
//     if (!containerRef.current) return;
//     const containerRect = containerRef.current.getBoundingClientRect();
//     const newWidth = containerRect.right - e.clientX;
//     if (newWidth >= 280 && newWidth <= 600) {
//       setRightWidth(newWidth);
//     }
//   };

//   const handleRightPanelVerticalResize = (e) => {
//     if (!containerRef.current) return;
//     const rightPanel = containerRef.current.querySelector(".right-panel");
//     if (!rightPanel) return;
//     const panelRect = rightPanel.getBoundingClientRect();
//     const newHeightPercent =
//       ((e.clientY - panelRect.top) / panelRect.height) * 100;
//     if (newHeightPercent >= 20 && newHeightPercent <= 80) {
//       setRightTopHeight(newHeightPercent);
//     }
//   };

//   // Breadcrumb
//   const breadcrumbItems = [{ label: "Trang chủ", href: "/" }];
//   if (course) breadcrumbItems.push({ label: "Khóa học", href: "/courses" });
//   if (course && lesson) {
//     breadcrumbItems.push({ label: course.title, href: `/courses/${courseId}` });
//     breadcrumbItems.push({
//       label: lesson.title,
//       href: `/courses/${courseId}/lessons/${lessonId}`,
//     });
//   }
//   breadcrumbItems.push({ label: "Thực hành" });

//   // Navigation
//   const currentExIndex = exercises.findIndex(
//     (ex) => ex.id.toString() === exerciseId
//   );
//   const prevExercise = exercises[currentExIndex - 1];
//   const nextExercise = exercises[currentExIndex + 1];

//   // Problem content component
//   const ProblemContent = () => (
//     <div className="space-y-6">
//       <div>
//         <div className="flex items-center gap-2 mb-3">
//           <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
//             <Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//           </div>
//           <h2 className="text-lg font-bold text-gray-900 dark:text-white">
//             Mô tả bài toán
//           </h2>
//         </div>
//         <p
//           className={`text-sm leading-relaxed ${
//             isDark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           {currentExercise?.description}
//         </p>
//       </div>

//       <div>
//         <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
//           Ví dụ:
//         </h3>
//         <div
//           className={`p-4 rounded-lg font-mono text-sm ${
//             isDark ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-800"
//           }`}
//         >
//           <div className="mb-2">
//             <span className="text-gray-500 dark:text-gray-400">Input:</span>{" "}
//             <span className="font-semibold">
//               nums = [2,7,11,15], target = 9
//             </span>
//           </div>
//           <div>
//             <span className="text-gray-500 dark:text-gray-400">Output:</span>{" "}
//             <span className="font-semibold">[0,1]</span>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
//           Ràng buộc:
//         </h3>
//         <ul
//           className={`text-sm space-y-1 list-disc list-inside ${
//             isDark ? "text-gray-300" : "text-gray-700"
//           }`}
//         >
//           <li>2 ≤ nums.length ≤ 10⁴</li>
//           <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
//           <li>-10⁹ ≤ target ≤ 10⁹</li>
//         </ul>
//       </div>

//       <div
//         className={`p-4 rounded-lg border ${
//           isDark
//             ? "bg-amber-900/10 border-amber-800/30"
//             : "bg-amber-50 border-amber-200"
//         }`}
//       >
//         <div className="flex items-start gap-2">
//           <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
//           <div>
//             <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">
//               Gợi ý
//             </h3>
//             <p className="text-sm text-amber-800 dark:text-amber-400">
//               Sử dụng hash map để tối ưu độ phức tạp thời gian
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div
//       className={`flex flex-col h-screen ${
//         isDark ? "bg-gray-950" : "bg-gray-50"
//       }`}
//     >
//       <Header />

//       {/* Top Bar */}
//       <div
//         className={`border-b ${
//           isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
//         }`}
//       >
//         <div className="py-3 sm:py-6">
//           <div className="flex-grow w-full px-4 sm:px-6 md:px-14 lg:px-20">
//             <Breadcrumb items={breadcrumbItems} />
//           </div>

//           {/* Exercise Title & Navigation */}
//           {currentExercise && (
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-4 sm:px-6 md:px-14 lg:px-20">
//               <div className="flex-1">
//                 <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
//                   {currentExercise.title}
//                 </h1>
//                 <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
//                   <span
//                     className={`flex items-center gap-1 ${
//                       isDark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     <Target className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="font-medium">
//                       {currentExercise.difficulty || "Trung bình"}
//                     </span>
//                   </span>
//                   <span
//                     className={`flex items-center gap-1 ${
//                       isDark ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
//                     <span className="font-medium">30 phút</span>
//                   </span>
//                 </div>
//               </div>

//               {/* Navigation Buttons */}
//               {/* Navigation Buttons */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => {
//                     if (prevExercise) {
//                       navigate(
//                         `/courses/${courseId}/lessons/${lessonId}/exercise/${prevExercise.id}`
//                       );
//                     }
//                   }}
//                   disabled={!prevExercise}
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     !prevExercise
//                       ? isDark
//                         ? "bg-gray-800 text-gray-600 cursor-not-allowed"
//                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       : isDark
//                       ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   <span className="hidden sm:inline">Bài trước</span>
//                 </button>

//                 <div
//                   className={`px-3 py-2 text-xs sm:text-sm font-medium ${
//                     isDark ? "text-gray-400" : "text-gray-600"
//                   }`}
//                 >
//                   {currentExIndex + 1} / {exercises.length}
//                 </div>

//                 <button
//                   onClick={() => {
//                     if (nextExercise) {
//                       navigate(
//                         `/courses/${courseId}/lessons/${lessonId}/exercise/${nextExercise.id}`
//                       );
//                     } else {
//                       alert(
//                         "🎉 Bạn đã hoàn thành tất cả bài tập trong bài học!"
//                       );
//                     }
//                   }}
//                   disabled={!nextExercise}
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
//                     !nextExercise
//                       ? isDark
//                         ? "bg-gray-800 text-gray-600 cursor-not-allowed"
//                         : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                       : isDark
//                       ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   }`}
//                 >
//                   <span className="hidden sm:inline">Bài tiếp</span>
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Main Content - Responsive Layout */}
//       <main
//         ref={containerRef}
//         className="flex-1 flex flex-col lg:flex-row overflow-hidden"
//       >
//         {/* DESKTOP: 3-Column Layout */}
//         <div className="hidden lg:flex flex-1 overflow-hidden">
//           {/* Left Panel */}
//           {showProblem && (
//             <>
//               <div
//                 className={`overflow-y-auto ${
//                   isDark ? "bg-gray-900" : "bg-white"
//                 }`}
//                 style={{ width: `${leftWidth}px` }}
//               >
//                 <div className="p-6 relative">
//                   <button
//                     onClick={() => setShowProblem(false)}
//                     className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors z-10 ${
//                       isDark
//                         ? "hover:bg-gray-800 text-gray-400"
//                         : "hover:bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     <ChevronLeft className="w-8 h-8" />
//                   </button>
//                   {currentExercise && <ProblemContent />}
//                 </div>
//               </div>
//               <ResizableDivider
//                 onResize={handleLeftResize}
//                 orientation="vertical"
//                 isDark={isDark}
//               />
//             </>
//           )}

//           {!showProblem && (
//             <button
//               onClick={() => setShowProblem(true)}
//               className={`w-10 flex items-center justify-center transition-colors ${
//                 isDark
//                   ? "bg-gray-900 hover:bg-gray-800"
//                   : "bg-white hover:bg-gray-50"
//               }`}
//             >
//               <ChevronRight className="w-8 h-8 text-gray-700" />
//             </button>
//           )}

//           {/* Center: Code Editor */}
//           <div className="flex-1 flex flex-col min-w-0">
//             <CodeEditor
//               languages={languages}
//               language={selectedLanguage}
//               onLanguageChange={setSelectedLanguage}
//               code={currentCode}
//               onCodeChange={setCurrentCode}
//               onRunCode={handleRun}
//               onSubmitCode={handleSubmit}
//               isRunning={isRunning}
//             />
//           </div>

//           <ResizableDivider
//             onResize={handleRightResize}
//             orientation="vertical"
//             isDark={isDark}
//           />

//           {/* Right Panel */}
//           <div
//             className={`flex flex-col right-panel ${
//               isDark ? "bg-gray-900" : "bg-white"
//             }`}
//             style={{ width: `${rightWidth}px` }}
//           >
//             <div
//               className="overflow-y-auto"
//               style={{ height: `${rightTopHeight}%` }}
//             >
//               <div className="p-4">
//                 <EmotionAnalysis />
//               </div>
//             </div>

//             <ResizableDivider
//               onResize={handleRightPanelVerticalResize}
//               orientation="horizontal"
//               isDark={isDark}
//             />

//             <div className="flex-1 overflow-y-auto">
//               <div className="p-4">
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
//                     <Terminal className="w-5 h-5 text-green-600 dark:text-green-400" />
//                   </div>
//                   <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                     Kết quả
//                   </h3>
//                 </div>
//                 <Output output={output} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE/TABLET: Stacked Layout with Tabs */}
//         <div className="flex lg:hidden flex-1 flex-col overflow-hidden">
//           <Tabs
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="flex-1 flex flex-col"
//           >
//             <TabsList
//               className={`flex gap-1 p-1 m-4 rounded-lg ${
//                 isDark ? "bg-gray-800" : "bg-gray-100"
//               }`}
//             >
//               <TabsTrigger
//                 value="problem"
//                 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isDark
//                     ? "data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
//                     : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
//                 }`}
//               >
//                 <FileText className="w-4 h-4" />
//                 Đề bài
//               </TabsTrigger>
//               <TabsTrigger
//                 value="code"
//                 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isDark
//                     ? "data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
//                     : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
//                 }`}
//               >
//                 <Code2 className="w-4 h-4" />
//                 Code
//               </TabsTrigger>
//               <TabsTrigger
//                 value="output"
//                 className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
//                   isDark
//                     ? "data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
//                     : "data-[state=active]:bg-white data-[state=active]:text-gray-900 text-gray-600"
//                 }`}
//               >
//                 <Terminal className="w-4 h-4" />
//                 Kết quả
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent
//               value="problem"
//               className="flex-1 overflow-y-auto m-0 p-4"
//             >
//               {currentExercise && <ProblemContent />}
//             </TabsContent>

//             <TabsContent value="code" className="flex-1 flex flex-col min-w-0">
//               <CodeEditor
//                 languages={languages}
//                 language={selectedLanguage}
//                 onLanguageChange={setSelectedLanguage}
//                 code={currentCode}
//                 onCodeChange={setCurrentCode}
//                 onRunCode={handleRun}
//                 onSubmitCode={handleSubmit}
//                 isRunning={isRunning}
//               />
//             </TabsContent>

//             <TabsContent value="output" className="flex-1 overflow-y-auto m-0">
//               <div className="p-4 space-y-4">
//                 <div>
//                   <EmotionAnalysis />
//                 </div>

//                 <div
//                   className={`border-t pt-4 ${
//                     isDark ? "border-gray-800" : "border-gray-200"
//                   }`}
//                 >
//                   <div className="flex items-center gap-2 mb-3">
//                     <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
//                       <Terminal className="w-5 h-5 text-green-600 dark:text-green-400" />
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                       Kết quả
//                     </h3>
//                   </div>
//                   <Output output={output} />
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeEditor from "@/components/compiler/CodeEditor";
import Output from "@/components/compiler/Output";
import EmotionAnalysis from "@/components/compiler/EmotionAnalysis";
import { ThemeContext } from "@/context/ThemeContext";
import { mockCourses } from "@/mock/courses";
import { mockLessons } from "@/mock/lessons";
import { mockExercises } from "@/mock/exercises";
import ProblemContent from "@/components/compiler/ProblemContent";
import ResizableDivider from "@/components/compiler/ResizableDivider";
import TopBar from "@/components/compiler/TopBar";
import { runCode, submitExercise } from "@/mock/mockRunAndSubmit";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Compiler() {
  const { courseId, lessonId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const containerRef = useRef(null);

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentCode, setCurrentCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("problem");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [languages] = useState([
    "javascript",
    "python",
    "cpp",
    "java",
    "csharp",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [leftWidth, setLeftWidth] = useState(500);
  const [rightWidth, setRightWidth] = useState(500);
  const [rightTopHeight, setRightTopHeight] = useState(250);
  const [showProblem, setShowProblem] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const c = mockCourses.find((c) => c.id.toString() === courseId);
    setCourse(c);

    const l = mockLessons.find(
      (l) => l.id.toString() === lessonId && l.course_id.toString() === courseId
    );
    setLesson(l);

    const exs = mockExercises.filter(
      (e) => e.lesson_id.toString() === lessonId
    );
    setExercises(exs);

    const selectedEx =
      exs.find((e) => e.id.toString() === exerciseId) || exs[0];
    setCurrentExercise(selectedEx);
    setCurrentCode(selectedEx?.example_code || "");
    setSelectedLanguage(selectedEx?.language || "javascript");
  }, [courseId, lessonId, exerciseId]);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await runCode({
        language: selectedLanguage,
        code: currentCode,
      });
      setOutput(res.output);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentExercise) return;
    try {
      toast.info("Đang nộp bài... ⏳");

      const res = await submitExercise({
        exerciseId: currentExercise.id,
        code: currentCode,
      });

      toast.success("Nộp bài thành công 🎉");

      navigate(
        `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
        { state: { feedback: res } }
      );
    } catch (error) {
      toast.error("Nộp bài thất bại 😢");
      console.error(error);
    }
  };

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học", href: "/courses" },
    course && { label: course.title, href: `/courses/${courseId}` },
    lesson && {
      label: lesson.title,
      href: `/courses/${courseId}/lessons/${lessonId}`,
    },
    { label: "Thực hành" },
  ].filter(Boolean);

  const currentExIndex = exercises.findIndex(
    (ex) => ex.id.toString() === exerciseId
  );

  // 🧩 Layout cho Desktop (kéo thả)
  const desktopLayout = (
    <main ref={containerRef} className="flex-1 flex overflow-hidden">
      {/* Left: Problem */}
      {showProblem ? (
        <>
          <div
            className={`${isDark ? "bg-gray-900" : "bg-white"} overflow-y-auto`}
            style={{ width: `${leftWidth}px` }}
          >
            <div className="p-6 relative">
              <button
                onClick={() => setShowProblem(false)}
                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors z-10 ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <ProblemContent exercise={currentExercise} isDark={isDark} />
            </div>
          </div>

          {/* Divider trái */}
          <ResizableDivider
            onResize={(e) => {
              const newWidth = Math.min(
                Math.max(e.clientX, 300),
                window.innerWidth - 400
              );
              setLeftWidth(newWidth);
            }}
            orientation="vertical"
            isDark={isDark}
          />
        </>
      ) : (
        <button
          onClick={() => setShowProblem(true)}
          className={`w-10 flex items-center justify-center transition-colors ${
            isDark
              ? "bg-gray-900 hover:bg-gray-800"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          <ChevronRight
            className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          />
        </button>
      )}

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        <CodeEditor
          languages={languages}
          language={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          code={currentCode}
          onCodeChange={setCurrentCode}
          onRunCode={handleRun}
          onSubmitCode={handleSubmit}
          isRunning={isRunning}
        />
      </div>

      {/* Divider giữa editor và output */}
      <ResizableDivider
        onResize={(e) => {
          const newWidth = Math.min(
            Math.max(window.innerWidth - e.clientX, 300),
            window.innerWidth - 400
          );
          setRightWidth(newWidth);
        }}
        orientation="vertical"
        isDark={isDark}
      />

      {/* Right panel */}
      <div
        className={`${isDark ? "bg-gray-900" : "bg-white"} flex flex-col`}
        style={{ width: `${rightWidth}px` }}
      >
        <div
          className={`p-4 border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
          style={{ height: `${rightTopHeight}px`, minHeight: "40px" }}
        >
          <EmotionAnalysis />
        </div>

        <ResizableDivider
          orientation="horizontal"
          onResize={(e) => {
            const containerTop =
              containerRef.current.getBoundingClientRect().top;
            const newHeight = Math.min(
              Math.max(e.clientY - containerTop, 40),
              window.innerHeight - 200
            );
            setRightTopHeight(newHeight);
          }}
          isDark={isDark}
        />

        <div className="flex-1 overflow-y-auto p-4">
          <Output output={output} />
        </div>
      </div>
    </main>
  );

  // 🧩 Layout cho Mobile (Tab)
  // 🧩 Layout cho Mobile (Tab)
  const mobileLayout = (
    <div className="flex-1 flex flex-col">
      {/* Tabs */}
      <div
        className={`flex border-b ${
          isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        {[
          { key: "problem", label: "Bài tập" },
          { key: "editor", label: "Code" },
          { key: "output", label: "Kết quả" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-3 text-sm font-medium ${
              activeTab === tab.key
                ? isDark
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-indigo-600 border-b-2 border-indigo-600"
                : isDark
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Nội dung tab */}
      <div className="flex-1 flex flex-col">
        {activeTab === "problem" && (
          <div className="p-4">
            <ProblemContent exercise={currentExercise} isDark={isDark} />
          </div>
        )}

        {activeTab === "editor" && (
          <div
            className={`${
              isDark ? "bg-gray-900" : "bg-white"
            } flex-1 flex flex-col`}
            style={{
              height: "calc(100vh - 180px)", // chừa chỗ cho header + tab bar
              overflow: "hidden",
            }}
          >
            <CodeEditor
              languages={languages}
              language={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              code={currentCode}
              onCodeChange={setCurrentCode}
              onRunCode={handleRun}
              onSubmitCode={handleSubmit}
              isRunning={isRunning}
            />
          </div>
        )}

        {activeTab === "output" && (
          <div className="p-4">
            <EmotionAnalysis />
            <Output output={output} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col h-screen ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <Header />
      <TopBar
        breadcrumbItems={breadcrumbItems}
        currentExercise={currentExercise}
        exercises={exercises}
        currentExIndex={currentExIndex}
        navigate={navigate}
        courseId={courseId}
        lessonId={lessonId}
        isDark={isDark}
      />

      {isMobile ? mobileLayout : desktopLayout}

      <Footer />
    </div>
  );
}
