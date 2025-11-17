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
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80", // Ảnh mới: Mã JavaScript
    rating: 4.8,
    students: 3200,
    duration: "12 giờ",
    lessons: 20,
    progress: 30,
    isFavorite: false,
  },
  {
    id: 2,
    title: "Làm quen với Python",
    description:
      "Khóa học nhập môn giúp bạn nắm được cú pháp Python, làm việc với biến, vòng lặp và đọc ghi file cơ bản.",
    lang_id: 2,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80", // Ảnh mới: Mã Python
    rating: 4.6,
    students: 4100,
    duration: "10 giờ",
    lessons: 18,
    progress: 20,
    isFavorite: false,
  },
  {
    id: 3,
    title: "Lập trình C++ cho người mới",
    description:
      "Bắt đầu hành trình với C++: kiểu dữ liệu, cấu trúc điều khiển, và viết chương trình console đầu tiên của bạn.",
    lang_id: 3,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80", // Ảnh mới: Mã C++
    rating: 4.7,
    students: 2100,
    duration: "14 giờ",
    lessons: 22,
    progress: 10,
    isFavorite: false,
  },
  {
    id: 4,
    title: "Java cơ bản cho người mới bắt đầu",
    description:
      "Khám phá cú pháp Java, làm quen với lập trình hướng đối tượng và tạo chương trình nhỏ chạy trên console.",
    lang_id: 4,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80", // Link ảnh Java đã thay thế
    rating: 4.5,
    students: 2800,
    duration: "15 giờ",
    lessons: 25,
    progress: 0,
    isFavorite: false,
  },
  {
    id: 5,
    title: "Nhập môn C# với Visual Studio",
    description:
      "Học cách tạo ứng dụng đầu tiên bằng C#: từ cú pháp cơ bản, vòng lặp, hàm cho đến giao diện đơn giản với Windows Forms.",
    lang_id: 5,
    level: "Cơ bản",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80", // Link ảnh C# đã thay thế
    rating: 4.9,
    students: 3400,
    duration: "16 giờ",
    lessons: 24,
    progress: 40,
    isFavorite: false,
  },
  {
    id: 6,
    title: "JavaScript nâng cao: Xây dựng ứng dụng To-Do",
    description:
      "Học cách thao tác DOM, quản lý sự kiện và lưu dữ liệu với LocalStorage qua dự án To-Do App thực tế.",
    lang_id: 1,
    level: "Trung cấp",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    students: 2700,
    duration: "8 giờ",
    lessons: 16,
    progress: 0,
    isFavorite: false,
  },
  {
    id: 7,
    title: "C++ OOP nâng cao: Kế thừa, Đa hình, Interface",
    description:
      "Hiểu sâu OOP trong C++ với ví dụ thực tế: class, kế thừa, đa hình, virtual function, interface.",
    lang_id: 3,
    level: "Trung cấp",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    students: 1800,
    duration: "18 giờ",
    lessons: 26,
    progress: 0,
    isFavorite: false,
  },
  {
    id: 8,
    title: "Xây dựng Web API với ASP.NET Core",
    description:
      "Học cách xây dựng API, routing, middleware, Entity Framework và JWT cơ bản.",
    lang_id: 5,
    level: "Trung cấp",
    image:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    students: 3900,
    duration: "18 giờ",
    lessons: 24,
    progress: 100,
    isFavorite: false,
  },

  {
    id: 9,
    title: "Giải thuật & Cấu trúc dữ liệu với C++",
    description:
      "Học mảng, danh sách, ngăn xếp, hàng đợi, cây nhị phân và các thuật toán tìm kiếm, sắp xếp.",
    lang_id: 3,
    level: "Trung cấp",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    students: 4600,
    duration: "22 giờ",
    lessons: 29,
    progress: 0,
    isFavorite: false,
  },
];
