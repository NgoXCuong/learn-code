import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import CodeEditor from "../components/compiler/CodeEditor";
import Output from "../components/compiler/Output";
import EmotionAnalysis from "../components/compiler/EmotionAnalysis";
import FeedbackModal from "../components/compiler/FeedbackModal";
import { ThemeContext } from "../context/ThemeContext";
import {
  fetchCourseById,
  fetchLessonsByCourse,
  fetchExercisesByLesson,
  runCode,
  submitExercise,
} from "../api/coursesApi";

export default function Compiler() {
  const { courseId, lessonId } = useParams();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentCode, setCurrentCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

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
            if (ex.length > 0) setCurrentCode(ex[0].starter_code || "");
          }
        }
      } catch (err) {
        console.error("Lỗi load dữ liệu:", err);
      }
    };
    loadData();
  }, [courseId, lessonId]);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await runCode({
        language: exercises[0]?.language || "javascript",
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
    if (!exercises[0]) return;

    try {
      const res = await submitExercise({
        userId: null, // Không cần userId
        exerciseId: exercises[0].id,
        code: currentCode,
      });
      setFeedback(res);
      setShowFeedback(true);
    } catch (err) {
      setFeedback({ passed: false, message: err.message });
      setShowFeedback(true);
    }
  };

  // Breadcrumb động
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="flex-1 w-full px-6 sm:px-14 lg:px-20 py-4 h-[calc(100vh-140px)] flex flex-col gap-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Khối trên: Bài tập + Emotion */}
        <div className="flex-1 basis-2/5 flex flex-col lg:flex-row gap-4">
          {/* Mô tả bài tập */}
          <div
            className={`flex-1 p-6 rounded-md ${
              isDark
                ? "bg-gray-800 text-gray-100 border border-gray-700"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            {lesson && exercises.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                <p className="text-sm">{exercises[0].description}</p>
              </>
            )}
          </div>

          {/* EmotionAnalysis */}
          <div
            className={`flex-1 p-6 rounded-md h-full ${
              isDark
                ? "bg-gray-800 text-gray-100 border border-gray-700"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <EmotionAnalysis />
          </div>
        </div>

        {/* Khối dưới: Code + Output */}
        <div className="flex-1 basis-3/5 flex flex-col lg:flex-row gap-4">
          {/* Code Editor */}
          <div className="flex-1 lg:flex-[2] flex flex-col min-h-[300px]">
            <CodeEditor
              language={exercises[0]?.language || "javascript"}
              code={currentCode}
              onCodeChange={setCurrentCode}
              onRunCode={handleRun}
              onSubmitCode={handleSubmit}
              isRunning={isRunning}
            />
          </div>

          {/* Output */}
          <div
            className={`flex-1 lg:flex-[1] flex flex-col h-full min-h-[300px] rounded-md ${
              isDark
                ? "bg-gray-800 text-gray-100 border border-gray-700"
                : "bg-white text-gray-900 border border-gray-200"
            }`}
          >
            <Output output={output} />
          </div>
        </div>
      </main>

      <Footer />

      {showFeedback && (
        <FeedbackModal
          feedback={feedback}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}
