import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import CourseHero from "@/components/courses/CourseHero";
import CourseIntro from "@/components/courses/CourseIntro";
import CourseOutcomes from "@/components/courses/CourseOutcomes";
import { fetchCourseById, fetchLessonsByCourse } from "@/services/coursesApi";
import LessonList from "@/components/courses/LessonList";
import { Loading } from "@/components/layout/Loading";
import { toast } from "sonner";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [courseData, lessonsData] = await Promise.all([
          fetchCourseById(Number(id)),
          fetchLessonsByCourse(Number(id)),
        ]);

        setCourse(courseData);
        setLessons(lessonsData);
      } catch (err) {
        console.error("Error loading course data:", err);
        setError("Không thể tải thông tin khóa học");
        toast.error("Không thể tải thông tin khóa học");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black z-50">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
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
        <Footer />
      </div>
    );
  }

  if (!course) return null;

  const completedCount = lessons.filter((l) => l.progress === 100).length;
  const inProgressCount = lessons.filter(
    (l) => l.progress > 0 && l.progress < 100
  ).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      <Header />

      <main className="grow w-full px-4 sm:px-6 md:px-14 lg:px-20 py-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="space-y-10">
            {/* Mock course intro and outcomes for now */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Giới thiệu khóa học
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {course.description}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Bạn sẽ học được gì?
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Kiến thức nền tảng về lập trình</li>
                <li>• Cách giải quyết vấn đề</li>
                <li>• Phát triển tư duy logic</li>
                <li>• Xây dựng dự án thực tế</li>
              </ul>
            </div>
          </div>

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
