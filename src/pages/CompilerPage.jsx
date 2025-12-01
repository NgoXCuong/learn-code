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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [activeTab, setActiveTab] = useState("editor");

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

      {/* Desktop: Side-by-side layout */}
      {windowWidth >= 1024 ? (
        <div ref={containerRef} className="flex flex-1 mt-4 overflow-hidden">
          <div
            className="flex flex-col border-r"
            style={{ width: editorWidth }}
          >
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

          <ResizableDivider
            orientation="vertical"
            isDark={isDark}
            onResize={(e) => {
              const newWidth = Math.min(
                Math.max(e.clientX, 400),
                windowWidth - 400
              );
              setEditorWidth(newWidth);
            }}
          />

          <div className="flex-1 p-4 overflow-y-auto">
            <Output output={output} />
          </div>
        </div>
      ) : (
        /* Mobile: Tab layout */
        <>
          <div className="flex border-b border-gray-200 dark:border-gray-700 mt-4">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex-1 px-4 py-3 font-bold text-sm sm:text-base transition-colors relative ${
                activeTab === "editor"
                  ? isDark
                    ? "text-indigo-400"
                    : "text-indigo-600"
                  : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📝 Code
              {activeTab === "editor" && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                    isDark ? "bg-indigo-400" : "bg-indigo-600"
                  }`}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`flex-1 px-4 py-3 font-bold text-sm sm:text-base transition-colors relative ${
                activeTab === "output"
                  ? isDark
                    ? "text-indigo-400"
                    : "text-indigo-600"
                  : isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🖥️ Output
              {activeTab === "output" && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                    isDark ? "bg-indigo-400" : "bg-indigo-600"
                  }`}
                />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === "editor" && (
              <div className="h-full p-2 sm:p-4">
                <div className="h-full min-h-[400px] bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
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
              </div>
            )}

            {activeTab === "output" && (
              <div className="h-full p-2 sm:p-4 overflow-y-auto">
                <Output output={output} />
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
