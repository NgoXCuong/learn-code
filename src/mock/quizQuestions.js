export const quizQuestions = [
  {
    id: 1,
    question: "HTML là viết tắt của gì?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correctAnswer: 0,
    explanation:
      "HTML (HyperText Markup Language) là ngôn ngữ đánh dấu chuẩn được sử dụng để tạo và thiết kế các trang web. HTML định nghĩa cấu trúc của nội dung web thông qua các thẻ (tags).",
  },
  {
    id: 2,
    question: "Thẻ HTML nào được sử dụng để tạo liên kết (link)?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: 1,
    explanation:
      "Thẻ <a> (anchor) được sử dụng để tạo hyperlink trong HTML. Thuộc tính href của thẻ này xác định URL đích mà liên kết sẽ dẫn đến.",
  },
  {
    id: 3,
    question: "CSS viết tắt của cụm từ nào?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
    ],
    correctAnswer: 1,
    explanation:
      "CSS (Cascading Style Sheets) là ngôn ngữ stylesheet dùng để mô tả cách hiển thị của các phần tử HTML. CSS kiểm soát layout, màu sắc, fonts và các khía cạnh visual khác.",
  },
  {
    id: 4,
    question: "JavaScript có thể chạy ở môi trường nào?",
    options: [
      "Chỉ trên server",
      "Chỉ trên client (browser)",
      "Cả client và server",
      "Chỉ trên database",
    ],
    correctAnswer: 2,
    explanation:
      "JavaScript là ngôn ngữ lập trình đa năng có thể chạy cả phía client (trình duyệt) và server (Node.js). Điều này làm cho JavaScript trở thành một trong những ngôn ngữ phổ biến nhất.",
  },
  {
    id: 5,
    question: "Từ khóa nào KHÔNG dùng để khai báo biến trong JavaScript?",
    options: ["var", "let", "const", "int"],
    correctAnswer: 3,
    explanation:
      "JavaScript sử dụng var, let, và const để khai báo biến. 'int' là kiểu dữ liệu trong các ngôn ngữ như Java, C++, nhưng không phải là từ khóa khai báo biến trong JavaScript.",
  },
  {
    id: 6,
    question: "Thuộc tính CSS nào thay đổi màu chữ?",
    options: ["font-color", "text-color", "color", "font-style"],
    correctAnswer: 2,
    explanation:
      "Thuộc tính 'color' trong CSS được sử dụng để đặt màu cho văn bản. Bạn có thể sử dụng tên màu, mã hex, RGB hoặc HSL.",
  },
  {
    id: 7,
    question: "Phương thức nào thêm phần tử vào cuối mảng trong JavaScript?",
    options: ["push()", "add()", "append()", "insert()"],
    correctAnswer: 0,
    explanation:
      "Phương thức push() thêm một hoặc nhiều phần tử vào cuối mảng và trả về độ dài mới của mảng. Đây là phương thức phổ biến để thao tác với mảng.",
  },
  {
    id: 8,
    question: "Selector nào trong CSS chọn phần tử theo class?",
    options: ["#classname", ".classname", "*classname", "@classname"],
    correctAnswer: 1,
    explanation:
      "Dấu chấm (.) được sử dụng làm selector class trong CSS. Ví dụ: .myClass sẽ chọn tất cả các phần tử có class='myClass'.",
  },
  {
    id: 9,
    question: "Kiểu dữ liệu nào KHÔNG có trong JavaScript?",
    options: ["String", "Boolean", "Character", "Number"],
    correctAnswer: 2,
    explanation:
      "JavaScript không có kiểu dữ liệu 'Character' riêng biệt. Thay vào đó, ký tự đơn được biểu diễn dưới dạng string có độ dài 1.",
  },
  {
    id: 10,
    question: "Thuộc tính CSS nào tạo khoảng cách BÊN TRONG phần tử?",
    options: ["margin", "padding", "border", "spacing"],
    correctAnswer: 1,
    explanation:
      "Padding tạo khoảng cách bên trong phần tử (giữa nội dung và border). Margin tạo khoảng cách bên ngoài phần tử (giữa border và các phần tử khác).",
  },
];
