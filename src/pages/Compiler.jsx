// src/pages/Compiler.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import CodeEditor from "../components/compiler/CodeEditor";
import Output from "../components/compiler/Output";
import EmotionAnalysis from "../components/compiler/EmotionAnalysis";
import { ThemeContext } from "../context/ThemeContext";
import {
  fetchCourseById,
  fetchLessonsByCourse,
  fetchExercisesByLesson,
  fetchLanguages,
  runCode,
  submitExercise,
} from "../api/coursesApi";

export default function Compiler() {
  const { courseId, lessonId, exerciseId } = useParams(); // lấy exerciseId từ URL
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [currentCode, setCurrentCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  // Load dữ liệu khóa học, bài học, exercises
  useEffect(() => {
    const loadData = async () => {
      try {
        if (courseId) {
          const c = await fetchCourseById(courseId);
          setCourse(c);

          if (lessonId) {
            const lessons = await fetchLessonsByCourse(courseId);
            const l = lessons.find((l) => l.id.toString() === lessonId);
            if (l) l.course_title = c.title;
            setLesson(l);

            const ex = await fetchExercisesByLesson(lessonId);
            setExercises(ex);

            // Chọn exercise dựa vào URL, nếu không có thì mặc định bài 1
            let selectedEx = ex.find((e) => e.id.toString() === exerciseId);
            if (!selectedEx && ex.length > 0) selectedEx = ex[0];
            setCurrentExercise(selectedEx);
            setCurrentCode(selectedEx?.starter_code || "");
          }
        }
      } catch (err) {
        console.error("Lỗi load dữ liệu:", err);
      }
    };
    loadData();
  }, [courseId, lessonId, exerciseId]);

  // Load ngôn ngữ
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const langs = await fetchLanguages();
        setLanguages(langs);
        if (langs.length > 0) setSelectedLanguage(langs[0].name.toLowerCase());
      } catch (err) {
        console.error("Lỗi load languages:", err);
      }
    };
    loadLanguages();
  }, []);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await runCode({
        language: selectedLanguage,
        code: currentCode,
      });
      setOutput(res.output);
    } catch (err) {
      setOutput("Lỗi khi chạy code: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentExercise) return;

    try {
      const res = await submitExercise({
        userId: null,
        exerciseId: currentExercise.id,
        code: currentCode,
      });

      navigate(
        `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
        { state: { feedback: res } }
      );
    } catch (err) {
      navigate(
        `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
        {
          state: {
            feedback: { passed: false, message: err.message, comments: [] },
          },
        }
      );
    }
  };

  // Breadcrumb
  const breadcrumbItems = [{ label: "Trang chủ", href: "/" }];
  if (course) breadcrumbItems.push({ label: "Khóa học", href: "/courses" });
  if (course && lesson) {
    breadcrumbItems.push({ label: course.title, href: `/courses/${courseId}` });
    breadcrumbItems.push({
      label: lesson.title,
      href: `/courses/${courseId}/lessons/${lessonId}`,
    });
  }
  breadcrumbItems.push({ label: "Compiler" });

  return (
    <div className="flex flex-col max-h-screen h-[1000px] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="pt-20 md:pt-24 flex-1 w-full px-4 sm:px-10 lg:px-16 py-4 flex flex-col h-[calc(100vh-140px)] gap-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full min-h-0">
          {/* Trái: 2/3 width */}
          <div className="flex-[2] flex flex-col gap-4 min-h-0">
            {/* Trên trái: Nội dung bài tập */}
            <div
              className={`h-1/4 p-4 md:p-6 rounded-md overflow-auto min-h-0 ${
                isDark
                  ? "bg-gray-800 text-gray-100 border border-gray-700"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              {currentExercise && lesson && (
                <>
                  <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                  <h3 className="text-lg font-semibold mb-1">
                    {currentExercise.title}
                  </h3>
                  <p className="text-sm">{currentExercise.description}</p>
                </>
              )}
            </div>

            {/* Dưới trái: Code Editor */}
            <div className="h-3/4 flex flex-col min-h-0">
              <CodeEditor
                languages={languages}
                language={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                code={currentCode}
                onCodeChange={setCurrentCode}
                onRunCode={handleRun}
                onSubmitCode={handleSubmit}
                isRunning={isRunning}
              />
            </div>
          </div>

          {/* Phải: 1/3 width */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Emotion Analysis */}
            <div
              className={`h-1/4 p-2 md:p-3 rounded-md overflow-auto min-h-0 ${
                isDark
                  ? "bg-gray-800 text-gray-100 border border-gray-700"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <EmotionAnalysis />
            </div>

            {/* Output */}
            <div
              className={`h-3/4 p-2 md:p-3 rounded-md overflow-auto min-h-0 ${
                isDark
                  ? "bg-gray-800 text-gray-100 border border-gray-700"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              <Output output={output} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
