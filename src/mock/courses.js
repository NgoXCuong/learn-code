export const mockLanguages = [
  { id: 2, name: "Python" },
  { id: 3, name: "C++" },
  { id: 4, name: "Java" },
];

// Import images from assets
import pythonImg from "@/assets/python-co-ban.jpg";
import javaImg from "@/assets/java-co-ban.jpg";
import cppImg from "@/assets/cpp-co-ban.jpg";

// Import lessons to count them dynamically
import mockLessons from "./lessons.json";

// Function to count lessons for a course
const getLessonCount = (courseId) => {
  return mockLessons.filter((lesson) => lesson.course_id === courseId).length;
};

// Function to calculate total duration for a course in hours (as number)
const getTotalDurationHours = (courseId) => {
  const courseLessons = mockLessons.filter(
    (lesson) => lesson.course_id === courseId
  );
  const totalMinutes = courseLessons.reduce((total, lesson) => {
    const minutes = parseInt(lesson.readTime.replace(" phút", "")) || 0;
    return total + minutes;
  }, 0);

  return Math.ceil(totalMinutes / 60);
};

export const mockCourses = [
  {
    path_id: 2,
    path_name: "Python Cơ bản",
    description: "Với cú pháp thân thiện, gần gũi với ngôn ngữ tiếng Anh tự nhiên, Python là lựa chọn hoàn hảo số một cho những ai mới bước chân vào thế giới lập trình. Khóa học này không chỉ dừng lại ở việc dạy bạn viết code, mà còn giúp bạn hình thành tư duy giải quyết vấn đề bằng thuật toán cực kỳ hiệu quả. Từ các cấu trúc dữ liệu nền tảng như List, Tuple, Dictionary cho đến việc tự động hóa các tác vụ nhàm chán như đổi tên hàng loạt file, cào dữ liệu web (Web Scraping), gửi email tự động, khóa học sẽ biến bạn thành một người tối ưu hiệu suất công việc thực sự.",
    lang_id: 2,
    difficulty_level: "beginner",
    imageUrl: pythonImg,
    average_rating: 4.9,
    estimated_hours: getTotalDurationHours(2),
    total_lessons_in_path: getLessonCount(2),
    progress_percentage: 30,
    completed_lessons: 0,
    total_sections: 5,
    isFavorite: true,
    intro: {
      description: [
        "Hãy tưởng tượng bạn có thể giải quyết khối lượng công việc thao tác Excel thủ công khổng lồ trong vòng chưa đầy 5 giây chỉ bằng một đoạn mã Python 20 dòng. Đó chính xác là sức mạnh mà khóa học này mang lại. Python hiện nay đang thống trị mọi lĩnh vực: từ Phát triển Web, Công nghệ Trí tuệ Nhân tạo (AI), Phân tích dữ liệu (Data Science) cho tới Tự động hóa.",
        "Lộ trình học tập trải dài hơn 50 bài giảng video chi tiết kết hợp hàng trăm bài tập trắc nghiệm và code thực hành. Bạn sẽ bắt đầu làm quen với môi trường IDE, tìm hiểu kỹ về Memory Management của Python, cách trình thông dịch hoạt động và cách code được chuyển đổi thành mã máy.",
        "Tiếp đó, học viên sẽ được đưa vào các Use Case thực chiến hằng ngày: Viết các script xử lý văn bản, đọc và trích xuất dữ liệu từ các file CSV/JSON khổng lồ, sử dụng thư viện BeautifulSoup / Selenium để crawl tin tức từ các website, và tương tác với API của bên thứ ba.",
        "Khóa học áp dụng nguyên lý 'Viết code Pythonic' - viết mã ngắn gọn, hiệu quả và đẹp mắt theo tiêu chuẩn PEP8. Sau khi lấy được chứng chỉ tốt nghiệp từ khóa này, bạn hoàn toàn có thể sử dụng Python như một công cụ đắc lực hỗ trợ cho công việc chính của mình, bất kể bạn là kế toán, nhân viên marketing, nhà phân tích tài chính hay kỹ sư mạng."
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      ],
    },
    outcomes: [
      "Khởi tạo và thiết lập hoàn chỉnh môi trường phát triển Python chuẩn chỉ (Virtual Environment, PIP, IDE).",
      "Thành thạo toàn bộ các cấu trúc dữ liệu cốt lõi: String, List, Tuple, Set, Dictionary và biết cách sử dụng chúng tối ưu về mặt Big O.",
      "Viết các thuật toán xử lý dữ liệu với vòng lặp, biểu thức điều kiện tuần tự phức tạp.",
      "Khám phá sức mạnh của List Comprehension và các hàm cao cấp như map(), filter(), reduce().",
      "Giao tiếp trực tiếp với hệ điều hành: tự động đọc, ghi, di chuyển và xóa hàng trăm thư mục/file trong chớp mắt.",
      "Biết cách bẫy lỗi (Try/Except/Finally) để ứng dụng không bao giờ bị Crash giữa chừng.",
      "Kéo và cào (Scrape) dữ liệu thị trường từ Internet và lưu chúng vào cơ sở dữ liệu hoặc xuất ra Excel.",
      "Hiểu sâu về Lập trình hướng đối tượng trong Python: Magic Methods, Đa kế thừa (Multiple Inheritance), Tính bao đóng (Encapsulation).",
      "Xây dựng thành công 3 dự án lớn: Bot Telegram tự động, Trình quản lý chi tiêu cá nhân giao diện console, và Hệ thống crawl giá chứng khoán.",
      "Sẵn sàng nền tảng để học tiếp các framework chuyên sâu như Django/Flask (Web) hoặc Pandas/TensorFlow (AI/Data)."
    ],
  },
  {
    path_id: 3,
    path_name: "Java Cơ bản",
    description: "Java vẫn giữ vị thế là ngôn ngữ thống trị ở phần mềm cấp doanh nghiệp lớn (Enterprise) nhờ tính bảo mật cực cao, hiệu năng ổn định và nguyên lý Khai báo rõ ràng. Trong khóa học dài hơi này, chúng tôi mang tới một bộ giáo trình toàn diện kết hợp giữa nguyên lý Lập trình hướng đối tượng (OOP) kinh điển và cách tiếp cận Java ở thực tế. Bạn sẽ được mổ xẻ tận gốc rễ cách Java Virtual Machine (JVM) quản lý bộ nhớ, nguyên lý hoạt động của Garbage Collector, đa luồng (Multithreading) và làm thế nào để xây dựng các ứng dụng có khả năng chịu tải hàng triệu Request.",
    lang_id: 4,
    difficulty_level: "beginner",
    imageUrl: javaImg,
    average_rating: 4.7,
    estimated_hours: getTotalDurationHours(3),
    total_lessons_in_path: getLessonCount(3),
    progress_percentage: 100,
    completed_lessons: 25,
    total_sections: 8,
    isFavorite: false,
    intro: {
      description: [
        "Với triết lý 'Write Once, Run Anywhere', Java đã định hình cách thế giới công nghệ vận hành trong suốt 3 thập kỷ. Khóa học này không đơn thuần chỉ hướng dẫn bạn viết cú pháp Java, mà nó thay đổi tư duy của bạn, biến bạn thành một Software Engineer có tầm nhìn thiết kế hệ thống vững chắc.",
        "Chúng tôi đặc biệt nhấn mạnh vào 4 tính chất của OOP (Đóng gói, Kế thừa, Đa hình, Trừu tượng) cùng thiết kế SOLID - bộ tiêu chuẩn bất thành văn của các kỹ sư chuyên nghiệp. Các kiến thức này không chỉ áp dụng riêng cho Java mà còn hữu ích cho bất kỳ ngôn ngữ hướng đối tượng nào khác như C# hay C++.",
        "Chương trình đào tạo trải dài qua các kỹ thuật then chốt: Quản lý biến kiểu nguyên thủy và kiểu tham chiếu (Primitive vs Reference Arrays), Xử lý lỗi hệ thống ngoại lệ (Exceptions), Vận hành File IO khổng lồ, Hệ thống Collections (List, Map, Set) tinh vi và Generic Programming.",
        "Đây là hành trình tương đối khốc liệt với khối lượng kiến thức đồ sộ. Tuy nhiên, một khi đã vượt qua được những rào cản nền tảng này, bạn sẽ cực kỳ tự tin ứng tuyển vào các tập đoàn lớn, các ngân hàng và tham gia xây dựng hệ thống Core Banking, hệ thống Ecommerce quy mô cực khủng."
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
      ],
    },
    outcomes: [
      "Thấu hiểu rõ ràng về cấu trúc bộ nhớ của Java: Stack, Heap và cơ chế Garbage Collection siêu việt.",
      "Thiết kế cấu trúc Class và Object chuyên nghiệp, sử dụng thành tạo các Access Modifiers (public, private, protected).",
      "Áp dụng triệt để 4 tính chất OOP để thiết kế hệ thống dễ bảo trì, dễ mở rộng và chống lại các lỗi tiềm ẩn.",
      "Biết cách làm việc sâu với Chuỗi (String, StringBuilder, StringBuffer) tối ưu hiệu năng bộ nhớ.",
      "Triển khai Collections Framework (ArrayList, LinkedList, HashMap, HashSet) linh hoạt tùy từng cấu trúc bảo toàn dữ liệu.",
      "Quản trị và ném ra các Exception do chính bạn tùy biến (Custom Exceptions) để kiểm soát các luồng nghiệp vụ kinh doanh khác nhau.",
      "Làm việc với cấu trúc dữ liệu đa luồng (Threads, Runnable, Concurrency API) cho ứng dụng thời gian thực.",
      "Sử dụng kỹ thuật Java 8+: Lambda Expressions, Stream API để xử lý mảng lượng lớn dữ liệu rất nhanh chóng.",
      "Triển khai mô hình làm việc Generic Type nhằm tái sử dụng mã nguồn tối đa.",
      "Xây dựng project Cuối Khóa: Phần mềm Quản lý nhân sự Doanh nghiệp sử dụng Java thuần kết hợp File System IO."
    ],
  },
  {
    path_id: 5,
    path_name: "C++ Cơ bản",
    description: "Khi hiệu năng (Performance) là yếu tố sống còn, C++ luôn là bức tường thành vững chắc không thể thay thế. Khóa học này đập tan đi sự sợ hãi của học viên đối với Con trỏ (Pointers) và Cấp phát vùng nhớ động (Dynamic memory allocation). Chúng tôi sẽ lặn sâu xuống cấp độ phần cứng máy tính, chỉ ra cho bạn thấy bộ nhớ RAM được cấp phát ra sao, và tại sao một cấu trúc thuật toán kém có thể làm Crash phần mềm game AAA của bạn. Hàng loạt cấu trúc dữ liệu cốt lõi như Bảng Băm (Hash Table), Danh sách liên kết (Linked List), Cây nhị phân (Binary Tree) và Đồ thị (Graph) sẽ được triển khai bằng tay 100% bằng C++.",
    lang_id: 3,
    difficulty_level: "beginner",
    imageUrl: cppImg,
    average_rating: 4.8,
    estimated_hours: getTotalDurationHours(5),
    total_lessons_in_path: getLessonCount(5),
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 6,
    isFavorite: true,
    intro: {
      description: [
        "Chào mừng bạn đến với thế giới của những kỹ sư cấp thấp (Low-level Engineering) - nơi mà mọi dòng mã đều hướng đến một mục tiêu duy nhất: Tốc độ xử lý siêu việt. C++ là ngôn ngữ đứng đằng sau nhân điều hành Windows, hệ máy game Unreal Engine, phần mềm Adobe hay hệ thống giao dịch chứng khoán tần suất cao (HFT).",
        "Khóa học C++ được sinh ra để nâng tầm não bộ logic của bạn. Chúng tôi không dạy bạn các framework hào nhoáng, chúng tôi dạy bạn khoa học máy tính chân chính (Computer Science). Bắt đầu với những kiến thức cơ bản về quy trình biên dịch (Compile Process), bạn sẽ nhanh chóng tiến sâu vào thế giới bóng tối của con trỏ (Pointers), tham chiếu (References) và rò rỉ bộ nhớ (Memory Leaks).",
        "Tiếp theo, bạn sẽ tự xây dựng các cấu trúc dữ liệu nền tảng từ con số không, thay vì phụ thuộc vào thư viện chuẩn (STL). Việc tự tay code một Stack, một Priority Queue, hay một thuật toán Dijkstra sẽ đem lại một khoảnh khắc 'À há!' cực kỳ lớn về mặt nhận thức tư duy.",
        "Đây không phải là khóa học dễ dàng, và bạn sẽ làm bạn thân với Segmentation Fault. Nhưng sau khi làm chủ được nó, mọi ngôn ngữ khác trong ngành Công nghệ Thông tin (Java, Python, JS, C#) đối với bạn đều chỉ là một chuyến đi dạo trong công viên."
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      ],
    },
    outcomes: [
      "Quản lý bộ nhớ hoàn chỉnh bằng tay với kỹ thuật cấp phát/giải phóng bộ nhớ động mới trên Heap bằng new/delete.",
      "Làm chủ khái niệm Con trỏ, Con trỏ hàm, Mảng đa chiều cấp phát động và Thao tác Bitwise cực kỳ tối ưu.",
      "Đánh giá chi tiết Độ phức tạp thuật toán (Time & Space Complexity) qua khái niệm Big-O Notation chuyên sâu.",
      "Tự thiết kế Struct/Class và các toán tử nạp chồng (Operator Overloading) hoàn chỉnh mang tính riêng biệt.",
      "Triển khai bằng tay Cấu trúc dữ liệu tuyến tính: Mảng động (Dynamic Array), Danh sách liên kết đơn (Singly Linked List), Stack, Queue.",
      "Làm chủ Cấu trúc dữ liệu phi tuyến tính: Cây nhị phân tìm kiếm (BST), Bảng băm (Hash Tables), và Heaps.",
      "Hiện thực hóa các chiến lược giải thuật nâng cao: Chia để trị, Quy hoạch động, Thuật toán tham lam (Greedy).",
      "Tiếp cận Thư viện mẫu chuẩn (STL) của C++ (vector, map, iterator) hiểu cốt lõi thay vì dùng mù quáng.",
      "Tối ưu hóa khả năng fix bug Segmentation code với GDB và Valgrind trên hệ thống nhân Linux.",
      "Đủ năng lực chiến thắng mọi vòng phỏng vấn Coding Interview tại các tập đoàn công nghệ lớn dạng FAANG."
    ],
  },
  {
    path_id: 6,
    path_name: "Python Siêu cấp: Xây dựng ứng dụng chuyên nghiệp",
    description: "Vượt qua giới hạn cơ bản để viết mã nguồn Python chuẩn mực như những chuyên gia hàng đầu tại Google, Meta. Học cách tối ưu hiệu năng và xử lý dữ liệu lớn.",
    lang_id: 2,
    difficulty_level: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    average_rating: 4.8,
    estimated_hours: 15,
    total_lessons_in_path: 20,
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 6,
    isFavorite: false,
    intro: {
      description: ["Biến những dòng code Python của bạn trở nên ngắn gọn, tinh tế và cực kỳ hiệu quả."],
      techIcons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"],
    },
    outcomes: ["Thành thạo lập trình đa luồng và bất đồng bộ", "Xây dựng các thư viện Python chuyên nghiệp"],
  },
  {
    path_id: 7,
    path_name: "Làm Web thực tế với Java Spring Boot",
    description: "Học cách tự tay xây dựng hệ thống website bán hàng, mạng xã hội quy mô lớn từ con số 0. Java Spring Boot là công cụ mạnh mẽ nhất để làm việc này.",
    lang_id: 4,
    difficulty_level: "intermediate",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    average_rating: 4.9,
    estimated_hours: 25,
    total_lessons_in_path: 35,
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 10,
    isFavorite: false,
    intro: {
      description: ["Trở thành kỹ sư Backend chuyên nghiệp với Framework Java phổ biến nhất hiện nay."],
      techIcons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"],
    },
    outcomes: ["Xây dựng RESTful API chuẩn chỉnh", "Tích hợp cơ sở dữ liệu với JPA/Hibernate"],
  },
  {
    path_id: 8,
    path_name: "Tạo Game 3D đỉnh cao với C++ & Unreal",
    description: "Biến niềm đam mê chơi game thành nghề nghiệp. Tự tay code logic cho nhân vật, hiệu ứng vật lý và không gian 3D sống động với Unreal Engine - engine game hàng đầu thế giới.",
    lang_id: 3,
    difficulty_level: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    average_rating: 4.9,
    estimated_hours: 40,
    total_lessons_in_path: 50,
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 12,
    isFavorite: false,
    intro: {
      description: ["Khám phá bí mật đằng sau những siêu phẩm game AAA và tự tay hiện thực hóa ý tưởng của bạn."],
      techIcons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"],
    },
    outcomes: ["Làm chủ Unreal Engine C++ API", "Tối ưu hóa hiệu năng đồ họa và vật lý"],
  },
  {
    path_id: 9,
    path_name: "Phân tích dữ liệu & Vẽ biểu đồ với Python",
    description: "Biến những con số khô khan thành hình ảnh và kiến thức giá trị. Học cách dùng Python để khám phá kho báu ẩn sau các bảng dữ liệu khổng lồ.",
    lang_id: 2,
    difficulty_level: "intermediate",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bbbda50a5f4e?auto=format&fit=crop&q=80&w=800",
    average_rating: 4.7,
    estimated_hours: 20,
    total_lessons_in_path: 25,
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 8,
    isFavorite: false,
    intro: {
      description: ["Làm chủ bộ kỹ năng 'Hot' nhất hiện nay: Xử lý dữ liệu và trình bày báo cáo trực quan."],
      techIcons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"],
    },
    outcomes: ["Phân tích tập dữ liệu lớn", "Trực quan hóa dữ liệu phức tạp"],
  },
  {
    path_id: 10,
    path_name: "Tối ưu hóa: Giúp phần mềm Java chạy xé gió",
    description: "Tại sao phần mềm lại chậm? Học cách chuẩn đoán và tăng tốc mã nguồn Java của bạn lên mức tối đa. Dành cho những ai muốn xây dựng hệ thống quy mô lớn và tốc độ cao.",
    lang_id: 4,
    difficulty_level: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    average_rating: 4.8,
    estimated_hours: 30,
    total_lessons_in_path: 15,
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 5,
    isFavorite: false,
    intro: {
      description: ["Bí quyết giúp ứng dụng Java của bạn xử lý hàng triệu request mỗi giây mà vẫn mượt mà."],
      techIcons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"],
    },
    outcomes: ["Làm chủ kỹ thuật profiling và debugging cấp thấp", "Tối ưu hóa Garbage Collector"],
  },
  {
    path_id: 11,
    path_name: "C++ Hiện đại: Những kỹ thuật mới nhất",
    description: "Cập nhật những tính năng 'xịn xò' của C++ phiên bản mới nhất. Viết code ngắn gọn hơn, an toàn hơn và khai thác tối đa sức mạnh phần cứng hiện đại.",
    lang_id: 3,
    difficulty_level: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    average_rating: 5.0,
    estimated_hours: 20,
    total_lessons_in_path: 18,
    progress_percentage: 0,
    completed_lessons: 0,
    total_sections: 6,
    isFavorite: true,
    intro: {
      description: ["Bắt kịp xu hướng phát triển C++ hiện đại để không bị tụt hậu trong giới lập trình hệ thống."],
      techIcons: ["https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"],
    },
    outcomes: ["Sử dụng thành thạo C++ Concepts và Ranges", "Triển khai Coroutines cho các tác vụ hiệu năng cao"],
  },
];
