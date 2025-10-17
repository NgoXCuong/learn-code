// src/pages/LessonPage.jsx
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
import { BookOpen, Code2, CheckCircle } from "lucide-react";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [expandedExerciseId, setExpandedExerciseId] = useState(null);

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
    if (exs.length > 0) setExpandedExerciseId(exs[0].id);
  }, [courseId, lessonId]);

  if (!lesson || !course)
    return (
      <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
        Đang tải dữ liệu...
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="flex-1 w-full px-6 sm:px-14 lg:px-20 py-8">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title, href: `/courses/${courseId}` },
            { label: lesson.title },
          ]}
        />

        {/* Lesson Info Banner */}
        <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-200 dark:border-indigo-900/30 dark:from-indigo-950/20 dark:to-blue-950/20">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {lesson.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Khóa học: <span className="font-medium">{course.title}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="theory" className="w-full mt-8">
          <div className="flex justify-center mb-6">
            <TabsList className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1 gap-2 dark:text-white">
              <TabsTrigger
                value="theory"
                className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-500 hover:text-white data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Lý thuyết
              </TabsTrigger>
              <TabsTrigger
                value="exercise"
                className="px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-500 hover:text-white data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Bài tập ({exercises.length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Lý thuyết */}
          <TabsContent value="theory" className="mt-0">
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <LessonHeader title="" content={lesson.content} />
              </div>

              {lesson.example_code && (
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    Ví dụ mã nguồn
                  </h3>
                  <LessonCode
                    code={lesson.example_code}
                    language={lesson.language}
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="exercise" className="mt-0">
            <LessonExercise
              exercises={exercises}
              courseId={courseId}
              lessonId={lessonId}
            />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
