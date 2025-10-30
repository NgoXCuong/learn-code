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
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-3">
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
