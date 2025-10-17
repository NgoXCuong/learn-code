import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Breadcrumb from "../components/layout/Breadcrumb";
import LessonList from "../components/courses/LessonList"; // ✅ import component mới
import { mockLessons } from "../mock/lessons";
import { mockCourses } from "../mock/courses";
import { useParams } from "react-router-dom";
import { Users, Clock, BookOpen, Star, Check, Zap } from "lucide-react";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = mockCourses.find((c) => c.id === Number(id));
    setCourse(foundCourse);
    setLessons(mockLessons.filter((l) => l.course_id === Number(id)));
  }, [id]);

  if (!course)
    return (
      <div className="text-center py-20 text-gray-600">Đang tải dữ liệu...</div>
    );

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const inProgressCount = lessons.filter(
    (l) => l.status === "in_progress"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-grow w-full px-6 sm:px-14 lg:px-20 py-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title },
          ]}
        />

        {/* 🟦 Banner & Info */}
        <div className="relative h-[20rem] overflow-hidden mt-6 rounded-2xl shadow-lg">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />

          <div className="absolute bottom-0 left-0 px-8 pb-10 max-w-4xl text-white">
            <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
            <p className="text-gray-100 mb-4">{course.description}</p>
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" /> {course.students} học viên
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {course.duration}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {lessons.length} bài học
              </div>
            </div>
          </div>

          {/* 🟩 Card tiến độ */}
          <div className="absolute top-6 right-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-2xl w-72">
            <h3 className="text-sm font-semibold mb-2">Tiến độ khóa học</h3>
            <div className="text-3xl font-bold mb-3">{course.progress}%</div>
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" /> Hoàn thành
                </span>
                <span>
                  {completedCount}/{lessons.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Đang học
                </span>
                <span>{inProgressCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 📘 Danh sách bài học */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Danh sách bài học
          </h2>
          <LessonList
            lessons={lessons}
            onLessonClick={(lessonId) =>
              navigate(`/courses/${course.id}/lessons/${lessonId}`)
            }
          />
        </section>
      </main>
    </div>
  );
}
