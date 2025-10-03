import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LessonList from "../components/courses/LessonList";
import Breadcrumb from "../components/layout/Breadcrumb";
import {
  fetchCourseById,
  fetchLessonsByCourse,
  fetchLanguage,
  fetchLessonProgress,
} from "../api/coursesApi";

const userId = 2;

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [language, setLanguage] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    const loadCourse = async () => {
      const c = await fetchCourseById(id);
      setCourse(c);

      const lang = await fetchLanguage(c.lang_id);
      setLanguage(lang);

      const lessonsData = await fetchLessonsByCourse(id);
      setLessons(lessonsData);

      const map = {};
      for (const lesson of lessonsData) {
        const prog = await fetchLessonProgress(userId, lesson.id);
        map[lesson.id] = prog?.status || "not_started";
      }
      setProgressMap(map);
    };
    loadCourse();
  }, [id]);

  const handleLessonClick = (lessonId) => {
    navigate(`/courses/${id}/lessons/${lessonId}`);
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="flex-1 w-full  px-6 sm:px-14 lg:px-20 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title },
          ]}
        />

        {/* Danh sách bài học */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Danh sách bài học
          </h2>
          <LessonList
            lessons={lessons}
            progressMap={progressMap}
            onLessonClick={handleLessonClick}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
