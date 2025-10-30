// Mock data nâng cao và chi tiết hơn
export const quizData = {
  courseId: "JSB001",
  courseTitle: "Lập trình JavaScript Cơ Bản",
  courseDescription:
    "Khóa học giúp bạn làm quen với cú pháp, biến, hàm, vòng lặp, mảng, đối tượng và xử lý sự kiện trong JavaScript. Kết thúc khóa, bạn có thể tự viết các chương trình web tương tác cơ bản.",
  totalLessons: 12,
  estimatedTime: "10 giờ học",
  difficultyLevel: "Cơ bản",
  requirements: [
    "Hiểu biết cơ bản về HTML/CSS",
    "Đã cài đặt trình duyệt Chrome hoặc VSCode",
  ],
  instructions: [
    "Hoàn thành toàn bộ câu hỏi trắc nghiệm cơ bản trước khi làm bài nâng cao.",
    "Với bài tập nâng cao, hãy chạy code và kiểm tra kết quả trước khi nộp.",
    "Bạn có thể thực hành lại nhiều lần cho đến khi đạt 100%.",
  ],
  passingScore: 70, // %
  badges: ["JavaScript Beginner", "Syntax Master"],

  basicQuiz: {
    title: "Kiểm tra Nguyên lý Cơ bản",
    description:
      "Bài kiểm tra trắc nghiệm giúp bạn ôn lại các kiến thức nền tảng như khai báo biến, kiểu dữ liệu, vòng lặp và hàm trong JavaScript.",
    timeLimit: 900, // 15 phút
    totalQuestions: 5,
    difficulty: "Dễ - Trung bình",
    questions: [
      {
        id: 1,
        question: "Biến trong JavaScript được khai báo bằng từ khóa nào?",
        options: ["var", "let", "const", "Tất cả đều đúng"],
        correctAnswer: 3,
        explanation:
          "Tất cả từ khóa var, let và const đều có thể dùng để khai báo biến, tuy nhiên khác nhau về phạm vi và khả năng gán lại giá trị.",
        tags: ["biến", "scope", "let", "const"],
        code: `let x = 10;\nconst y = 20;\nvar z = 30;`,
      },
      {
        id: 2,
        question: "Kết quả của biểu thức `2 + '2'` là gì?",
        options: ["4", "'4'", "'22'", "NaN"],
        correctAnswer: 2,
        explanation:
          "Khi cộng number với string, JavaScript tự động chuyển number thành string. Vì vậy kết quả là '22'.",
        tags: ["ép kiểu", "string", "toán tử +"],
        code: `console.log(2 + '2');`,
      },
      {
        id: 3,
        question: "Hàm nào được dùng để in ra console trong JavaScript?",
        options: ["console.log()", "alert()", "print()", "document.write()"],
        correctAnswer: 0,
        explanation:
          "`console.log()` là hàm dùng phổ biến để in kết quả ra bảng console của trình duyệt.",
        tags: ["console", "debug"],
        code: `console.log("Xin chào!");`,
      },
      {
        id: 4,
        question: "Kiểu dữ liệu của giá trị `null` trong JavaScript là gì?",
        options: ["null", "undefined", "object", "string"],
        correctAnswer: 2,
        explanation:
          "Do lỗi trong thiết kế ban đầu của JS, typeof null trả về 'object'.",
        tags: ["typeof", "null"],
        code: `console.log(typeof null);`,
      },
      {
        id: 5,
        question: "Câu lệnh nào tạo ra vòng lặp vô hạn hợp lệ?",
        options: [
          "for(;;) {}",
          "while(true) {}",
          "do {} while(true)",
          "Tất cả đều đúng",
        ],
        correctAnswer: 3,
        explanation:
          "Cả 3 đều là vòng lặp vô hạn nếu không có câu lệnh break bên trong.",
        tags: ["loop", "for", "while"],
        code: `for(;;) { console.log('loop'); }`,
      },
    ],
  },

  advancedTasks: [
    {
      id: 1,
      title: "Tính tổng mảng",
      description:
        "Viết hàm `sumArray(arr)` trả về tổng của tất cả các phần tử trong mảng `arr`.",
      difficulty: "Dễ",
      status: "not_started",
      estimatedTime: "10 phút",
      skills: ["array", "reduce", "for loop"],
      example: {
        input: "[1, 2, 3, 4]",
        output: "10",
      },
      testCases: [
        { input: "[1,2,3]", expected: 6 },
        { input: "[-1,5,10]", expected: 14 },
      ],
      hints: [
        "Bạn có thể dùng vòng lặp `for` hoặc hàm `reduce()` để cộng dồn.",
        "Đừng quên xử lý mảng rỗng!",
      ],
    },
    {
      id: 2,
      title: "Đảo ngược chuỗi",
      description:
        "Tạo hàm `reverseString(str)` trả về chuỗi được đảo ngược từ `str`.",
      difficulty: "Trung bình",
      status: "not_started",
      estimatedTime: "15 phút",
      skills: ["string", "array", "loop"],
      example: {
        input: "'Hello'",
        output: "'olleH'",
      },
      testCases: [
        { input: "'abc'", expected: "'cba'" },
        { input: "'racecar'", expected: "'racecar'" },
      ],
      hints: [
        "Hãy thử tách chuỗi thành mảng ký tự rồi đảo ngược mảng.",
        "Bạn có thể sử dụng `split()`, `reverse()` và `join()`.",
      ],
    },
    {
      id: 3,
      title: "Tìm số lớn nhất trong mảng",
      description:
        "Viết hàm `findMax(arr)` để tìm phần tử lớn nhất trong mảng số.",
      difficulty: "Khó",
      status: "not_started",
      estimatedTime: "20 phút",
      skills: ["array", "max", "spread operator"],
      example: {
        input: "[5, 1, 8, 3]",
        output: "8",
      },
      testCases: [
        { input: "[1,2,3,4,5]", expected: 5 },
        { input: "[-5,-2,-10]", expected: -2 },
      ],
      hints: [
        "Có thể dùng `Math.max(...arr)` hoặc duyệt mảng và so sánh từng phần tử.",
        "Nhớ kiểm tra trường hợp mảng rỗng.",
      ],
    },
  ],
};
