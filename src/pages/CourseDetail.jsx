import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import CourseHero from "@/components/courses/CourseHero";
import CourseIntro from "@/components/courses/CourseIntro";
import CourseOutcomes from "@/components/courses/CourseOutcomes";
import { mockLessons } from "@/mock/lessons";
import { mockCourses } from "@/mock/courses";
import { mockCourseDetails } from "@/mock/courseDetailsIntro";
import LessonList from "@/components/courses/LessonList";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = mockCourses.find((c) => c.id === Number(id));
    const foundDetail = mockCourseDetails.find(
      (d) => d.course_id === Number(id)
    );
    const courseLessons = mockLessons.filter((l) => l.course_id === Number(id));

    setCourse(foundCourse);
    setCourseDetail(foundDetail);
    setLessons(courseLessons);
  }, [id]);

  if (!course || !courseDetail)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black z-50">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-t-purple-600 border-gray-300 rounded-full animate-spin"></div>
        <div className="text-gray-500 dark:text-gray-300 text-lg mt-4">
          Đang tải...
        </div>
      </div>
    );

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const inProgressCount = lessons.filter(
    (l) => l.status === "in_progress"
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
            <CourseIntro intro={courseDetail.intro} />
            <CourseOutcomes outcomes={courseDetail.outcomes} />
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
