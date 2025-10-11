import React from "react";
import { useNavigate } from "react-router-dom";

const challenges = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Dễ",
    xp: 100,
    description: "Viết hàm đảo ngược một chuỗi bất kỳ.",
    starterCode: `function reverseString(str) {
  // TODO: Viết code ở đây
}`,
  },
  {
    id: 2,
    title: "Find Maximum Subarray",
    difficulty: "Trung bình",
    xp: 200,
    description: "Tìm tổng lớn nhất của một dãy con liên tiếp.",
    starterCode: `function maxSubArray(nums) {
  // TODO: Viết code ở đây
}`,
  },
  {
    id: 3,
    title: "Binary Tree Level Order Traversal",
    difficulty: "Khó",
    xp: 400,
    description: "In các giá trị theo tầng trong cây nhị phân.",
    starterCode: `function levelOrder(root) {
  // TODO: Viết code ở đây
}`,
  },
];

export default function ChallengeList() {
  const navigate = useNavigate();

  const handleChallengeClick = (challenge) => {
    // 👉 Chuyển đến CompilerPage và truyền dữ liệu bài tập
    navigate("/compiler", { state: { challenge } });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🧩 Danh sách Thử thách
      </h2>
      <div className="space-y-4">
        {challenges.map((ch) => (
          <div
            key={ch.id}
            className="p-4 border rounded-xl cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onClick={() => handleChallengeClick(ch)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{ch.title}</h3>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  ch.difficulty === "Dễ"
                    ? "bg-green-100 text-green-700"
                    : ch.difficulty === "Trung bình"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {ch.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {ch.description}
            </p>
            <div className="text-sm text-blue-600 mt-2">+{ch.xp} XP</div>
          </div>
        ))}
      </div>
    </div>
  );
}
