import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  AlertTriangle,
  X,
  XCircle,
  Home,
} from "lucide-react";

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
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
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
    if (answeredCount > 0 && !isReviewMode) setShowExitModal(true);
    else goHome();
  };

  const handleSubmitClick = () => {
    if (unansweredCount > 0) setShowSubmitConfirm(true);
    else submitQuiz();
  };

  const confirmSubmit = () => {
    setShowSubmitConfirm(false);
    submitQuiz();
  };

  return (
    // Thêm dark: class cho các phần chính
    <div className="flex flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
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
            onClick={goToResults} // nút “Về trang kết quả”
            className="mt-6 w-full py-3 bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <Home className="w-5 h-5" /> Về trang kết quả
          </button>
        ) : (
          <button
            onClick={handleSubmitClick} // thêm event handler
            className="mt-6 w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <CheckCircle className="w-5 h-5" /> Nộp bài
          </button>
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
              onClick={goHome}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700  transition-all flex items-center gap-2 font-medium"
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
        confirm={goHome}
      />
      <SubmitConfirmModal
        show={showSubmitConfirm}
        unansweredCount={unansweredCount}
        close={() => setShowSubmitConfirm(false)}
        confirm={confirmSubmit}
      />
    </div>
  );
}
// ===================== COMPONENTS PHỤ (Dark Mode) =====================
const InfoBox = ({ number, label, color }) => {
  const colorClasses = {
    green: {
      wrapper:
        "bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700",
      text: "text-green-600 dark:text-green-400",
    },
    gray: {
      wrapper:
        "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600",
      text: "text-gray-600 dark:text-gray-300",
    },
  };
  return (
    <div
      className={`p-3 rounded-lg text-center border transition-colors duration-300 ${colorClasses[color].wrapper}`}
    >
      <div className={`text-2xl font-bold ${colorClasses[color].text}`}>
        {number}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
};

const QuestionGrid = ({
  quizQuestions,
  answers,
  currentQuestion,
  jumpTo,
  isReviewMode,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {quizQuestions.map((q, idx) => {
        const isCurrent = idx === currentQuestion;
        const isAnswered = answers[q.id] !== undefined;
        const isCorrect = isAnswered && answers[q.id] === q.correctAnswer;

        let style =
          "bg-gray-50 text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"; // default

        if (isReviewMode) {
          if (isCorrect)
            style =
              "bg-green-100 text-green-800 border border-green-300 dark:bg-green-800 dark:text-green-300 dark:border-green-700";
          else if (isAnswered)
            style =
              "bg-red-100 text-red-800 border border-red-300 dark:bg-red-800 dark:text-red-300 dark:border-red-700";
          else
            style =
              "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600";
        } else if (isAnswered) {
          style =
            "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100 dark:bg-green-900 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-800";
        }

        if (isCurrent) {
          style =
            "bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110 shadow-md ring-2 ring-offset-2 ring-blue-400";
        }

        return (
          <button
            key={q.id}
            onClick={() => jumpTo(idx)}
            className={`aspect-square rounded-lg font-bold text-sm transition-all ${style}`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
};

const MobileSidebar = ({
  close,
  quizQuestions,
  answers,
  currentQuestion,
  jumpTo,
  isReviewMode,
  answeredCount,
  unansweredCount,
  handleSubmitClick,
  goToResults,
}) => {
  return (
    <div className="lg:hidden fixed inset-0 z-40 flex">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={close}
      ></div>
      <div className="relative ml-auto w-80 bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto animate-slideInRight transition-colors duration-300">
        <div className="flex justify-between items-center mb-5">
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Danh sách câu hỏi
          </p>
          <button
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            onClick={close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
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
          jumpTo={jumpTo}
          isReviewMode={isReviewMode}
        />
        {isReviewMode ? (
          <button
            onClick={goToResults}
            className="mt-6 w-full py-3 bg-linear-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <Home className="w-5 h-5" /> Về trang kết quả
          </button>
        ) : (
          <button
            onClick={handleSubmitClick}
            className="mt-6 w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 transition-colors duration-300"
          >
            <CheckCircle className="w-5 h-5" /> Nộp bài
          </button>
        )}
      </div>
    </div>
  );
};

const QuestionBlock = ({
  currentQ,
  currentQuestion,
  answers,
  selectAnswer,
  isReviewMode,
}) => {
  const userAnswer = answers[currentQ.id];

  return (
    <>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-md shrink-0">
          {currentQuestion + 1}
        </div>
        <h3 className="text-xl md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed flex-1">
          {currentQ.question}
        </h3>
      </div>

      <div className="mt-6 space-y-3">
        {currentQ.options.map((option, optIdx) => {
          const optionLabel = String.fromCharCode(65 + optIdx);
          const isSelected = userAnswer === optIdx;
          const isCorrect = currentQ.correctAnswer === optIdx;

          let style =
            "border-gray-200 hover:border-blue-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-gray-700";
          let labelStyle =
            "text-gray-600 border-gray-300 dark:text-gray-300 dark:border-gray-500";
          let icon = null;

          if (isReviewMode) {
            if (isCorrect) {
              style =
                "border-green-500 bg-green-50 shadow-md dark:bg-green-800";
              labelStyle = "bg-green-500 border-green-500 text-white";
              icon = (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-300" />
              );
            } else if (isSelected && !isCorrect) {
              style = "border-red-500 bg-red-50 shadow-md dark:bg-red-800";
              labelStyle = "bg-red-500 border-red-500 text-white";
              icon = (
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-300" />
              );
            } else {
              style = "border-gray-200 bg-gray-50 opacity-80 dark:bg-gray-700";
            }
          } else if (isSelected) {
            style = "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-800";
            labelStyle = "bg-blue-500 border-blue-500 text-white";
            icon = (
              <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-300" />
            );
          }

          return (
            <div
              key={optIdx}
              onClick={() => !isReviewMode && selectAnswer(currentQ.id, optIdx)}
              className={`p-4 border-2 rounded-lg transition-all ${
                !isReviewMode && "cursor-pointer hover:scale-[1.02]"
              } ${style}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 font-bold transition-all shrink-0 ${labelStyle}`}
                >
                  {optionLabel}
                </div>
                <div className="flex-1 text-gray-800 dark:text-gray-100">
                  {option}
                </div>
                {icon}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const NavigationButtons = ({ currentQuestion, quizLength, prev, next }) => (
  <div className="flex gap-3 mt-8">
    <button
      onClick={prev}
      disabled={currentQuestion === 0}
      className="px-5 py-3 dark:text-white text-gray-800 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
    >
      <ChevronLeft className="w-5 h-5" /> Câu trước
    </button>
    <button
      onClick={next}
      disabled={currentQuestion === quizLength - 1}
      className="flex-1 px-5 py-3 bg-linear-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 text-white rounded-lg shadow-md font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
    >
      Câu tiếp theo <ChevronRight className="w-5 h-5" />
    </button>
  </div>
);

const ExitModal = ({ show, close, answeredCount, total, confirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full animate-scaleIn transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-700 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Xác nhận thoát
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Bạn đã trả lời {answeredCount}/{total} câu. Nếu thoát bây giờ, tiến
          trình sẽ không được lưu.
        </p>
        <div className="flex gap-3">
          <button
            onClick={close}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Tiếp tục làm
          </button>
          <button
            onClick={confirm}
            className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
};

const SubmitConfirmModal = ({ show, unansweredCount, close, confirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full animate-scaleIn transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-700 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Xác nhận nộp bài
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Bạn còn {unansweredCount} câu chưa làm. Bạn có chắc muốn nộp bài?
        </p>
        <div className="flex gap-3">
          <button
            onClick={close}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Quay lại
          </button>
          <button
            onClick={confirm}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
};
