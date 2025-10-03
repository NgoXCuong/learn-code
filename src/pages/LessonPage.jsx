import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import LessonHeader from "../components/lessons/LessonHeader";
import LessonCode from "../components/lessons/LessonCode";
import Breadcrumb from "../components/layout/Breadcrumb";
import { ThemeContext } from "../context/ThemeContext";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
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
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const lessons = await fetchLessonsByCourse(courseId);
      const l = lessons.find((l) => l.id.toString() === lessonId);
      setLesson(l);

      const c = await fetchCourseById(courseId);
      setCourse(c);

      const exs = await fetchExercisesByLesson(lessonId);
      setExercises(exs);
      if (exs.length > 0) setSelectedExerciseId(exs[0].id); // mặc định chọn bài 1
    };
    loadData();
  }, [courseId, lessonId]);

  if (!lesson || !course) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const selectedExercise = exercises.find((ex) => ex.id === selectedExerciseId);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="flex-1 w-full px-6 sm:px-14 lg:px-20 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title, href: `/courses/${courseId}` },
            { label: lesson.title },
          ]}
        />

        {/* Tabs */}
        <Tabs defaultValue="theory" className="w-full mt-6">
          {/* Tabs list căn giữa */}
          <div className="flex justify-center mb-4">
            <TabsList className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
              <TabsTrigger
                value="theory"
                className="px-6 py-2 rounded-lg font-medium hover:bg-indigo-500 hover:text-white data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
              >
                Lý thuyết
              </TabsTrigger>
              {exercises.length > 0 && (
                <TabsTrigger
                  value="exercise"
                  className="px-6 py-2 rounded-lg font-medium hover:bg-indigo-500 hover:text-white data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                >
                  Bài tập ({exercises.length})
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          {/* Tab Lý thuyết */}
          <TabsContent value="theory">
            <LessonHeader title={lesson.title} content={lesson.content} />
            {lesson.example_code && (
              <div className="mt-6">
                <LessonCode
                  code={lesson.example_code}
                  language={lesson.language}
                />
              </div>
            )}
          </TabsContent>

          {/* Tab Bài tập */}
          {exercises.length > 0 && (
            <TabsContent value="exercise">
              <div className="flex flex-col gap-4">
                {/* Tiêu đề bài tập */}
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  Bài tập {lesson.title}
                </h2>

                {/* Nút chọn bài 1, bài 2, ... */}
                <div className="flex gap-2 flex-wrap">
                  {exercises.map((ex, index) => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExerciseId(ex.id)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        selectedExerciseId === ex.id
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                      } hover:bg-indigo-500 hover:text-white transition-colors`}
                    >
                      Bài {index + 1}
                    </button>
                  ))}
                </div>

                {/* Nội dung đề bài */}
                {selectedExercise && (
                  <div className="mt-4 p-4 rounded-xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                      {selectedExercise.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {selectedExercise.description}
                    </p>

                    {/* Nút làm bài tập chi tiết */}
                    <button
                      onClick={() =>
                        navigate(
                          `/courses/${courseId}/lessons/${lessonId}/exercise/${selectedExercise.id}`
                        )
                      }
                      className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Làm bài tập
                    </button>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
