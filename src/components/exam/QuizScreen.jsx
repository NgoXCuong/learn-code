import React, { useState, useEffect, useContext } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  X,
  XCircle,
  Home,
  Trophy,
  FileText,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import ResultsScreen from "./ResultsScreen";
import InfoBox from "./InfoBox";
import QuestionGrid from "./QuestionGrid";
import QuestionBlock from "./QuestionBlock";
import ExitModal from "./ExitModal";
import ResultsModal from "./ResultsModal";
import SubmitConfirmModal from "./SubmitConfirmModal";

export default function QuizScreen({
  quizQuestions,
  answers,
  currentQuestion,
  timeSpent,
  selectAnswer,
  prevQuestion,
  nextQuestion,
  submitQuiz,
  goHome,
  goToResults,
  jumpToQuestion,
  isReviewMode = false,
  timeLimit = 3600,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const currentQ = quizQuestions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = quizQuestions.length - answeredCount;
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const timeRemaining = timeLimit - timeSpent;
  const isTimeWarning = timeRemaining < 300 && timeRemaining > 0;
  const isTimeCritical = timeRemaining < 60 && timeRemaining > 0;

  useEffect(() => {
    if (!isReviewMode && timeRemaining <= 0) submitQuiz();
  }, [timeRemaining, isReviewMode]);

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const smoothJump = (action) => {
    setIsTransitioning(true);
    setTimeout(() => {
      action();
      setIsTransitioning(false);
      setShowMobileSidebar(false);
    }, 150);
  };

  const handleExitClick = () => {
    if (!isReviewMode) setShowExitModal(true);
    else goHome();
  };

  const handleSubmitClick = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để nộp bài!");
      navigate("/login");
      return;
    }

    if (unansweredCount > 0) {
      setShowSubmitConfirm(true);
    } else {
      // Stop the timer when submitting
      const stopTimerEvent = new CustomEvent("stopTimer");
      window.dispatchEvent(stopTimerEvent);
      setShowResultsModal(true);
    }
  };

  return (
    // Thêm dark: class cho các phần chính
    <div className="flex font-exo flex-1 overflow-hidden bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-white dark:bg-gray-800 shadow-md p-6 overflow-y-auto fixed left-0 top-16  bottom-16 transition-colors duration-300">
        <h3 className="font-bold mb-4 text-lg text-gray-800 dark:text-gray-100">
          Danh sách câu hỏi
        </h3>

        {!isReviewMode && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <InfoBox number={answeredCount} label="Đã làm" color="green" />
            <InfoBox number={unansweredCount} label="Chưa làm" color="gray" />
          </div>
        )}

        <QuestionGrid
          quizQuestions={quizQuestions}
          answers={answers}
          currentQuestion={currentQuestion}
          jumpTo={(idx) => smoothJump(() => jumpToQuestion(idx))}
          isReviewMode={isReviewMode}
        />

        {isReviewMode ? (
          <button
            onClick={goHome} // nút "Quay lại trang chủ"
            className="mt-6 w-full py-3 bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <Home className="w-5 h-5" /> Quay lại trang chủ
          </button>
        ) : (
          <div className="mt-6 space-y-3">
            <button
              onClick={handleSubmitClick}
              className="w-full py-3 cursor-pointer hover:scale-105 transition bg-linear-to-r btn-shimmer from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2  duration-300"
            >
              <CheckCircle className="w-5 h-5" /> Nộp bài
            </button>
          </div>
        )}
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col lg:ml-80 transition-colors duration-300">
        {/* Quiz Header */}
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-gray-800 z-20 p-4 md:p-6 shadow rounded-xl transition-colors duration-300">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              {isReviewMode ? "Xem lại bài thi" : "Bài Thi Trắc Nghiệm"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              {isReviewMode
                ? `Câu ${currentQuestion + 1} / ${quizQuestions.length}`
                : `${answeredCount}/${quizQuestions.length} câu đã trả lời`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {!isReviewMode && (
              <div
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isTimeCritical
                    ? "bg-red-100 dark:bg-red-800 animate-pulse"
                    : isTimeWarning
                    ? "bg-orange-100 dark:bg-orange-800"
                    : "bg-blue-50 dark:bg-blue-900"
                }`}
              >
                <Clock
                  className={`w-5 h-5 ${
                    isTimeCritical
                      ? "text-red-600 dark:text-red-400"
                      : isTimeWarning
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    isTimeCritical
                      ? "text-red-700 dark:text-red-200"
                      : isTimeWarning
                      ? "text-orange-700 dark:text-orange-200"
                      : "text-blue-700 dark:text-blue-200"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            <button
              onClick={handleExitClick}
              className="px-4 py-2 btn-shimmer bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700  transition-all flex items-center gap-2 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Thoát</span>
            </button>
          </div>
        </div>

        {/* Question Block */}
        <div
          className={`flex-1 p-6 md:p-8 rounded-xl shadow-md transition-all duration-150 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          } bg-white dark:bg-gray-800`}
        >
          <QuestionBlock
            currentQ={currentQ}
            currentQuestion={currentQuestion}
            answers={answers}
            selectAnswer={selectAnswer}
            isReviewMode={isReviewMode}
          />
          <NavigationButtons
            currentQuestion={currentQuestion}
            quizLength={quizQuestions.length}
            prev={() => smoothJump(prevQuestion)}
            next={() => smoothJump(nextQuestion)}
          />
        </div>
      </main>

      {/* Modals */}
      <ExitModal
        show={showExitModal}
        close={() => setShowExitModal(false)}
        answeredCount={answeredCount}
        total={quizQuestions.length}
        confirm={() => {
          // Reset the timer when exiting
          const resetTimerEvent = new CustomEvent("resetTimer");
          window.dispatchEvent(resetTimerEvent);
          goHome();
        }}
      />
      <SubmitConfirmModal
        show={showSubmitConfirm}
        unansweredCount={unansweredCount}
        close={() => setShowSubmitConfirm(false)}
        confirm={() => {
          setShowSubmitConfirm(false);
          // Stop the timer when submitting
          const stopTimerEvent = new CustomEvent("stopTimer");
          window.dispatchEvent(stopTimerEvent);
          setShowResultsModal(true);
        }}
      />

      <ResultsModal
        show={showResultsModal}
        close={() => setShowResultsModal(false)}
        questions={quizQuestions}
        answers={answers}
        timeSpent={timeSpent}
        onReview={() => {
          setShowResultsModal(false);
          // Switch to review mode
          const event = new CustomEvent("startReviewMode");
          window.dispatchEvent(event);
        }}
        onGoHome={() => {
          setShowResultsModal(false);
          goHome();
        }}
      />
    </div>
  );
}
// ===================== COMPONENTS PHỤ (Dark Mode) =====================

