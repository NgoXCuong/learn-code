// src/pages/compiler/services/mockApi.js

export const runCode = async ({ language, code }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ output: `Kết quả giả lập (${language}):\n${code}` });
    }, 500);
  });
};

export const submitExercise = async ({ exerciseId, code }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const passed = Math.random() > 0.3; // 70% pass rate
      resolve({
        passed: passed,
        message: passed ? "Submit thành công!" : "Submit thất bại!",
        score: passed
          ? Math.floor(Math.random() * 20) + 80
          : Math.floor(Math.random() * 40) + 20,
        testsPassed: passed
          ? Math.floor(Math.random() * 3) + 7
          : Math.floor(Math.random() * 4) + 1,
        totalTests: 10,
        comments: passed
          ? [
              {
                type: "success",
                text: "Bạn đã khai báo biến và kiểu dữ liệu chính xác",
              },
              {
                type: "success",
                text: "Cấu trúc điều khiển (if, for) được sử dụng đúng cách",
              },
              {
                type: "success",
                text: "Kết quả in ra đúng theo yêu cầu của bài tập",
              },
              {
                type: "warning",
                text: "Có thể tối ưu thuật toán để giảm độ phức tạp",
              },
              { type: "info", text: "Nên thêm comment để code dễ hiểu hơn" },
            ]
          : [
              {
                type: "error",
                text: "Lỗi cú pháp trong code",
              },
              {
                type: "warning",
                text: "Thiếu xử lý edge cases",
              },
              { type: "info", text: "Xem lại logic thuật toán" },
            ],
        suggestions: [
          "Sử dụng HashMap thay vì nested loops để tối ưu độ phức tạp từ O(n²) xuống O(n)",
          "Xem xét edge cases: mảng rỗng, số âm, số trùng lặp",
          "Thêm validation đầu vào để tránh lỗi runtime",
        ],
      });
    }, 500);
  });
};
