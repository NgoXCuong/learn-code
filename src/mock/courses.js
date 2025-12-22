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
    intro: {
      description: [
        "Khóa học JavaScript toàn diện từ cơ bản đến nâng cao được thiết kế đặc biệt cho người mới bắt đầu. Bạn sẽ học tất cả khái niệm nền tảng của JavaScript hiện đại, từ biến và hàm cơ bản đến các tính năng nâng cao như DOM manipulation, event handling, và asynchronous programming.",
        "Yêu cầu đầu vào: Không cần kinh nghiệm lập trình trước đó. Chỉ cần có kiến thức cơ bản về máy tính và mong muốn học hỏi. Khóa học phù hợp cho học sinh, sinh viên, hoặc người muốn chuyển ngành sang lập trình.",
        "Sau khóa học, bạn sẽ có nền tảng vững chắc để tiếp tục học các framework như React, Node.js, và có thể tự tin xây dựng các ứng dụng web động, tương tác với người dùng.",
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      ],
    },
    outcomes: [
      "Nắm vững cú pháp và khái niệm cơ bản của JavaScript.",
      "Hiểu và sử dụng các kiểu dữ liệu, biến, hàm, và scope.",
      "Làm việc thành thạo với DOM để tạo trang web tương tác.",
      "Xử lý sự kiện và tạo hiệu ứng động trên website.",
      "Hiểu khái niệm asynchronous programming với Promises và async/await.",
      "Xây dựng các dự án thực tế như game, ứng dụng todo, và gallery ảnh.",
      "Có nền tảng vững chắc để học React, Node.js và các công nghệ web khác.",
    ],
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
    intro: {
      description: [
        "Khóa học Python toàn diện dành cho người chưa từng biết gì về lập trình. Python là ngôn ngữ phổ biến nhất thế giới hiện nay nhờ cú pháp đơn giản, dễ đọc nhưng cực kỳ mạnh mẽ, được ứng dụng rộng rãi trong AI, Data Science và Web Development.",
        "Yêu cầu đầu vào: Chỉ cần kỹ năng sử dụng máy tính cơ bản. Không yêu cầu kiến thức toán học phức tạp hay kinh nghiệm code trước đó. Khóa học được thiết kế đi từ số 0.",
        "Sau khóa học, bạn sẽ có tư duy lập trình vững chắc, tự viết được các tool tự động hóa công việc, xử lý dữ liệu, và sẵn sàng cho các lộ trình chuyên sâu như Machine Learning hoặc Backend Web (Django/Flask).",
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      ],
    },
    outcomes: [
      "Nắm vững cú pháp cơ bản và tư duy lập trình với Python.",
      "Thành thạo các cấu trúc dữ liệu quan trọng: List, Dictionary, Tuple, Set.",
      "Hiểu và áp dụng các cấu trúc điều khiển: If-Else, Vòng lặp For/While.",
      "Kỹ năng viết Hàm (Functions) và tổ chức code thành các Modules.",
      "Làm việc với File: Đọc/Ghi dữ liệu txt, csv để xử lý thông tin.",
      "Nắm vững nền tảng Lập trình hướng đối tượng (OOP): Class, Object, Kế thừa.",
      "Kỹ năng xử lý lỗi (Try/Except) và Debug chương trình.",
      "Xây dựng được các ứng dụng thực tế như: Máy tính, Game đoán số, Tool quản lý chi tiêu.",
    ],
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
    intro: {
      description: [
        "Khóa học Java cơ bản toàn diện dành cho người mới bắt đầu lập trình. Java là ngôn ngữ lập trình hướng đối tượng mạnh mẽ, được sử dụng rộng rãi trong phát triển ứng dụng doanh nghiệp, Android apps và hệ thống lớn.",
        "Khóa học được thiết kế để bạn hiểu rõ các khái niệm nền tảng của lập trình hướng đối tượng (OOP) thông qua ngôn ngữ Java. Từ việc viết chương trình Hello World đầu tiên đến xây dựng các ứng dụng phức tạp.",
        "Sau khóa học, bạn sẽ có nền tảng vững chắc để học các framework Java như Spring, Hibernate, và phát triển ứng dụng Android với Kotlin.",
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
      ],
    },
    outcomes: [
      "Nắm vững cú pháp cơ bản và khái niệm lập trình với Java.",
      "Hiểu rõ lập trình hướng đối tượng (OOP): Class, Object, kế thừa, đa hình.",
      "Làm việc với các kiểu dữ liệu, biến, toán tử và cấu trúc điều khiển.",
      "Xử lý ngoại lệ (Exception Handling) và quản lý lỗi.",
      "Làm việc với Collections Framework: ArrayList, HashMap, HashSet.",
      "Đọc/ghi file và làm việc với luồng dữ liệu (I/O Streams).",
      "Hiểu về Java Virtual Machine (JVM) và Garbage Collection.",
      "Xây dựng các ứng dụng console và GUI cơ bản.",
    ],
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
    intro: {
      description: [
        "Khóa học C++ nâng cao tập trung vào cấu trúc dữ liệu và thuật toán. C++ là ngôn ngữ lập trình hệ thống mạnh mẽ, cho phép kiểm soát chi tiết về bộ nhớ và hiệu năng.",
        "Khóa học phù hợp cho những ai đã có kiến thức lập trình cơ bản và muốn nâng cao kỹ năng. Bạn sẽ học về con trỏ, quản lý bộ nhớ động, và triển khai các cấu trúc dữ liệu quan trọng.",
        "Kiến thức từ khóa học này sẽ giúp bạn chuẩn bị cho các vị trí lập trình hệ thống, game development, và các ứng dụng đòi hỏi hiệu năng cao.",
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      ],
    },
    outcomes: [
      "Nắm vững lập trình C++ nâng cao và quản lý bộ nhớ.",
      "Hiểu và triển khai các cấu trúc dữ liệu: Array, Linked List, Stack, Queue.",
      "Làm việc với con trỏ và quản lý bộ nhớ động (new/delete).",
      "Triển khai các thuật toán tìm kiếm và sắp xếp cơ bản.",
      "Hiểu về template và lập trình generic trong C++.",
      "Xử lý file và luồng dữ liệu (I/O) nâng cao.",
      "Lập trình hướng đối tượng với C++: Class, Inheritance, Polymorphism.",
      "Xây dựng các ứng dụng console và giải quyết bài toán thực tế.",
    ],
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
    intro: {
      description: [
        "Khóa học C# và .NET toàn diện dành cho người mới bắt đầu. C# là ngôn ngữ lập trình hiện đại của Microsoft, được sử dụng rộng rãi trong phát triển ứng dụng Windows, web, game và mobile.",
        ".NET là nền tảng phát triển phần mềm mạnh mẽ cung cấp hàng nghìn thư viện và công cụ. Khóa học sẽ giúp bạn làm quen với cú pháp C# hiện đại và các tính năng của .NET Framework/Core.",
        "Sau khóa học, bạn sẽ có thể phát triển ứng dụng Windows Forms, ASP.NET web applications, và có nền tảng để học Unity game development.",
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
      ],
    },
    outcomes: [
      "Nắm vững cú pháp cơ bản và khái niệm lập trình với C#.",
      "Hiểu về .NET Framework và Common Language Runtime (CLR).",
      "Làm việc với các kiểu dữ liệu, biến, toán tử và cấu trúc điều khiển.",
      "Lập trình hướng đối tượng: Class, Object, Properties, Methods.",
      "Xử lý ngoại lệ (Exception Handling) và debugging.",
      "Làm việc với Collections và Generic types.",
      "Phát triển ứng dụng Windows Forms cơ bản.",
      "Chuẩn bị nền tảng cho ASP.NET và Unity development.",
    ],
  },
];
