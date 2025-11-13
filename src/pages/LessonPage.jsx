import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ThemeContext } from "@/context/ThemeContext";
import { ProgressContext } from "@/context/ProgressContext";
import { mockLessons } from "@/mock/lessons";
import { mockCourses } from "@/mock/courses";
import { mockExercises } from "@/mock/exercises";
import LessonProgressCard from "@/components/lessons/LessonProgressCard";
import LessonSidebar from "@/components/lessons/LessonSidebar";
import LessonTabs from "@/components/lessons/LessonTabs";
import LessonNavigation from "@/components/lessons/LessonNavigation";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { isExerciseCompleted } = useContext(ProgressContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedChapters, setExpandedChapters] = useState([]);
  const [activeTab, setActiveTab] = useState("content");

  // Load dữ liệu course, lesson và exercises
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

  // Auto expand chapter
  useEffect(() => {
    if (lesson) {
      setExpandedChapters((prev) =>
        prev.includes(lesson.chap) ? prev : [...prev, lesson.chap]
      );
    }
  }, [lesson]);

  if (!lesson || !course) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center text-gray-500">Đang tải bài học...</div>
      </div>
    );
  }

  // Tính toán progress và navigation
  const completedExercises = exercises.filter((ex) =>
    isExerciseCompleted(ex.id)
  ).length;
  const totalExercises = exercises.length;
  const progressPercent = totalExercises
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0;

  const allLessons = mockLessons.filter(
    (l) => l.course_id.toString() === courseId
  );
  const currentIndex = allLessons.findIndex(
    (l) => l.id.toString() === lessonId
  );
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const chapters = allLessons.reduce((acc, l) => {
    if (!acc[l.chap]) acc[l.chap] = [];
    acc[l.chap].push(l);
    return acc;
  }, {});

  const toggleChapter = (chapName) => {
    setExpandedChapters((prev) =>
      prev.includes(chapName)
        ? prev.filter((c) => c !== chapName)
        : [...prev, chapName]
    );
  };

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <Header />
      <div className="flex">
        <LessonSidebar
          chapters={chapters}
          expandedChapters={expandedChapters}
          toggleChapter={toggleChapter}
          currentLessonId={lessonId}
          navigate={navigate}
          isDark={isDark}
        />

        <main className="flex-1 px-4 sm:px-6 md:px-14 lg:px-20 py-6">
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Khóa học", href: "/courses" },
              { label: course.title, href: `/courses/${courseId}` },
              { label: lesson.title },
            ]}
          />

          <div className="mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4 flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 leading-tight">
                {lesson.title}
              </h1>
              <p className="text-lg mb-3">
                Thuộc khóa học:{" "}
                <Link
                  to={`/courses/${course.id}`}
                  className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {course.title}
                </Link>
              </p>
            </div>
            <div className="w-full lg:w-80 shrink-0">
              <LessonProgressCard
                isDark={isDark}
                progressPercent={progressPercent}
                completedExercises={completedExercises}
                totalExercises={totalExercises}
              />
            </div>
          </div>

          <LessonTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            lesson={lesson}
            exercises={exercises}
            courseId={courseId}
            lessonId={lessonId}
            isDark={isDark}
          />

          <LessonNavigation
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            courseId={courseId}
            navigate={navigate}
            isDark={isDark}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
}
