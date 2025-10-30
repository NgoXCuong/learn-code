import React from "react";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Code2,
  Play,
  Award,
  Flame,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const handleTaskAction = () => {
    navigate(`/exam/${task.id}`, { state: { exercise: task } });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-4 h-4" /> Hoàn thành
          </span>
        );
      case "in_progress":
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Clock className="w-4 h-4" /> Đang làm
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <AlertCircle className="w-4 h-4" /> Chưa bắt đầu
          </span>
        );
    }
  };

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Dễ":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "Trung bình":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      case "Khó":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700";
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-transparent hover:border-blue-500/20">
      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {task.title}
            </h3>
            {task.status === "completed" && (
              <CheckCircle
                className="w-5 h-5 text-green-500"
                title="Hoàn thành"
              />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-2xl">
            {task.description}
          </p>
        </div>
        {getStatusBadge(task.status)}
      </div>

      {/* Difficulty & Stats */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyStyle(
            task.difficulty
          )}`}
        >
          {task.difficulty}
        </span>
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm gap-1">
          <Award className="w-4 h-4 text-yellow-500" />
          <span>+50 điểm</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm gap-1">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Ước lượng: 10 phút</span>
        </div>
      </div>

      {/* Example Section */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-blue-500" />
          Ví dụ minh họa
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Input:
            </p>
            <pre className="bg-gray-900 text-gray-100 text-sm p-3 rounded-lg overflow-x-auto">
              {task.example.input}
            </pre>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Output:
            </p>
            <pre className="bg-gray-900 text-gray-100 text-sm p-3 rounded-lg overflow-x-auto">
              {task.example.output}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleTaskAction(task.id)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow hover:shadow-lg"
        >
          <Play className="w-5 h-5" />
          Thực hành ngay
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
