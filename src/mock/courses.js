// mock/courses.js

export const mockLanguages = [
  { id: 1, name: "JavaScript", color: "from-yellow-400 to-yellow-600" },
  { id: 2, name: "Python", color: "from-blue-400 to-blue-600" },
  { id: 3, name: "C++", color: "from-red-400 to-red-600" },
  { id: 4, name: "Java", color: "from-orange-400 to-orange-600" },
  { id: 5, name: "C#", color: "from-purple-500 to-purple-700" },
];

export const mockCourses = [
  {
    id: 1,
    title: "Bắt đầu với JavaScript",
    description:
      "Tìm hiểu những khái niệm đầu tiên về JavaScript: biến, hàm, vòng lặp, và cách tạo trang web tương tác cơ bản.",
    lang_id: 1,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    students: 3200,
    duration: "12 giờ",
    lessons: 20,
    progress: 30,
  },
  {
    id: 2,
    title: "Làm quen với Python",
    description:
      "Khóa học nhập môn giúp bạn nắm được cú pháp Python, làm việc với biến, vòng lặp và đọc ghi file cơ bản.",
    lang_id: 2,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    students: 4100,
    duration: "10 giờ",
    lessons: 18,
    progress: 20,
  },
  {
    id: 3,
    title: "Lập trình C++ cho người mới",
    description:
      "Bắt đầu hành trình với C++: kiểu dữ liệu, cấu trúc điều khiển, và viết chương trình console đầu tiên của bạn.",
    lang_id: 3,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    students: 2100,
    duration: "14 giờ",
    lessons: 22,
    progress: 10,
  },
  {
    id: 4,
    title: "Java cơ bản cho người mới bắt đầu",
    description:
      "Khám phá cú pháp Java, làm quen với lập trình hướng đối tượng và tạo chương trình nhỏ chạy trên console.",
    lang_id: 4,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    students: 2800,
    duration: "15 giờ",
    lessons: 25,
    progress: 0,
  },
  {
    id: 5,
    title: "Nhập môn C# với Visual Studio",
    description:
      "Học cách tạo ứng dụng đầu tiên bằng C#: từ cú pháp cơ bản, vòng lặp, hàm cho đến giao diện đơn giản với Windows Forms.",
    lang_id: 5,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    students: 3400,
    duration: "16 giờ",
    lessons: 24,
    progress: 40,
  },
  {
    id: 6,
    title: "Python cơ bản qua dự án nhỏ",
    description:
      "Làm quen với Python bằng cách thực hiện các mini project như máy tính đơn giản, trò chơi đoán số và xử lý dữ liệu nhỏ.",
    lang_id: 2,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    students: 3900,
    duration: "12 giờ",
    lessons: 20,
    progress: 15,
  },
];
