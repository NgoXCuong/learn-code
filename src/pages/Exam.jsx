import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/exams/Sidebar";
import BasicQuiz from "@/components/exams/BasicQuiz";
import AdvancedTasks from "@/components/exams/AdvancedTasks";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { quizData } from "@/mock/exam";
import { Clock, BookOpen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Exam = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [advancedTasks, setAdvancedTasks] = useState(quizData.advancedTasks);

  // Trong Exam component
  const navigate = useNavigate();

  const handleTaskAction = (taskId) => {
    // Tạo mảng exercises từ advancedTasks
    const exercisesFromAdvanced = advancedTasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      example_code: task.example_code || "", // nếu có code mẫu
      language: "javascript", // default
      difficulty: task.difficulty,
    }));

    // Lấy bài hiện tại
    const currentExercise = exercisesFromAdvanced.find((t) => t.id === taskId);

    navigate(`/compiler/advanced/${taskId}`, {
      state: {
        exercise: currentExercise,
        exercises: exercisesFromAdvanced,
      },
    });
  };

  // === Basic Quiz Logic ===
  const handleStartQuiz = () => setQuizStarted(true);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const toggleMarkQuestion = (questionId) => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev);
      newSet.has(questionId)
        ? newSet.delete(questionId)
        : newSet.add(questionId);
      return newSet;
    });
  };

  const handleSubmitQuiz = () => setShowResults(true);
  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setMarkedQuestions(new Set());
    setQuizStarted(false);
    setShowResults(false);
  };

  const handleMarkComplete = (taskId) =>
    setAdvancedTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );

  // === Tính tiến độ làm quiz ===
  const quizProgress = useMemo(() => {
    const total = quizData.basicQuiz.questions.length;
    const answered = Object.keys(selectedAnswers).length;
    return Math.round((answered / total) * 100);
  }, [selectedAnswers]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* === Sidebar === */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={true}
          quizData={quizData}
          selectedAnswers={selectedAnswers}
          markedQuestions={markedQuestions}
          advancedTasks={advancedTasks}
        />

        {/* === Nội dung chính === */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Tiêu đề khóa học */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {quizData.courseTitle}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {quizData.courseDescription}
            </p>

            {/* Thông tin tổng quan */}
            <div className="flex flex-wrap gap-6 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span>{quizData.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-500" />
                <span>{quizData.totalLessons} bài học</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Độ khó: {quizData.difficultyLevel}</span>
              </div>
            </div>

            {/* Thanh tiến độ */}
            {activeTab === "basic" && quizStarted && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Tiến độ bài kiểm tra</span>
                  <span>{quizProgress}%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${quizProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Vùng hiển thị nội dung theo tab */}
          <AnimatePresence mode="wait">
            {activeTab === "basic" && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <BasicQuiz
                  quizData={quizData}
                  selectedAnswers={selectedAnswers}
                  markedQuestions={markedQuestions}
                  handleAnswerSelect={handleAnswerSelect}
                  toggleMarkQuestion={toggleMarkQuestion}
                  quizStarted={quizStarted}
                  showResults={showResults}
                  handleStartQuiz={handleStartQuiz}
                  handleSubmitQuiz={handleSubmitQuiz}
                  handleRetakeQuiz={handleRetakeQuiz}
                />
              </motion.div>
            )}

            {activeTab === "advanced" && (
              <motion.div
                key="advanced"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <AdvancedTasks
                  advancedTasks={advancedTasks}
                  handleTaskAction={handleTaskAction}
                  handleMarkComplete={handleMarkComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Exam;
