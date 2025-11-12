import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeEditor from "@/components/compiler/CodeEditor";
import Output from "@/components/compiler/Output";
import EmotionAnalysis from "@/components/compiler/EmotionAnalysis";
import { ThemeContext } from "@/context/ThemeContext";
import { mockCourses } from "@/mock/courses";
import { mockLessons } from "@/mock/lessons";
import { mockExercises } from "@/mock/exercises";
import { challenges as mockChallenges } from "@/mock/mockDataChallenge";
import ProblemContent from "@/components/compiler/ProblemContent";
import ResizableDivider from "@/components/compiler/ResizableDivider";
import TopBar from "@/components/compiler/TopBar";
import { submitExercise } from "@/mock/mockRunAndSubmit";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Compiler() {
  const { courseId, lessonId, exerciseId, challengeId, examId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { theme } = useContext(ThemeContext);
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
    // --- Exam ---
    if (examId) {
      const selectedExam = mockExercises.find(
        (ex) => ex.id.toString() === examId
      );
      if (selectedExam) {
        setCurrentCourse({ id: "exam", title: "Bài kiểm tra" });
        setCurrentLesson({ id: selectedExam.id, title: selectedExam.title });
        if (passedExercises.length > 0) {
          setExercises(passedExercises);
          setCurrentExercise(passedExercise || selectedExam);
        } else {
          setExercises([selectedExam]);
          setCurrentExercise(selectedExam);
        }
        setCurrentCode((passedExercise || selectedExam).example_code || "");
        setSelectedLanguage(
          (passedExercise || selectedExam).language || "javascript"
        );
      }
      return;
    }

    // --- Challenge ---
    if (challengeId) {
      const selectedChallenge = mockChallenges.find(
        (ch) => ch.id.toString() === challengeId
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
    if (!currentCourse) {
      const c = mockCourses.find((c) => c.id.toString() === courseId);
      setCurrentCourse(c);
    }
    if (!currentLesson) {
      const l = mockLessons.find(
        (l) =>
          l.id.toString() === lessonId && l.course_id.toString() === courseId
      );
      setCurrentLesson(l);
    }
    if (!passedExercise) {
      const exs = mockExercises.filter(
        (e) => e.lesson_id.toString() === lessonId
      );
      setExercises(exs);
      const selectedEx =
        exs.find((e) => e.id.toString() === exerciseId) || exs[0];
      setCurrentExercise(selectedEx);
      setCurrentCode(selectedEx?.example_code || "");
      setSelectedLanguage(selectedEx?.language || "javascript");
    }
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
    try {
      toast.info("Đang nộp bài... ⏳");
      const res = await submitExercise({
        exerciseId: currentExercise.id,
        code: currentCode,
      });
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

        <div className="relative">
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
        </div>

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