const NavigationButtons = ({ currentQuestion, quizLength, prev, next }) => (
  <div className="flex gap-8 mt-8 font-exo">
    <button
      onClick={prev}
      disabled={currentQuestion === 0}
      className="px-5 py-3 btn-shimmer hover:scale-105 cursor-pointer dark:text-white text-gray-800 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-6"
    >
      <ChevronLeft className="w-5 h-5" /> Câu trước
    </button>
    <button
      onClick={next}
      disabled={currentQuestion === quizLength - 1}
      className="flex-1 px-5 py-3 btn-shimmer hover:scale-101 cursor-pointer transition-all bg-linear-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg shadow-md font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-700 flex items-center justify-center gap-6"
    >
      Câu tiếp theo <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

// const MobileSidebar = ({
//   close,
//   quizQuestions,
//   answers,
//   currentQuestion,
//   jumpTo,
//   isReviewMode,
//   answeredCount,
//   unansweredCount,
//   handleSubmitClick,
//   goToResults,
// }) => {
//   return (
//     <div className="lg:hidden fixed inset-0 z-40 flex">
//       <div
//         className="absolute inset-0 bg-black bg-opacity-50"
//         onClick={close}
//       ></div>
//       <div className="relative ml-auto w-80 bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto animate-slideInRight transition-colors duration-300">
//         <div className="flex justify-between items-center mb-5">
//           <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
//             Danh sách câu hỏi
//           </p>
//           <button
//             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
//             onClick={close}
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         {!isReviewMode && (
//           <div className="grid grid-cols-2 gap-3 mb-6">
//             <InfoBox number={answeredCount} label="Đã làm" color="green" />
//             <InfoBox number={unansweredCount} label="Chưa làm" color="gray" />
//           </div>
//         )}
//         <QuestionGrid
//           quizQuestions={quizQuestions}
//           answers={answers}
//           currentQuestion={currentQuestion}
//           jumpTo={jumpTo}
//           isReviewMode={isReviewMode}
//         />
//         {isReviewMode ? (
//           <button
//             onClick={goToResults}
//             className="mt-6 w-full py-3 bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
//           >
//             <Home className="w-5 h-5" /> Về trang kết quả
//           </button>
//         ) : (
//           <button
//             onClick={handleSubmitClick}
//             className="mt-6 w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
//           >
//             <CheckCircle className="w-5 h-5" /> Nộp bài
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };
