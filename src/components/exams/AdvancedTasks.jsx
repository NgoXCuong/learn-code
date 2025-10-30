import React from "react";
import TaskCard from "./TaskCard";

const AdvancedTasks = ({
  advancedTasks,
  handleTaskAction,
  handleMarkComplete,
}) => {
  if (advancedTasks.length === 0)
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Chưa có bài tập nâng cao nào.
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {advancedTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleTaskAction={handleTaskAction}
          handleMarkComplete={handleMarkComplete}
        />
      ))}
    </div>
  );
};

export default AdvancedTasks;
