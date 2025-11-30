export const mockLanguages = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "C++" },
  { id: 4, name: "Java" },
  { id: 5, name: "C#" },
];

// Import lessons to count them dynamically
import { mockLessons } from "./lessons.js";

// Function to count lessons for a course
const getLessonCount = (courseId) => {
  return mockLessons.filter((lesson) => lesson.course_id === courseId).length;
};

// Function to calculate total duration for a course in hours
const getTotalDuration = (courseId) => {
  const courseLessons = mockLessons.filter(
    (lesson) => lesson.course_id === courseId
  );
  const totalMinutes = courseLessons.reduce((total, lesson) => {
    // Extract number from "X phút" format
    const minutes = parseInt(lesson.readTime.replace(" phút", ""));
    return total + minutes;
  }, 0);

  // Convert to hours and round up
  const hours = Math.ceil(totalMinutes / 60);
  return `${hours} giờ`;
};

export const mockCourses = [
  {
    id: 1,
    title: "Bắt đầu với JavaScript",
    description:
      "Khóa học JavaScript toàn diện từ cơ bản đến nâng cao. Học biến, hàm, DOM, sự kiện, AJAX, và các framework hiện đại như React. Xây dựng các dự án thực tế từ trang web động đến ứng dụng web hoàn chỉnh.",
    lang_id: 1,
    level: "Cơ bản",
    image: "https://files.fullstack.edu.vn/f8-prod/courses/1.png",
    rating: 4.9,
    // students: 12500,
    duration: getTotalDuration(1), // Dynamically calculate total duration for course 1
    lessons: getLessonCount(1), // Dynamically count lessons for course 1
    progress: 15,
    isFavorite: true,
  },

  {
    id: 2,
    title: "Python cho người mới bắt đầu",
    description:
      "Ngôn ngữ dễ học nhất cho người mới. Làm quen với cú pháp đơn giản, xử lý chuỗi, danh sách (List), từ điển (Dictionary) và viết các tool tự động hóa cơ bản.",
    lang_id: 2, // ID riêng cho Python
    level: "Cơ bản",
    image:
      "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/python-co-ban_b80bca9b238b4615b94541de28af00ae.png",
    rating: 4.9,
    duration: getTotalDuration(2),
    lessons: getLessonCount(2),
    progress: 30,
    isFavorite: true,
  },
  {
    id: 3,
    title: "Lập trình Java Cơ bản",
    description:
      "Hướng dẫn bài bản về lập trình hướng đối tượng (OOP) với Java. Hiểu về Class, Object, kế thừa, đa hình và bộ nhớ trong Java Virtual Machine (JVM).",
    lang_id: 4, // ID riêng cho Java
    level: "Cơ bản",
    image:
      "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/java-cho-nguoi-moi-bat-dau_9a1c4247a23441d9874bb3caca9ea497.png",
    rating: 4.7,
    duration: getTotalDuration(3),
    lessons: getLessonCount(3),
    progress: 100,
    isFavorite: false,
  },
  {
    id: 5,
    title: "C++ & Cấu trúc dữ liệu",
    description:
      "Ngôn ngữ mạnh mẽ về hiệu năng. Học về con trỏ, quản lý bộ nhớ thủ công và các cấu trúc dữ liệu nền tảng (Stack, Queue, Linked List).",
    lang_id: 3, // ID riêng cho C++
    level: "Trung bình",
    image:
      "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/thuat-toan-co-ban-cho-hoc-sinh_90c8311268d0425495915a7c125a1c91.jpg",
    rating: 4.8,
    duration: getTotalDuration(4),
    lessons: getLessonCount(4),
    progress: 10,
    isFavorite: true,
  },
  {
    id: 6,
    title: "Lập trình C# & .NET",
    description:
      "Ngôn ngữ chủ đạo của Microsoft. Làm quen với cú pháp C#, xử lý ngoại lệ và nền tảng .NET để chuẩn bị cho lập trình ứng dụng Windows hoặc Game Unity.",
    lang_id: 5, // ID riêng cho C#
    level: "Cơ bản",
    image:
      "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/csharp-co-ban_96ca03bee27f454eb1f1c86e1fc5ef74.png",
    rating: 4.6,
    duration: getTotalDuration(5),
    lessons: getLessonCount(5),
    progress: 100,
    isFavorite: false,
  },
];
