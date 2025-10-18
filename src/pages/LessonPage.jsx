import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LessonHeader from "../components/lessons/LessonHeader";
import LessonExercise from "../components/lessons/LessonExercise";
import LessonCode from "../components/lessons/LessonCode";
import Breadcrumb from "../components/layout/Breadcrumb";
import { ThemeContext } from "../context/ThemeContext";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { mockLessons } from "../mock/lessons";
import { mockCourses } from "../mock/courses";
import { mockExercises } from "../mock/exercises";
import {
  BookOpen,
  Code2,
  CheckCircle,
  Clock,
  BarChart3,
  Trophy,
  Users,
} from "lucide-react";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [activeTab, setActiveTab] = useState("theory");

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
          Đang tải dữ liệu...
        </p>
      </div>
    );

  // ✅ Vì mockLessons không có trường "students", ta bỏ hoặc thay bằng giá trị từ course
  const totalStudents = course.students || 0;

  const completedExercises = exercises.filter(
    (ex) => ex.status === "completed"
  ).length;

  const progressPercent = exercises.length
    ? Math.round((completedExercises / exercises.length) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Header />

      <main className="flex-1 w-full px-6 sm:px-14 lg:px-20 py-6">
        <div className="mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Khóa học", href: "/courses" },
                { label: course.title, href: `/courses/${courseId}` },
                { label: lesson.title },
              ]}
            />
          </div>

          {/* Hero Banner Section */}
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-900 dark:to-blue-900"></div>
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
            </div>

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                {/* Title Section */}
                <div className="flex-1 min-w-0">
                  <p className="text-indigo-200 text-sm font-medium mb-2">
                    {course.title}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 break-words">
                    {lesson.title}
                  </h1>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 text-indigo-100">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{lesson.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <Code2 className="w-4 h-4 flex-shrink-0" />
                      <span>{exercises.length} bài tập</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-100">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {totalStudents.toLocaleString("vi-VN")} học viên
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 sm:min-w-56 flex-shrink-0">
                  <div className="text-xs font-medium text-white/70 mb-2">
                    Tiến độ bài học
                  </div>
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-white mb-2">
                      {lesson.progress || 0}%
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-300 to-emerald-400 transition-all duration-500"
                        style={{ width: `${lesson.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  {exercises.length > 0 && (
                    <div className="text-xs text-white/80 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-300 flex-shrink-0" />
                      <span>
                        <strong>{completedExercises}</strong>/{exercises.length}{" "}
                        hoàn thành
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="sticky top-24 space-y-4">
                <div className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                    Thông tin bài học
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BarChart3 className="w-4 h-4" />
                        <span className="text-xs font-medium">Độ khó</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {lesson.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">Thời gian</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {lesson.readTime}
                      </span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Code2 className="w-4 h-4" />
                        <span className="text-xs font-medium">Ngôn ngữ</span>
                      </div>
                      <span className="text-xs font-bold uppercase text-gray-900 dark:text-white">
                        {lesson.language}
                      </span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-gray-50 dark:bg-gray-700/40">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Trophy className="w-4 h-4" />
                        <span className="text-xs font-medium">Bài tập</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {exercises.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress summary */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900/30">
                  <div className="text-center">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Tiến độ bài tập
                    </p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {progressPercent}%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong>{completedExercises}</strong>/{exercises.length}{" "}
                      hoàn thành
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs: Theory / Exercise */}
            <div className="lg:col-span-3 order-last lg:order-first">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="mb-6">
                  <TabsList className="inline-flex rounded-lg p-1 gap-1 bg-gray-100 dark:bg-gray-800">
                    <TabsTrigger
                      value="theory"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                      text-gray-600 dark:text-gray-300
                      data-[state=active]:bg-white data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-indigo-400 transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      Lý thuyết
                    </TabsTrigger>

                    <TabsTrigger
                      value="exercise"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
                      text-gray-600 dark:text-gray-300
                      data-[state=active]:bg-white data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-indigo-400 transition-all"
                    >
                      <Code2 className="w-4 h-4" />
                      Bài tập
                      {exercises.length > 0 && (
                        <span className="ml-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full text-xs font-semibold">
                          {exercises.length}
                        </span>
                      )}
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* THEORY */}
                <TabsContent value="theory" className="space-y-6 mt-0">
                  <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                        <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Nội dung bài học
                      </h2>
                    </div>

                    <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                      <LessonHeader title="" content={lesson.content} />
                    </div>
                  </div>

                  {lesson.example_code && (
                    <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                          <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Ví dụ mã nguồn
                        </h3>
                      </div>

                      <LessonCode
                        code={lesson.example_code}
                        language={lesson.language}
                      />
                    </div>
                  )}
                </TabsContent>

                {/* EXERCISES */}
                <TabsContent value="exercise" className="mt-0">
                  {exercises.length > 0 ? (
                    <div className="space-y-6">
                      <LessonExercise
                        exercises={exercises}
                        courseId={courseId}
                        lessonId={lessonId}
                      />
                    </div>
                  ) : (
                    <div className="p-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
                      <Code2 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Hiện chưa có bài tập nào
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
