export const mockLanguages = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Python" },
  { id: 3, name: "C++" },
  { id: 4, name: "Java" },
  { id: 5, name: "C#" },
];

// Import lessons to count them dynamically
import mockLessons from "./lessons.json";

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
    title: "Bắt đầu với JavaScript Front-End",
    description: "Khóa học Bắt đầu với JavaScript mang đến cho bạn cơ hội làm chủ ngôn ngữ lập trình phổ biến nhất toàn cầu. Từ những dòng lệnh đầu tiên đến việc xây dựng toàn bộ ứng dụng web tương tác phức tạp, khóa học sẽ dẫn dắt bạn qua những khái niệm cốt lõi nhất. Bạn sẽ không chỉ học về cú pháp, mà còn tìm hiểu tận gốc rễ cách JavaScript tương tác với trình duyệt thông qua DOM (Document Object Model), kiến trúc Event Loop và xử lý bất đồng bộ. Hệ thống bài tập dày đặc kết hợp các project thực tế sẽ giúp bạn biến lý thuyết thành những dòng code chạy mượt mà trên ứng dụng thực tiễn.",
    lang_id: 1,
    level: "Cơ bản",
    image: "https://files.fullstack.edu.vn/f8-prod/courses/1.png",
    rating: 4.9,
    duration: getTotalDuration(1),
    lessons: getLessonCount(1),
    progress: 15,
    isFavorite: true,
    intro: {
      description: [
        "Khóa học JavaScript toàn diện này được chúng tôi thiết kế cực kỳ tỉ mỉ trong hơn 6 tháng, dành riêng cho những ai muốn theo đuổi cấu trúc Web Development hiện đại. JavaScript hiện tại không chỉ đơn thuần là ngôn ngữ tạo hiệu ứng trên website như 10 năm trước, mà nó đã trở thành xương sống của Frontend (với React, Vue, Angular) lẫn Backend (với Node.js).",
        "Chúng tôi sẽ đi từ những khái niệm hết sức cơ bản như Biến (Variables), Kiểu dữ liệu (Data Types), Vòng lặp (Loops), cho tới những kiến thức nâng cao thường gây bối rối cho người học như Closures, Hoisting, Promises, và Async/Await. Mỗi một khái niệm đều được minh họa thông qua sơ đồ tư duy (mindmaps) và hàng chục ví dụ thực chiến trên trình duyệt.",
        "Điểm đặc biệt của khóa học là phương pháp 'Learning by Doing'. Ở mỗi chương, thay vì chỉ nghe lý thuyết, bạn sẽ phải tự cấu trúc mã nguồn để giải quyết các Challenge thực tế như: Tạo To-do list tương tác kéo thả, xây dựng máy tính bỏ túi (Calculator), phát triển ứng dụng thời tiết gọi API từ OpenWeatherMap, và làm một trang E-commerce nhỏ có chức năng giỏ hàng.",
        "Yêu cầu đầu vào gần như bằng 0. Chúng tôi chỉ cần bạn chuẩn bị một chiếc máy tính có kết nối mạng, trình duyệt Google Chrome và sẵn sàng tinh thần học hỏi liên tục. Nếu bạn là sinh viên trái ngành, lập trình viên muốn chuyển từ hệ ngôn ngữ khác sang JavaScript, hay học sinh cấp 3 đam mê lập trình, đây chính xác là nấc thang đầu tiên dành cho bạn."
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      ],
    },
    outcomes: [
      "Hiểu tường tận quá trình hình thành của JavaScript và kiến trúc hoạt động của V8 Engine.",
      "Làm chủ hoàn toàn cú pháp ES6+ (Arrow function, Destructuring, Spread/Rest operators).",
      "Sử dụng thành thạo các cấu trúc dữ liệu cơ sở: Array, Object, Set, Map để lưu trữ và vận hành dữ liệu phi tuyến tính.",
      "Thao tác trực tiếp với DOM API (Document Object Model) để thay đổi giao diện trang web mà không cần reload.",
      "Sở hữu tư duy xử lý bất đồng bộ mượt mà bằng Callbacks, Promises chuẩn và cú pháp Async/Await hiện đại.",
      "Làm chủ cách trình duyệt giao tiếp với Server qua Fetch API / Axios và hiểu sâu về HTTP Requests (GET, POST, PUT, DELETE).",
      "Tự tay xây dựng được 5 ứng dụng web hoàn chỉnh có thể đưa ngay vào Portfolio xin việc.",
      "Trang bị nền tảng Object Oriented Programming (OOP) và Functional Programming ngay trong JavaScript.",
      "Có tư duy sửa lỗi (Debugging) sắc bén thông qua Chrome DevTools.",
      "Sẵn sàng 100% nền tảng để bước sang học hệ sinh thái ReactJS, VueJS hoặc NodeJS."
    ],
  },
  {
    id: 2,
    title: "Python 3 & Tự Động Hóa",
    description: "Với cú pháp thân thiện, gần gũi với ngôn ngữ tiếng Anh tự nhiên, Python là lựa chọn hoàn hảo số một cho những ai mới bước chân vào thế giới lập trình. Khóa học này không chỉ dừng lại ở việc dạy bạn viết code, mà còn giúp bạn hình thành tư duy giải quyết vấn đề bằng thuật toán cực kỳ hiệu quả. Từ các cấu trúc dữ liệu nền tảng như List, Tuple, Dictionary cho đến việc tự động hóa các tác vụ nhàm chán như đổi tên hàng loạt file, cào dữ liệu web (Web Scraping), gửi email tự động, khóa học sẽ biến bạn thành một người tối ưu hiệu suất công việc thực sự.",
    lang_id: 2,
    level: "Cơ bản",
    image: "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/python-co-ban_b80bca9b238b4615b94541de28af00ae.png",
    rating: 4.9,
    duration: getTotalDuration(2),
    lessons: getLessonCount(2),
    progress: 30,
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
    id: 3,
    title: "Lập trình Java Doanh nghiệp",
    description: "Java vẫn giữ vị thế là ngôn ngữ thống trị ở phần mềm cấp doanh nghiệp lớn (Enterprise) nhờ tính bảo mật cực cao, hiệu năng ổn định và nguyên lý Khai báo rõ ràng. Trong khóa học dài hơi này, chúng tôi mang tới một bộ giáo trình toàn diện kết hợp giữa nguyên lý Lập trình hướng đối tượng (OOP) kinh điển và cách tiếp cận Java ở thực tế. Bạn sẽ được mổ xẻ tận gốc rễ cách Java Virtual Machine (JVM) quản lý bộ nhớ, nguyên lý hoạt động của Garbage Collector, đa luồng (Multithreading) và làm thế nào để xây dựng các ứng dụng có khả năng chịu tải hàng triệu Request.",
    lang_id: 4,
    level: "Cơ bản",
    image: "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/java-cho-nguoi-moi-bat-dau_9a1c4247a23441d9874bb3caca9ea497.png",
    rating: 4.7,
    duration: getTotalDuration(3),
    lessons: getLessonCount(3),
    progress: 100,
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
    id: 5,
    title: "C++ Chuyên Sâu Cấu Trúc Dữ Liệu",
    description: "Khi hiệu năng (Performance) là yếu tố sống còn, C++ luôn là bức tường thành vững chắc không thể thay thế. Khóa học này đập tan đi sự sợ hãi của học viên đối với Con trỏ (Pointers) và Cấp phát vùng nhớ động (Dynamic memory allocation). Chúng tôi sẽ lặn sâu xuống cấp độ phần cứng máy tính, chỉ ra cho bạn thấy bộ nhớ RAM được cấp phát ra sao, và tại sao một cấu trúc thuật toán kém có thể làm Crash phần mềm game AAA của bạn. Hàng loạt cấu trúc dữ liệu cốt lõi như Bảng Băm (Hash Table), Danh sách liên kết (Linked List), Cây nhị phân (Binary Tree) và Đồ thị (Graph) sẽ được triển khai bằng tay 100% bằng C++.",
    lang_id: 3,
    level: "Trung bình",
    image: "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/thuat-toan-co-ban-cho-hoc-sinh_90c8311268d0425495915a7c125a1c91.jpg",
    rating: 4.8,
    duration: getTotalDuration(4),
    lessons: getLessonCount(4),
    progress: 10,
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
    id: 6,
    title: "Lập trình C# & Hệ sinh thái .NET",
    description: "Bước chân vào thế giới khổng lồ đầy uy lực của Microsoft bằng C#. Được thiết kế đặc biệt kết hợp sức mạnh của C++ và nét quyến rũ mềm mại của Java, C# sở hữu một hệ sinh thái cực kì chặt chẽ là .NET Framework và .NET Core (nay là .NET 8, 9). Khóa học vạch ra một lộ trình trơn tru tuyệt đối, đẩy bạn từ những cú pháp nền cứng như struct, enum, record cho tới việc viết những truy vấn dữ liệu LINQ ma thuật, xử lý bất đồng bộ Async/Task mạnh mẽ, và khả năng xây dựng ứng dụng đa nền tảng không giới hạn từ Desktop Winform, Backend API đến ứng dụng Mobile.",
    lang_id: 5,
    level: "Cơ bản",
    image: "https://s3-hfx03.fptcloud.com/codelearnstorage/files/thumbnails/csharp-co-ban_96ca03bee27f454eb1f1c86e1fc5ef74.png",
    rating: 4.6,
    duration: getTotalDuration(5),
    lessons: getLessonCount(5),
    progress: 100,
    isFavorite: false,
    intro: {
      description: [
        "Hệ sinh thái .NET của Microsoft đang phát triển nhanh chưa từng thấy nhờ việc chuyển hướng sang mã nguồn mở tuyệt đối và kiến trúc cross-platform. Bằng việc chọn C#, bạn không chỉ học một ngôn ngữ, bạn đang chọn một tấm vé vạn năng mở khóa toàn bộ các ngành mũi nhọn của ngành phần mềm.",
        "Khóa học C# cơ bản này giúp bạn đi những bước đầu tiên cực kỳ vững chãi. Đi từ nền tảng ngôn ngữ mạnh về kiểu dữ liệu (Strongly typed language), bạn sẽ hiểu rõ thế nào là Value Types, Reference Types và cơ chế hoạt động của CLR (Common Language Runtime).",
        "Điểm sáng vĩ đại nhất của C# mà chúng tôi sẽ nhấn mạnh là LINQ (Language Integrated Query) - tính năng độc quyền cho phép bạn xử lý Data Collection sướng, gọn và an toàn chưa từng thấy so với bất kì ngôn ngữ đối thủ nào. Thêm vào đó, chúng tôi cũng đào sâu vào cơ chế Events, Delegates - nền tảng thiết yếu để bạn sau này có thể làm Game bằng Unity Engine.",
        "Bạn sẽ được thực hành lập trình trực tiếp bằng Visual Studio (hoặc Rider), trải nghiệm bộ công cụ lập trình mạnh mẽ nhất hành tinh với khả năng cảnh báo lỗi thời gian thực, gợi ý IntelliSense xuất sắc, giúp quy trình học tập trở nên thật trôi chảy và hiệu quả tối đa."
      ],
      techIcons: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
      ],
    },
    outcomes: [
      "Khởi tạo dự án và quen thuộc tay nghề với quy trình làm việc trên Visual Studio cấp độ doanh nghiệp.",
      "Làm chủ hoàn chỉnh cú pháp dòng lệnh C# hiện đại, hiểu sâu Type System và Type Casting an toàn.",
      "Vận dụng xuất sắc nguyên lý Lập trình hướng đối tượng OOP và áp dụng tốt với class, interface, abstract class, record.",
      "Hiểu rõ chu trình biên dịch C# thành mã trung gian IL, sự can thiệp của JIT Compiler và bộ thu gom rác CLR.",
      "Viết mã nguồn ngắn gọn kinh ngạc để thao tác với Collections nhờ biểu thức Lambda và sức mạnh tuyệt hảo của hệ thống LINQ.",
      "Khai thác khả năng đa luồng bằng mô hình Task Parallel Library (TPL) cùng các từ khóa async và await mới nhất.",
      "Thiết kế cấu trúc Pattern Event-Delegate chuyên sâu phục vụ cho phát triển ứng dụng UI hoặc cấu trúc game engine.",
      "Ứng dụng Entity Format căn bản để cấu trúc lớp tương tác với hệ thống hệ CSDL sau này.",
      "Thực hiện thành thạo Unit Test cơ bản trên C# để đảm bảo chất lượng dòng lệnh (NUnit, xUnit).",
      "Góp phần tạo ra 3 dự án Windows console có độ khó cực cao quản lý cơ sở dữ liệu học sinh với tính năng ghi đọc file xuất dạng JSON."
    ],
  },
];
