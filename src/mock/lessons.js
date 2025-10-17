export const mockLessons = [
  // === 📘 JavaScript từ Cơ bản đến Nâng cao ===
  {
    id: 1,
    course_id: 1,
    title: "Giới thiệu về JavaScript",
    content: `
JavaScript là ngôn ngữ lập trình phổ biến trên web, được sử dụng để tạo ra các trang web động, tương tác với người dùng và xử lý dữ liệu. Nó có thể chạy trực tiếp trên trình duyệt hoặc trên server (Node.js).

Vai trò của JavaScript trong lập trình web:
- Thêm tương tác cho HTML/CSS: các hiệu ứng động, validate form.
- Giao tiếp với server: fetch dữ liệu từ API.
- Xây dựng ứng dụng web phức tạp: SPA, PWA.
- Sử dụng trong phát triển backend với Node.js hoặc trong phát triển mobile với React Native.

Cách nhúng JavaScript vào HTML:
1. Dùng thẻ <script> trực tiếp trong HTML.
2. Nhúng file JS bên ngoài với <script src="file.js"></script>.
3. Chạy mã khi trang đã load bằng window.onload hoặc DOMContentLoaded.
    `,
    example_code: `<!-- Nhúng trực tiếp -->
<!DOCTYPE html>
<html>
<head>
  <title>Demo JS</title>
</head>
<body>
  <h1>Hello World</h1>
  <script>
    console.log("JavaScript đã chạy!");
    alert("Chào mừng bạn đến với JS!");
  </script>
</body>
</html>

<!-- Nhúng file JS ngoài -->
<script src="app.js"></script>`,
    language: "html",
    readTime: "10 phút",
    questionCount: 5,
    difficulty: "Cơ bản",
    students: 1300,
    status: "completed",
    progress: 100,
  },
  {
    id: 2,
    course_id: 1,
    title: "Biến và Kiểu dữ liệu",
    content: `
Trong JavaScript, biến được dùng để lưu trữ dữ liệu. Có 3 cách khai báo biến chính:
- **var**: khai báo biến phạm vi function, có thể bị hoisting.
- **let**: khai báo biến phạm vi block, có thể thay đổi giá trị.
- **const**: khai báo hằng số, không thể thay đổi giá trị sau khi gán.

Các kiểu dữ liệu cơ bản:
- **Number**: số, ví dụ 10, 3.14
- **String**: chuỗi, ví dụ "Hello World"
- **Boolean**: true / false
- **Undefined**: biến chưa được gán giá trị
- **Null**: giá trị rỗng
- **Object**: đối tượng
- **Array**: mảng
- **Symbol**: giá trị duy nhất
- **BigInt**: số lớn vượt quá Number
    `,
    example_code: `// Khai báo biến
var age = 25;           // biến có phạm vi function
let name = "Nguyen";    // biến có phạm vi block
const PI = 3.14;        // hằng số

// Kiểu dữ liệu
let isStudent = true;   // Boolean
let score;              // Undefined
let person = { name: "An", age: 20 }; // Object
let colors = ["red", "green", "blue"]; // Array

console.log(age, name, PI);
console.log(isStudent, score, person, colors);`,
    language: "javascript",
    readTime: "15 phút",
    questionCount: 8,
    difficulty: "Cơ bản",
    students: 1100,
    status: "in_progress",
    progress: 40,
  },
  {
    id: 3,
    course_id: 1,
    title: "Hàm và Scope",
    content: `
Khám phá cách tạo hàm, tham số, return value và phạm vi biến trong JavaScript.

- **Hàm**: sử dụng để tái sử dụng mã.
- **Tham số**: truyền dữ liệu vào hàm.
- **Return**: trả về kết quả từ hàm.
- **Scope**: phạm vi truy cập biến (global, local, block).
- **Closure**: hàm con có thể truy cập biến của hàm cha.
    `,
    example_code: `// Hàm đơn giản
function sum(a, b) {
  return a + b;
}

// Closure
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(sum(3,4));  // 7`,
    language: "javascript",
    readTime: "18 phút",
    questionCount: 10,
    difficulty: "Trung bình",
    students: 950,
    status: "not_started",
    progress: 0,
  },
  {
    id: 4,
    course_id: 1,
    title: "DOM Manipulation cơ bản",
    content: `
Học cách truy cập và thay đổi nội dung HTML bằng JavaScript, xử lý sự kiện và tạo hiệu ứng đơn giản.

- **getElementById / querySelector**: chọn phần tử HTML.
- **innerHTML / textContent**: thay đổi nội dung.
- **addEventListener**: gắn sự kiện như click, input.
- **classList**: thêm, xóa, toggle class cho phần tử.
    `,
    example_code: `// Thay đổi nội dung
const title = document.getElementById("title");
title.textContent = "Chào mừng!";

// Xử lý sự kiện
const btn = document.querySelector("#btnClick");
btn.addEventListener("click", () => {
  alert("Bạn đã nhấn nút!");
});

// Thêm class
title.classList.add("text-red-500");`,
    language: "javascript",
    readTime: "20 phút",
    questionCount: 12,
    difficulty: "Trung bình",
    students: 820,
    status: "not_started",
    progress: 0,
  },

  // === 🐍 Python cho Người Mới Bắt Đầu ===
  {
    id: 5,
    course_id: 2,
    title: "Làm quen với Python",
    content: `
Python là ngôn ngữ lập trình dễ học, được sử dụng rộng rãi trong web, data science, AI, và tự động hóa.

Các bước cơ bản để bắt đầu:
1. Cài đặt Python từ python.org.
2. Sử dụng môi trường IDE: IDLE, VS Code hoặc PyCharm.
3. Chạy chương trình bằng cách:
   - Trực tiếp trong IDLE.
   - Terminal: python filename.py
4. Cú pháp cơ bản: print(), comment bằng #, indent (thụt lề) quan trọng.
    `,
    example_code: `# In ra màn hình
print("Hello Python!")

# Biến và comment
age = 25  # Tuổi
name = "An"
print(name, age)`,
    language: "python",
    readTime: "10 phút",
    questionCount: 5,
    difficulty: "Cơ bản",
    students: 1220,
    status: "completed",
    progress: 40,
  },
  {
    id: 6,
    course_id: 2,
    title: "Biến, Kiểu dữ liệu và Toán tử",
    content: `
Python có các kiểu dữ liệu cơ bản:
- **int**: số nguyên
- **float**: số thực
- **str**: chuỗi
- **bool**: True / False
- **list**: danh sách
- **tuple**: bộ giá trị cố định
- **dict**: từ điển key-value

Toán tử cơ bản:
- Số học: +, -, *, /, %, **, //
- So sánh: ==, !=, >, <, >=, <=
- Logic: and, or, not
    `,
    example_code: `# Khai báo biến
age = 20
name = "Binh"
is_student = True

# List và Tuple
fruits = ["apple", "banana", "cherry"]
coordinates = (10, 20)

# Toán tử
x = 10
y = 3
print(x + y, x ** y, x // y)  # 13 1000 3`,
    language: "python",
    readTime: "15 phút",
    questionCount: 7,
    difficulty: "Cơ bản",
    students: 1000,
    status: "in_progress",
    progress: 40,
  },
  {
    id: 7,
    course_id: 2,
    title: "Cấu trúc điều kiện",
    content: `
Cấu trúc điều kiện giúp chương trình đưa ra quyết định:

- **if**: thực hiện khi điều kiện đúng
- **elif**: kiểm tra thêm các điều kiện khác
- **else**: thực hiện khi tất cả điều kiện sai
- Python yêu cầu **indent (thụt lề)** đúng để xác định khối lệnh.
    `,
    example_code: `x = 10
if x > 0:
    print("Dương")
elif x == 0:
    print("Bằng 0")
else:
    print("Âm")`,
    language: "python",
    readTime: "12 phút",
    questionCount: 8,
    difficulty: "Cơ bản",
    students: 900,
    status: "not_started",
    progress: 0,
  },
  {
    id: 8,
    course_id: 2,
    title: "Vòng lặp for và while",
    content: `
Vòng lặp giúp thực hiện lặp đi lặp lại một khối lệnh.

- **for**: lặp qua danh sách, tuple, chuỗi hoặc range().
- **while**: lặp khi điều kiện còn True.
- Có thể dùng **break** để thoát vòng lặp và **continue** để bỏ qua lần lặp hiện tại.
    `,
    example_code: `# For loop
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# While loop
count = 0
while count < 5:
    print(count)
    count += 1`,
    language: "python",
    readTime: "15 phút",
    questionCount: 10,
    difficulty: "Trung bình",
    students: 850,
    status: "not_started",
    progress: 0,
  },

  // === 💻 Lập trình C++ Hiệu Quả ===
  {
    id: 9,
    course_id: 3,
    title: "Cấu trúc cơ bản của chương trình C++",
    content: `
Trong C++, mọi chương trình bắt đầu từ hàm main(). Cú pháp cơ bản gồm:
- Thư viện cần include
- Hàm main() trả về int
- Câu lệnh cout/cin

Ví dụ chương trình "Hello World":
`,
    example_code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!" << endl;
    return 0;
}`,
    language: "cpp",
    readTime: "10 phút",
    questionCount: 5,
    difficulty: "Cơ bản",
    students: 780,
    status: "completed",
    progress: 100,
  },
  {
    id: 10,
    course_id: 3,
    title: "Biến, Kiểu dữ liệu và Toán tử trong C++",
    content: `
Trong C++, biến dùng để lưu trữ dữ liệu. Kiểu dữ liệu cơ bản:
- int, float, double, char, bool
- Toán tử số học: +, -, *, /, %
- Toán tử so sánh: ==, !=, >, <, >=, <=
- Toán tử logic: &&, ||, !

Ví dụ khai báo biến và toán tử:
`,
    example_code: `#include <iostream>
using namespace std;

int main() {
    int age = 25;
    double pi = 3.14;
    bool isStudent = true;

    cout << "Age: " << age << ", PI: " << pi << endl;
    cout << "Is student? " << isStudent << endl;

    int sum = age + 10;
    cout << "Sum: " << sum << endl;

    return 0;
}`,
    language: "cpp",
    readTime: "12 phút",
    questionCount: 6,
    difficulty: "Cơ bản",
    students: 720,
    status: "in_progress",
    progress: 40,
  },
  {
    id: 11,
    course_id: 3,
    title: "Cấu trúc điều kiện và vòng lặp",
    content: `
Học cách kiểm soát luồng chương trình:
- if, else if, else
- switch
- for, while, do-while

Ví dụ:
`,
    example_code: `#include <iostream>
using namespace std;

int main() {
    int x = 10;

    if (x > 5) {
        cout << "x lớn hơn 5" << endl;
    } else {
        cout << "x nhỏ hơn hoặc bằng 5" << endl;
    }

    for (int i = 0; i < 5; i++) {
        cout << "i = " << i << endl;
    }

    return 0;
}`,
    language: "cpp",
    readTime: "15 phút",
    questionCount: 9,
    difficulty: "Trung bình",
    students: 670,
    status: "not_started",
    progress: 0,
  },
  {
    id: 12,
    course_id: 3,
    title: "Hàm và Truyền tham số",
    content: `
Trong C++, hàm giúp tái sử dụng mã nguồn. Có thể truyền tham trị hoặc tham chiếu. Hàm có thể trả về giá trị hoặc void.

Ví dụ:
`,
    example_code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    int sum = add(5, 3);
    cout << "Sum: " << sum << endl;

    greet("An");
    return 0;
}`,
    language: "cpp",
    readTime: "18 phút",
    questionCount: 10,
    difficulty: "Trung bình",
    students: 610,
    status: "not_started",
    progress: 0,
  },

  // === ☕ Java Cơ bản ===
  {
    id: 13,
    course_id: 4,
    title: "Giới thiệu Java và cài đặt môi trường",
    content: `
Java là ngôn ngữ lập trình hướng đối tượng, chạy trên JVM. Trước khi bắt đầu, cần:
- Cài đặt JDK (Java Development Kit)
- Hiểu JRE (Java Runtime Environment)
- Thiết lập biến môi trường PATH

Ví dụ kiểm tra phiên bản Java:
`,
    example_code: `// Kiểm tra phiên bản Java trong terminal
// > java -version
// > javac -version`,
    language: "java",
    readTime: "12 phút",
    questionCount: 6,
    difficulty: "Cơ bản",
    students: 880,
    status: "completed",
    progress: 100,
  },
  {
    id: 14,
    course_id: 4,
    title: "Biến, Kiểu dữ liệu và Toán tử trong Java",
    content: `
Trong Java, biến được khai báo với kiểu dữ liệu rõ ràng:
- int, double, boolean, char, String
- Toán tử số học: +, -, *, /, %
- Toán tử so sánh: ==, !=, >, <, >=, <=
- Toán tử logic: &&, ||, !

Ví dụ:
`,
    example_code: `public class Main {
    public static void main(String[] args) {
        int age = 25;
        double pi = 3.14;
        boolean isStudent = true;
        String name = "An";

        System.out.println("Age: " + age + ", PI: " + pi);
        System.out.println("Student? " + isStudent + ", Name: " + name);
    }
}`,
    language: "java",
    readTime: "15 phút",
    questionCount: 8,
    difficulty: "Cơ bản",
    students: 790,
    status: "in_progress",
    progress: 40,
  },
  {
    id: 15,
    course_id: 4,
    title: "Cấu trúc điều kiện và vòng lặp",
    content: `
Kiểm soát luồng chương trình trong Java:
- if, else if, else
- switch
- for, while, do-while

Ví dụ:
`,
    example_code: `public class Main {
    public static void main(String[] args) {
        int x = 10;

        if (x > 5) {
            System.out.println("x lớn hơn 5");
        } else {
            System.out.println("x nhỏ hơn hoặc bằng 5");
        }

        for (int i = 0; i < 5; i++) {
            System.out.println("i = " + i);
        }
    }
}`,
    language: "java",
    readTime: "18 phút",
    questionCount: 10,
    difficulty: "Trung bình",
    students: 720,
    status: "not_started",
    progress: 0,
  },
  {
    id: 16,
    course_id: 4,
    title: "Lập trình hướng đối tượng (OOP) cơ bản",
    content: `
Hướng đối tượng trong Java:
- Class, Object
- Thuộc tính (fields) và phương thức (methods)
- Kế thừa (inheritance)
- Tính đóng gói (encapsulation)

Ví dụ:
`,
    example_code: `class Person {
    String name;
    int age;

    void greet() {
        System.out.println("Hello, " + name);
    }
}

class Student extends Person {
    int studentId;
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "An";
        s.age = 20;
        s.studentId = 123;

        s.greet();
        System.out.println("ID: " + s.studentId);
    }
}`,
    language: "java",
    readTime: "22 phút",
    questionCount: 12,
    difficulty: "Trung bình",
    students: 640,
    status: "not_started",
    progress: 0,
  },

  // === ⚙️ C# với .NET Framework ===
  {
    id: 17,
    course_id: 5,
    title: "Giới thiệu về C# và .NET",
    content: `
C# là ngôn ngữ lập trình hướng đối tượng, chạy trên nền tảng .NET.
Trước khi bắt đầu, cần:
- Cài đặt Visual Studio hoặc VS Code
- Hiểu CLR (Common Language Runtime)
- Tạo project Console App đầu tiên
`,
    example_code: `// Hello World trong C#
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, C#");
    }
}`,
    language: "csharp",
    readTime: "12 phút",
    questionCount: 5,
    difficulty: "Cơ bản",
    students: 1050,
    status: "completed",
    progress: 100,
  },
  {
    id: 18,
    course_id: 5,
    title: "Cấu trúc chương trình và cú pháp C#",
    content: `
Cấu trúc cơ bản trong C#:
- Namespace: tổ chức mã nguồn
- Class: định nghĩa đối tượng
- Phương thức (methods): thực thi chức năng
- Entry point: static void Main()
`,
    example_code: `using System;

namespace MyApp {
    class Program {
        static void Main() {
            Console.WriteLine("Cấu trúc cơ bản trong C#");
        }
    }
}`,
    language: "csharp",
    readTime: "15 phút",
    questionCount: 8,
    difficulty: "Cơ bản",
    students: 980,
    status: "in_progress",
    progress: 40,
  },
  {
    id: 19,
    course_id: 5,
    title: "Làm việc với biến, kiểu dữ liệu và toán tử",
    content: `
Trong C#, mọi biến đều có kiểu dữ liệu rõ ràng:
- int, double, bool, string, char
- Toán tử số học: +, -, *, /, %
- Toán tử so sánh: ==, !=, >, <, >=, <=
- Toán tử logic: &&, ||, !
`,
    example_code: `using System;

class Program {
    static void Main() {
        int age = 25;
        double pi = 3.14;
        bool isStudent = true;
        string name = "An";

        Console.WriteLine($"Age: {age}, PI: {pi}");
        Console.WriteLine($"Student? {isStudent}, Name: {name}");
    }
}`,
    language: "csharp",
    readTime: "14 phút",
    questionCount: 8,
    difficulty: "Cơ bản",
    students: 870,
    status: "not_started",
    progress: 0,
  },
  {
    id: 20,
    course_id: 5,
    title: "OOP trong C# (Class, Object, Inheritance)",
    content: `
Hướng đối tượng trong C#:
- Class và Object
- Thuộc tính (fields) và phương thức (methods)
- Kế thừa (inheritance)
- Tính đóng gói (encapsulation)
`,
    example_code: `using System;

class Person {
    public string Name;
    public int Age;

    public void Greet() {
        Console.WriteLine($"Hello, {Name}");
    }
}

class Student : Person {
    public int StudentId;
}

class Program {
    static void Main() {
        Student s = new Student();
        s.Name = "An";
        s.Age = 20;
        s.StudentId = 123;

        s.Greet();
        Console.WriteLine($"ID: {s.StudentId}");
    }
}`,
    language: "csharp",
    readTime: "20 phút",
    questionCount: 10,
    difficulty: "Trung bình",
    students: 780,
    status: "not_started",
    progress: 0,
  },
];
