// ==============================================================
// Trang Compiler.jsx — Trang biên dịch code với bài tập đi kèm
// Có bài tập, mô tả, trình soạn thảo code và output
// ==============================================================

import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeEditor from "@/components/compiler/CodeEditor";
import Output from "@/components/compiler/Output";
import EmotionAnalysis from "@/components/compiler/EmotionAnalysis";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import { ProgressContext } from "@/context/ProgressContext";
import {
  fetchCourseById,
  fetchLessonsByCourse,
  fetchExercisesByLesson,
} from "@/api/coursesApi";
import { fetchChallengeById } from "@/api/challengesApi";
import { submitExercise } from "@/api/coursesApi";
import ProblemContent from "@/components/compiler/ProblemContent";
import ResizableDivider from "@/components/compiler/ResizableDivider";
import TopBar from "@/components/compiler/TopBar";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Loading } from "@/components/layout/Loading";

export default function Compiler() {
  const { courseId, lessonId, exerciseId, challengeId, examId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const { markExerciseAsCompleted } = useContext(ProgressContext);
  const isDark = theme === "dark";
  const containerRef = useRef(null);

  const passedCourse = state?.course;
  const passedLesson = state?.lesson;
  const passedExercise = state?.exercise;
  const passedExercises = state?.exercises || [];

  const [currentCourse, setCurrentCourse] = useState(passedCourse || null);
  const [currentLesson, setCurrentLesson] = useState(passedLesson || null);
  const [currentExercise, setCurrentExercise] = useState(
    passedExercise || null
  );
  const [exercises, setExercises] = useState(passedExercises);
  const [currentCode, setCurrentCode] = useState(
    passedExercise?.example_code || ""
  );

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [languages] = useState([
    "javascript",
    "python",
    "cpp",
    "java",
    "csharp",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [leftWidth, setLeftWidth] = useState(500);
  const [rightWidth, setRightWidth] = useState(500);
  const [rightTopHeight, setRightTopHeight] = useState(250);
  const [showProblem, setShowProblem] = useState(true);

  const isExam = !!exerciseId && !courseId && !lessonId && !challengeId;

  // Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load bài từ Exam / Challenge / Course-Lesson
  useEffect(() => {
    const loadExerciseData = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- Exam ---
        if (examId) {
          // For exam, use passed data or fetch from API
          if (passedExercise) {
            setCurrentCourse({ id: "exam", title: "Bài kiểm tra" });
            setCurrentLesson({
              id: passedExercise.id,
              title: passedExercise.title,
            });
            setExercises(
              passedExercises.length > 0 ? passedExercises : [passedExercise]
            );
            setCurrentExercise(passedExercise);
            setCurrentCode(passedExercise.example_code || "");
            setSelectedLanguage(passedExercise.language || "javascript");
          }
          return;
        }

        // --- Challenge ---
        if (challengeId) {
          const selectedChallenge = await fetchChallengeById(
            Number(challengeId)
          );
          if (selectedChallenge) {
            setCurrentCourse({ id: "challenges", title: "Thử thách" });
            setCurrentLesson({
              id: selectedChallenge.id,
              title: selectedChallenge.title,
            });
            setExercises([selectedChallenge]);
            setCurrentExercise(selectedChallenge);
            setCurrentCode(selectedChallenge.example_code || "");
            setSelectedLanguage(selectedChallenge.language || "javascript");
          }
          return;
        }

        // --- Course / Lesson / Exercise ---
        if (courseId && lessonId && exerciseId) {
          const [courseData, exercisesData] = await Promise.all([
            fetchCourseById(Number(courseId)),
            fetchExercisesByLesson(Number(lessonId)),
          ]);

          setCurrentCourse(courseData);

          // Find lesson from exercises (assuming lesson info is in exercise data)
          const selectedEx =
            exercisesData.find((e) => e.id.toString() === exerciseId) ||
            exercisesData[0];
          if (selectedEx) {
            setCurrentLesson({
              id: selectedEx.lesson_id,
              title: `Lesson ${selectedEx.lesson_id}`,
            });
            setExercises(exercisesData);
            setCurrentExercise(selectedEx);
            setCurrentCode(selectedEx.example_code || "");
            setSelectedLanguage(selectedEx.language || "javascript");
          }
        }
      } catch (err) {
        console.error("Error loading exercise data:", err);
        setError("Không thể tải dữ liệu bài tập");
        toast.error("Không thể tải dữ liệu bài tập");
      } finally {
        setLoading(false);
      }
    };

    loadExerciseData();
  }, [courseId, lessonId, exerciseId, challengeId, examId]);

  // --- Helper ---
  const getFileExtension = () => {
    const ext = {
      javascript: "js",
      python: "py",
      cpp: "cpp",
      java: "java",
      csharp: "cs",
    };
    return ext[selectedLanguage] || "txt";
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("");
    const codeToRun = currentCode;
    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          version: "*",
          files: [{ name: `main.${getFileExtension()}`, content: codeToRun }],
        }),
      });
      const result = await response.json();
      const stdout = result.run?.stdout || "";
      const stderr = result.run?.stderr || "";
      setOutput(stdout || stderr || "Không có kết quả.");
    } catch (err) {
      console.error(err);
      setOutput("Lỗi khi chạy code. Vui lòng thử lại sau.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!currentExercise) return;

    // Check authentication for challenges and exams
    if ((challengeId || isExam) && !user) {
      toast.error("Vui lòng đăng nhập để nộp bài!");
      navigate("/login");
      return;
    }

    try {
      toast.info("Đang nộp bài... ⏳");
      const res = await submitExercise({
        exerciseId: currentExercise.id,
        code: currentCode,
      });

      // Mark exercise as completed if it passed
      if (res.passed && courseId && lessonId) {
        markExerciseAsCompleted(currentExercise.id, lessonId, courseId);
      }

      toast.success("Nộp bài thành công 🎉");

      if (isExam) {
        navigate(`/exam/${exerciseId}/feedback`, { state: { feedback: res } });
      } else if (challengeId) {
        navigate(`/challenges/${challengeId}/feedback`, {
          state: { feedback: res },
        });
      } else {
        navigate(
          `/courses/${courseId}/lessons/${lessonId}/exercise/${currentExercise.id}/feedback`,
          { state: { feedback: res } }
        );
      }
    } catch (error) {
      toast.error("Nộp bài thất bại 😢");
      console.error(error);
    }
  };

  const breadcrumbItems = isExam
    ? [
        { label: "Trang chủ", href: "/" },
        currentExercise && { label: currentExercise.title },
      ].filter(Boolean)
    : challengeId
    ? [
        { label: "Trang chủ", href: "/" },
        { label: "Thử thách", href: "/challenges" },
        currentExercise && { label: currentExercise.title },
      ].filter(Boolean)
    : [
        { label: "Trang chủ", href: "/" },
        { label: "Khóa học", href: "/courses" },
        currentCourse && {
          label: currentCourse.title,
          href: `/courses/${courseId}`,
        },
        currentLesson && {
          label: currentLesson.title,
          href: `/courses/${courseId}/lessons/${lessonId}`,
        },
        currentExercise && { label: currentExercise.title },
      ].filter(Boolean);

  const currentExIndex = exercises.findIndex(
    (ex) => ex.id === currentExercise?.id
  );

  if (loading) {
    return (
      <div
        className={`flex flex-col h-screen ${
          isDark
            ? "bg-linear-to-br from-gray-900 via-gray-800 to-black"
            : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100"
        }`}
      >
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex flex-col h-screen ${
          isDark
            ? "bg-linear-to-br from-gray-900 via-gray-800 to-black"
            : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100"
        }`}
      >
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

  return (
    <div
      className={`flex flex-col h-screen ${
        isDark
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black"
          : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      <Header />
      <TopBar
        breadcrumbItems={breadcrumbItems}
        currentExercise={currentExercise}
        exercises={exercises}
        currentExIndex={currentExIndex}
        navigate={(pathOrId) => {
          if (typeof pathOrId === "string") navigate(pathOrId);
          else if (typeof pathOrId === "object") {
            if (isExam) {
              navigate(`/exam/${pathOrId.id}/compiler`, {
                state: {
                  exercise: pathOrId,
                  exercises,
                  course: currentCourse,
                  lesson: currentLesson,
                },
              });
            } else {
              navigate(
                `/courses/${courseId}/lessons/${lessonId}/exercise/${pathOrId.id}`
              );
            }
            setCurrentExercise(pathOrId);
            setCurrentCode(pathOrId.example_code || "");
            setSelectedLanguage(pathOrId.language || "javascript");
          }
        }}
        courseId={courseId}
        lessonId={lessonId}
        isDark={isDark}
      />
      <div className="flex-1 flex overflow-hidden" ref={containerRef}>
        {/* Left: Problem */}
        {showProblem && currentExercise && (
          <div
            className={`${isDark ? "bg-gray-900" : "bg-white"} overflow-y-auto`}
            style={{ width: leftWidth }}
          >
            <div className="p-6 relative">
              <button
                onClick={() => setShowProblem(false)}
                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors z-10 ${
                  isDark
                    ? "hover:bg-gray-800 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <ProblemContent exercise={currentExercise} isDark={isDark} />
            </div>
          </div>
        )}

        <ResizableDivider
          onResize={(e) =>
            setLeftWidth(
              Math.min(Math.max(e.clientX, 300), window.innerWidth - 400)
            )
          }
          orientation="vertical"
          isDark={isDark}
        />
        {!showProblem && (
          <button
            onClick={() => setShowProblem(true)}
            className={`absolute top-1/2 -translate-y-1/2 left-0 p-1.5 rounded-lg transition-colors z-20 ${
              isDark
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-white hover:bg-gray-100 text-gray-600"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Editor */}
        <div className="flex-1 flex flex-col min-w-0">
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

        {/* Right panel */}
        <ResizableDivider
          onResize={(e) =>
            setRightWidth(
              Math.min(
                Math.max(window.innerWidth - e.clientX, 300),
                window.innerWidth - 400
              )
            )
          }
          orientation="vertical"
          isDark={isDark}
        />
        <div
          className={`${isDark ? "bg-gray-900" : "bg-white"} flex flex-col`}
          style={{ width: rightWidth }}
        >
          <div
            className={`p-4 border-b ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
            style={{ height: rightTopHeight }}
          >
            <EmotionAnalysis />
          </div>
          <ResizableDivider
            orientation="horizontal"
            onResize={(e) =>
              setRightTopHeight(
                Math.min(
                  Math.max(
                    e.clientY -
                      containerRef.current.getBoundingClientRect().top,
                    40
                  ),
                  window.innerHeight - 200
                )
              )
            }
            isDark={isDark}
          />
          <div className="flex-1 overflow-y-auto p-4">
            <Output output={output} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
