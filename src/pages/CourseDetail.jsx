import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import LessonList from "../components/courses/LessonList";
import Breadcrumb from "../components/layout/Breadcrumb";
import Footer from "../components/layout/Footer";
import CourseHero from "../components/courses/CourseHero";
import { mockLessons } from "../mock/lessons";
import { mockCourses } from "../mock/courses";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = mockCourses.find((c) => c.id === Number(id));
    setCourse(foundCourse);
    const courseLessons = mockLessons.filter((l) => l.course_id === Number(id));
    setLessons(courseLessons);
  }, [id]);

  if (!course) return <div className="text-center py-20">Đang tải...</div>;

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const inProgressCount = lessons.filter(
    (l) => l.status === "in_progress"
  ).length;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-600 dark:via-gray-700 dark:to-indigo-900 
      transition-colors duration-500"
    >
      <Header />
      <main className="min-h-screen flex-grow w-full px-4 sm:px-6 md:px-14 lg:px-20 py-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title },
          ]}
        />

        <CourseHero
          course={course}
          lessons={lessons}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
          <LessonList
            lessons={lessons}
            onLessonClick={(lessonId) =>
              navigate(`/courses/${course.id}/lessons/${lessonId}`)
            }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
