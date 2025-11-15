import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeScreen from "@/components/exam/HomeScreen";
import QuizScreen from "@/components/exam/QuizScreen";
// import ResultsScreen from "@/components/exam/ResultsScreen";
import ExercisesScreen from "@/components/exam/ExercisesScreen";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { quizQuestions } from "@/mock/quizQuestions";
import { codingExercises } from "@/mock/codingExercises";
import { useQuizTimer } from "@/utils/useQuizTimer";

const TIME_LIMIT = 600;

export default function ExamCode() {
  const navigate = useNavigate();
  const [appState, setAppState] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const handleTimeTick = useCallback((time) => setTimeSpent(time), []);
  useQuizTimer(isTimerActive, handleTimeTick);

  const resetState = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setIsReviewMode(false);
    setIsTimerActive(false);
    setTimeSpent(0);
  };

  const startQuiz = () => {
    resetState();
    setQuestions(quizQuestions);
    setAppState("quiz");
    setIsTimerActive(true);
  };

  const goHome = () => {
    resetState();
    setAppState("home");
  };

  const goToResults = () => setAppState("results");

  const reviewAnswers = () => {
    setIsReviewMode(true);
    setAppState("quiz");
    setCurrentQuestion(0);
  };

  // Listen for review mode event from QuizScreen
  useEffect(() => {
    const handleStartReviewMode = () => {
      reviewAnswers();
    };

    window.addEventListener("startReviewMode", handleStartReviewMode);
    return () =>
      window.removeEventListener("startReviewMode", handleStartReviewMode);
  }, []);
  const submitQuiz = () => {
    setIsTimerActive(false);
    setAppState("results");
  };

  const goToExercises = () => {
    resetState();
    setAppState("exercises");
  };

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const nextQuestion = () =>
    currentQuestion < questions.length - 1 &&
    setCurrentQuestion((prev) => prev + 1);
  const prevQuestion = () =>
    currentQuestion > 0 && setCurrentQuestion((prev) => prev - 1);
  const jumpToQuestion = (index) =>
    index >= 0 && index < questions.length && setCurrentQuestion(index);

  // Khi click bài tập, chuyển sang trang Compiler
  const openExercise = (exercise) => {
    navigate(`/compiler/${exercise.id}`, {
      state: { exercise, exercises: codingExercises },
    });
  };

  const renderContent = () => {
    switch (appState) {
      case "quiz":
        return (
          <QuizScreen
            quizQuestions={questions}
            answers={answers}
            currentQuestion={currentQuestion}
            timeSpent={timeSpent}
            selectAnswer={selectAnswer}
            prevQuestion={prevQuestion}
            nextQuestion={nextQuestion}
            submitQuiz={submitQuiz}
            goHome={goHome}
            goToResults={goToResults}
            jumpToQuestion={jumpToQuestion}
            isReviewMode={isReviewMode}
            timeLimit={TIME_LIMIT}
          />
        );
      // case "results":
      //   return (
      //     <ResultsScreen
      //       questions={questions}
      //       answers={answers}
      //       timeSpent={timeSpent}
      //       onReview={reviewAnswers}
      //       onGoHome={goHome}
      //     />
      //   );
      case "exercises":
        return (
          <ExercisesScreen
            codingExercises={codingExercises}
            openExercise={openExercise} // Chuyển trang compiler
            goHome={goHome}
          />
        );
      case "home":
      default:
        return (
          <HomeScreen startQuiz={startQuiz} startExercises={goToExercises} />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-gray-900 transition-colors duration-500">
      <Header />
      <main className="flex-1 flex flex-col min-h-0 overflow-auto transition-colors duration-500">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
