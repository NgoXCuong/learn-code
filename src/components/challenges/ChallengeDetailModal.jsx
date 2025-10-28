// ============================================
// FILE: src/components/challenges/ChallengeDetailModal.jsx
// ============================================
import React, { useState } from "react";
import {
  X,
  Trophy,
  Clock,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  Zap,
  Star,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react";

export const ChallengeDetailModal = ({ challenge, onClose, userProgress }) => {
  const [showHints, setShowHints] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showAiHelp, setShowAiHelp] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alice",
      avatar: "👩‍💻",
      text: "Đây là bài tập hay để luyện tập cơ bản!",
      time: "2 giờ trước",
      likes: 5,
    },
    {
      id: 2,
      user: "Bob",
      avatar: "👨‍💻",
      text: "Mình giải bằng cách dùng two pointer, rất hiệu quả!",
      time: "5 giờ trước",
      likes: 8,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: Date.now(),
          user: "johndoe",
          avatar: "😎",
          text: newComment,
          time: "Vừa xong",
          likes: 0,
        },
        ...comments,
      ]);
      setNewComment("");
    }
  };

  const handleAttemptFailed = () => {
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    if (newAttempts >= 3) {
      setShowAiHelp(true);
    }
  };

  const handleClick = () => {
    console.log("Navigate to compiler");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {challenge.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    challenge.difficulty === "Dễ"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : challenge.difficulty === "Trung bình"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {challenge.difficulty}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  {challenge.points} điểm
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Trung bình: {challenge.avgTime}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Mô tả
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {challenge.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {challenge.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Tỷ lệ thành công
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {challenge.successRate}%
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Người tham gia
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {challenge.participants}
              </p>
            </div>
          </div>

          {challenge.hints.length > 0 && (
            <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 font-semibold mb-2"
              >
                <Lightbulb className="w-5 h-5" />
                Gợi ý ({challenge.hints.length})
                {showHints ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showHints && (
                <ul className="space-y-2 mt-3">
                  {challenge.hints.map((hint, i) => (
                    <li
                      key={i}
                      className="text-sm text-yellow-900 dark:text-yellow-100 flex gap-2"
                    >
                      <span className="font-bold">{i + 1}.</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {showAiHelp && (
            <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                    Trợ lý AI của bạn
                  </h4>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-3">
                    Bạn đã thử {failedAttempts} lần. Đây là một số gợi ý để giúp
                    bạn:
                  </p>
                  <ul className="text-sm text-indigo-900 dark:text-indigo-100 space-y-2">
                    <li className="flex gap-2">
                      <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Hãy xem lại logic xử lý biên (edge cases)</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Kiểm tra kỹ điều kiện vòng lặp của bạn</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Thử debug từng bước với input nhỏ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleClick}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Bắt đầu thử thách
            </button>
            <button
              onClick={handleAttemptFailed}
              className="px-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg transition-all"
            >
              Simulate Failed Attempt
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Bình luận ({comments.length})
            </h3>

            <div className="mb-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">😎</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Chia sẻ suy nghĩ của bạn..."
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Gửi bình luận
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">{comment.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {comment.user}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {comment.text}
                    </p>
                    <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <ThumbsUp className="w-3 h-3" />
                      Hữu ích ({comment.likes})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
