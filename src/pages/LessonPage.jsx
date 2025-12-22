import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ThemeContext } from "@/context/ThemeContext";
import { ProgressContext } from "@/context/ProgressContext";
import { fetchCourseById, fetchLessonsByCourse } from "@/services/coursesApi";
import { fetchLessonById } from "@/services/coursesApi";
import { fetchExercisesByLesson } from "@/services/coursesApi";
import LessonProgressCard from "@/components/lessons/LessonProgressCard";
import LessonSidebar from "@/components/lessons/LessonSidebar";
import LessonTabs from "@/components/lessons/LessonTabs";
import LessonNavigation from "@/components/lessons/LessonNavigation";
import { Loading } from "@/components/layout/Loading";
import { toast } from "sonner";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { isExerciseCompleted } = useContext(ProgressContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [allLessons, setAllLessons] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState([]);
  const [activeTab, setActiveTab] = useState("content");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load dữ liệu course, lesson và exercises
  useEffect(() => {
    const loadLessonData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load data in parallel
        const [courseData, lessonsData, lessonData, exercisesData] =
          await Promise.all([
            fetchCourseById(Number(courseId)),
            fetchLessonsByCourse(Number(courseId)),
            fetchLessonById(Number(lessonId)),
            fetchExercisesByLesson(Number(lessonId)),
          ]);

        setCourse(courseData);
        setAllLessons(lessonsData);
        setLesson(lessonData);
        setExercises(exercisesData);
      } catch (err) {
        console.error("Error loading lesson data:", err);
        setError("Không thể tải dữ liệu bài học");
        toast.error("Không thể tải dữ liệu bài học");
      } finally {
        setLoading(false);
      }
    };

    loadLessonData();
  }, [courseId, lessonId]);

  // Auto expand chapter
  useEffect(() => {
    if (lesson) {
      setExpandedChapters((prev) =>
        prev.includes(lesson.chap) ? prev : [...prev, lesson.chap]
      );
    }
  }, [lesson]);

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Loading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!lesson || !course) return null;

  // Tính toán progress và navigation
  const completedExercises = exercises.filter((ex) =>
    isExerciseCompleted(ex.id)
  ).length;
  const totalExercises = exercises.length;
  const progressPercent = totalExercises
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0;

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
      className={`min-h-screen flex flex-col ${
        isDark
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <Header />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white/20 backdrop-blur-sm lg:hidden z-20"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSidebarOpen(false);
          }}
        />
      )}
      <div className="flex flex-col lg:flex-row flex-1">
        <LessonSidebar
          chapters={chapters}
          expandedChapters={expandedChapters}
          toggleChapter={toggleChapter}
          currentLessonId={lessonId}
          navigate={navigate}
          isDark={isDark}
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />

        <main className="flex-1 px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6 min-w-0">
          {/* Header với breadcrumb và menu button */}
          <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <Breadcrumb
                items={[
                  { label: "Trang chủ", href: "/" },
                  { label: "Khóa học", href: "/courses" },
                  { label: course.title, href: `/courses/${courseId}` },
                  { label: `Lesson ${currentIndex + 1}: ${lesson.title}` },
                ]}
              />
            </div>
            <button
              className="lg:hidden shrink-0 p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Lesson header với progress card */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 sm:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
              {/* Lesson info */}
              <div className="lg:col-span-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                  {lesson.title}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  Thuộc khóa học:{" "}
                  <Link
                    to={`/courses/${course.id}`}
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    {course.title}
                  </Link>
                </p>

                {/* Lesson metadata - chỉ hiện trên mobile/tablet */}
                <div className="lg:hidden flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span>⏱️ {lesson.readTime}</span>
                  <span>📚 {lesson.difficulty}</span>
                  {lesson.language && <span>💻 {lesson.language}</span>}
                </div>
              </div>

              {/* Progress card */}
              <div className="lg:col-span-1">
                <LessonProgressCard
                  isDark={isDark}
                  lesson={lesson}
                  completedExercises={completedExercises}
                  totalExercises={totalExercises}
                />
              </div>
            </div>
          </div>

          {/* Lesson content tabs */}
          <div className="mb-6">
            <LessonTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              lesson={lesson}
              exercises={exercises}
              courseId={courseId}
              lessonId={lessonId}
              isDark={isDark}
            />
          </div>

          {/* Navigation */}
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
