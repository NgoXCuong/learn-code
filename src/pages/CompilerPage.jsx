// ==============================================================
// Trang CompilerPage.jsx — Trang biên dịch code độc lập
// Không có bài tập đi kèm, chỉ có trình soạn thảo code và output
// =============================================================

import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CodeEditor from "@/components/compiler/CodeEditor";
import Output from "@/components/compiler/Output";
import TopBar from "@/components/compiler/TopBar";
import ResizableDivider from "@/components/compiler/ResizableDivider";
import { ThemeContext } from "@/context/ThemeContext";
import { mockExercises } from "@/mock/exercises";

export default function CompilerPage() {
  const { courseId, lessonId, exerciseId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const containerRef = useRef(null);

  const passedExercise = state?.exercise;
  const passedExercises = state?.exercises || [];

  const [currentExercise, setCurrentExercise] = useState(
    passedExercise || null
  );
  const [currentCode, setCurrentCode] = useState(
    passedExercise?.example_code || ""
  );
  const [exercises, setExercises] = useState(passedExercises);

  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const [languages] = useState([
    "javascript",
    "python",
    "cpp",
    "java",
    "csharp",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");

  // Width Editor / Output
  const [editorWidth, setEditorWidth] = useState(900);

  // ✅ Lấy extension theo ngôn ngữ
  const getFileExtension = () => {
    const map = {
      javascript: "js",
      python: "py",
      cpp: "cpp",
      java: "java",
      csharp: "cs",
    };
    return map[selectedLanguage] || "txt";
  };

  // ✅ Load mock nếu không được truyền từ lesson/exam
  useEffect(() => {
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
  }, [courseId, lessonId, exerciseId, passedExercise]);

  // ✅ RUN CODE — API Piston giống LessonCode
  const handleRunCode = async () => {
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
          files: [
            {
              name: `main.${getFileExtension()}`,
              content: codeToRun,
            },
          ],
        }),
      });

      const result = await response.json();
      const stdout = result.run?.stdout || "";
      const stderr = result.run?.stderr || "";

      setOutput(stdout || stderr || "Không có kết quả.");
    } catch (err) {
      setOutput("Lỗi khi chạy code. Vui lòng thử lại sau.");
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

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
      {/* Layout Editor + Output + Resize */}
      <div ref={containerRef} className="flex flex-1 mt-4 overflow-hidden">
        {/* ✅ Editor */}
        <div className="flex flex-col border-r" style={{ width: editorWidth }}>
          <CodeEditor
            languages={languages}
            language={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            code={currentCode}
            onCodeChange={setCurrentCode}
            onRunCode={handleRunCode}
            isRunning={isRunning}
          />
        </div>

        {/* ✅ Thanh resize */}
        <ResizableDivider
          orientation="vertical"
          isDark={isDark}
          onResize={(e) => {
            const newWidth = Math.min(
              Math.max(e.clientX, 400),
              window.innerWidth - 400
            );
            setEditorWidth(newWidth);
          }}
        />

        {/* ✅ Output */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Output output={output} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
