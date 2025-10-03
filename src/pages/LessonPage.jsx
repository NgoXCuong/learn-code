// src/pages/LessonPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LessonHeader from "../components/lessons/LessonHeader";
import LessonCode from "../components/lessons/LessonCode";
import Breadcrumb from "../components/layout/Breadcrumb";
import { ThemeContext } from "../context/ThemeContext";
import {
  fetchLessonsByCourse,
  fetchExercisesByLesson,
  fetchCourseById,
} from "../api/coursesApi";

export default function LessonPage() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Lấy danh sách bài học
      const lessons = await fetchLessonsByCourse(courseId);
      const l = lessons.find((l) => l.id.toString() === lessonId);
      setLesson(l);

      // Lấy thông tin khóa học
      const c = await fetchCourseById(courseId);
      setCourse(c);

      // Lấy danh sách bài tập
      setExercises(await fetchExercisesByLesson(lessonId));
    };

    loadData();
  }, [courseId, lessonId]);

  if (!lesson || !course) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title, href: `/courses/${courseId}` },
            { label: lesson.title },
          ]}
        />

        {/* Tiêu đề và nội dung bài học */}
        <LessonHeader title={lesson.title} content={lesson.content} />

        {/* Code ví dụ */}
        <div className="mt-6">
          <LessonCode code={lesson.example_code} language={lesson.language} />
        </div>

        {/* Nút làm bài tập */}
        {exercises.length > 0 && (
          <div className="mt-8 flex justify-center sm:justify-start">
            <button
              onClick={() =>
                navigate(`/courses/${courseId}/lessons/${lessonId}/exercise`)
              }
              className={`px-6 py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors
                bg-indigo-600 hover:bg-indigo-700 text-white
                ${isDark ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}
              `}
            >
              Làm bài tập ({exercises.length})
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
