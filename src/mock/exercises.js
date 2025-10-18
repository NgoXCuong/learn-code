export const mockExercises = [
  // === JavaScript ===
  // Lesson 1: Giới thiệu về JavaScript (ID: 1)
  {
    id: 1,
    lesson_id: 1,
    title: "In ra Console",
    description:
      "Sử dụng 'console.log()' để in chuỗi 'Chào JavaScript!' ra console của trình duyệt.",
    example_code: `console.log("Chào JavaScript!");`,
    language: "javascript",
  },
  {
    id: 2,
    lesson_id: 1,
    title: "Tạo cảnh báo (Alert)",
    description:
      "Sử dụng hàm 'alert()' để hiển thị một hộp thoại bật lên (popup) với thông báo 'Xin chào Thế giới!'.",
    example_code: `alert("Xin chào Thế giới!");`,
    language: "javascript",
  },

  // Lesson 2: Biến và Kiểu dữ liệu (ID: 2)
  {
    id: 3,
    lesson_id: 2,
    title: "Khai báo Biến",
    description:
      "Khai báo một biến 'let' tên 'age' gán giá trị 20, và một hằng số 'const' tên 'name' gán giá trị tên của bạn. In cả hai ra console.",
    example_code: `
let age = 20;
const name = "An";
console.log(name, age);`,
    language: "javascript",
  },
  {
    id: 4,
    lesson_id: 2,
    title: "Kiểm tra kiểu dữ liệu",
    description:
      "Tạo 3 biến: 1 kiểu Number, 1 kiểu String, 1 kiểu Boolean. Dùng 'typeof' để in ra kiểu dữ liệu của chúng.",
    example_code: `
let score = 100;
let message = "Hoàn thành";
let isDone = true;
console.log(typeof score);
console.log(typeof message);
console.log(typeof isDone);`,
    language: "javascript",
  },

  // Lesson 3: Toán tử (ID: 3)
  {
    id: 5,
    lesson_id: 3,
    title: "Phép toán số học",
    description:
      "Tạo hai biến số 'a' và 'b'. Tính tổng, hiệu, tích, thương và phép chia lấy dư (%) của chúng, sau đó in kết quả.",
    example_code: `
let a = 15;
let b = 4;
console.log("Tổng:", a + b);
console.log("Hiệu:", a - b);
console.log("Tích:", a * b);
console.log("Thương:", a / b);
console.log("Dư:", a % b);`,
    language: "javascript",
  },
  {
    id: 6,
    lesson_id: 3,
    title: "Phép so sánh tuyệt đối",
    description:
      "Tạo biến 'let x = 10' và 'let y = \"10\"'. In ra kết quả của 'x == y' và 'x === y'.",
    example_code: `
let x = 10;
let y = "10";
console.log("So sánh (==):", x == y);
console.log("So sánh (===):", x === y);`,
    language: "javascript",
  },
  {
    id: 7,
    lesson_id: 3,
    title: "Toán tử Logic",
    description:
      "Tạo biến 'let age = 25'. Viết câu lệnh 'console.log' kiểm tra xem 'age' có lớn hơn 18 VÀ (&&) nhỏ hơn 30 hay không.",
    example_code: `
let age = 25;
console.log(age > 18 && age < 30); // true`,
    language: "javascript",
  },

  // Lesson 4: Hàm (Functions) (ID: 4)
  {
    id: 8,
    lesson_id: 4,
    title: "Viết hàm tính tổng",
    description:
      "Viết một hàm (Function Declaration) tên 'add' nhận vào 2 tham số 'a' và 'b', trả về (return) tổng của chúng. Gọi hàm và in kết quả.",
    example_code: `
function add(a, b) {
  return a + b;
}
console.log(add(5, 10)); // 15`,
    language: "javascript",
  },
  {
    id: 9,
    lesson_id: 4,
    title: "Viết hàm mũi tên (Arrow Function)",
    description:
      "Chuyển hàm 'add' ở bài tập trước thành dạng Arrow Function (biểu thức hàm).",
    example_code: `
const add = (a, b) => {
  return a + b;
};
// Hoặc ngắn gọn:
// const add = (a, b) => a + b;
console.log(add(10, 20)); // 30`,
    language: "javascript",
  },

  // Lesson 5: Tương tác DOM (ID: 5)
  {
    id: 10,
    lesson_id: 5,
    title: "Thay đổi nội dung HTML",
    description:
      "Giả sử có 1 thẻ <p id=\"welcome\">Xin chào</p>. Viết mã JavaScript để chọn phần tử này và thay đổi nội dung của nó thành 'Tạm biệt'.",
    example_code: `
// HTML: <p id="welcome">Xin chào</p>
// JS:
const p = document.getElementById("welcome");
p.textContent = "Tạm biệt";`,
    language: "javascript",
  },
  {
    id: 11,
    lesson_id: 5,
    title: "Thay đổi CSS (Style)",
    description:
      "Giả sử có 1 thẻ <h1 id=\"title\">Tiêu đề</h1>. Viết mã JavaScript để chọn phần tử này và đổi 'style.color' của nó thành 'red'.",
    example_code: `
// HTML: <h1 id="title">Tiêu đề</h1>
// JS:
const title = document.querySelector("#title");
title.style.color = "red";`,
    language: "javascript",
  },
  {
    id: 12,
    lesson_id: 5,
    title: "Xử lý sự kiện Click",
    description:
      "Giả sử có 1 nút <button id=\"btn\">Click</button>. Viết mã để thêm sự kiện 'click', khi click vào nút thì 'alert(\"Đã click!\")'.",
    example_code: `
// HTML: <button id="btn">Click</button>
// JS:
const button = document.getElementById("btn");
button.addEventListener("click", function() {
  alert("Đã click!");
});`,
    language: "javascript",
  },

  // === Python ===
  // Lesson 6: Làm quen với Python (ID: 6)
  {
    id: 13,
    lesson_id: 6,
    title: "In chuỗi ra màn hình",
    description:
      "Sử dụng hàm 'print()' để in chuỗi 'Hello Python' ra terminal.",
    example_code: `print("Hello Python")`,
    language: "python",
  },
  {
    id: 14,
    lesson_id: 6,
    title: "Biến và F-String",
    description:
      "Tạo 2 biến 'name' (tên của bạn) và 'language' (giá trị 'Python'). Dùng f-string để in ra 'Tôi là [name] và tôi đang học [language]'.",
    example_code: `
name = "An"
language = "Python"
print(f"Tôi là {name} và tôi đang học {language}")`,
    language: "python",
  },

  // Lesson 7: Cấu trúc điều kiện và vòng lặp (ID: 7)
  {
    id: 15,
    lesson_id: 7,
    title: "Kiểm tra chẵn lẻ",
    description:
      "Tạo 1 biến 'number' (ví dụ: 10). Viết cấu trúc 'if-else' để kiểm tra xem 'number' là số chẵn hay số lẻ (dùng toán tử '% 2').",
    example_code: `
number = 10
if number % 2 == 0:
    print(f"{number} là số chẵn")
else:
    print(f"{number} là số lẻ")`,
    language: "python",
  },
  {
    id: 16,
    lesson_id: 7,
    title: "Vòng lặp For Range",
    description:
      "Sử dụng vòng lặp 'for' và hàm 'range()' để in ra các số từ 1 đến 5 (bao gồm cả 5).",
    example_code: `
# range(1, 6) sẽ tạo ra 1, 2, 3, 4, 5
for i in range(1, 6):
    print(i)`,
    language: "python",
  },
  {
    id: 17,
    lesson_id: 7,
    title: "Vòng lặp While",
    description:
      "Sử dụng vòng lặp 'while' để in ra các số từ 1 đến 3. (Khởi tạo biến 'count = 1' và lặp khi 'count <= 3').",
    example_code: `
count = 1
while count <= 3:
    print(count)
    count += 1`,
    language: "python",
  },

  // Lesson 8: Cấu trúc dữ liệu: List (ID: 8)
  {
    id: 18,
    lesson_id: 8,
    title: "Tạo và thêm vào List",
    description:
      "Tạo một List rỗng tên 'colors'. Dùng 'append()' để thêm 3 màu: 'red', 'green', 'blue'. Sau đó in List ra.",
    example_code: `
colors = []
colors.append("red")
colors.append("green")
colors.append("blue")
print(colors)`,
    language: "python",
  },
  {
    id: 19,
    lesson_id: 8,
    title: "Truy cập phần tử List",
    description:
      "Tạo 1 List 'numbers = [10, 20, 30, 40]'. In ra phần tử đầu tiên (index 0) và phần tử cuối cùng (index -1).",
    example_code: `
numbers = [10, 20, 30, 40]
print(f"Đầu tiên: {numbers[0]}")
print(f"Cuối cùng: {numbers[-1]}")`,
    language: "python",
  },

  // Lesson 9: Hàm (Functions) (ID: 9)
  {
    id: 20,
    lesson_id: 9,
    title: "Định nghĩa hàm (def)",
    description:
      "Viết 1 hàm Python tên 'greet' nhận 1 tham số 'name'. Hàm này sẽ in ra f-string 'Xin chào, {name}'.",
    example_code: `
def greet(name):
    print(f"Xin chào, {name}")

greet("Python")`,
    language: "python",
  },
  {
    id: 21,
    lesson_id: 9,
    title: "Hàm có giá trị trả về (return)",
    description:
      "Viết 1 hàm 'multiply' nhận 2 tham số 'a' và 'b'. Hàm sẽ 'return' (trả về) tích của chúng. Gọi hàm và in kết quả.",
    example_code: `
def multiply(a, b):
    return a * b

result = multiply(7, 5)
print(result) # 35`,
    language: "python",
  },

  // Lesson 10: Đọc và Ghi File (ID: 10)
  {
    id: 22,
    lesson_id: 10,
    title: "Ghi File (Write)",
    description:
      "Sử dụng 'with open()' ở chế độ 'w' (write) để ghi tên của bạn vào file 'user.txt'.",
    example_code: `
with open("user.txt", "w", encoding="utf-8") as f:
    f.write("Nguyen Van An")
# Kiểm tra file user.txt sau khi chạy`,
    language: "python",
  },
  {
    id: 23,
    lesson_id: 10,
    title: "Đọc File (Read)",
    description:
      "Sử dụng 'with open()' ở chế độ 'r' (read) để đọc nội dung từ file 'user.txt' (tạo ở bài trước) và in ra console.",
    example_code: `
try:
    with open("user.txt", "r", encoding="utf-8") as f:
        content = f.read()
        print(content)
except FileNotFoundError:
    print("Bạn cần chạy bài 'Ghi File' trước!")`,
    language: "python",
  },
  {
    id: 24,
    lesson_id: 10,
    title: "Nối File (Append)",
    description:
      "Sử dụng 'with open()' ở chế độ 'a' (append) để thêm (nối) chuỗi '\\nTuổi: 30' (xuống dòng và thêm tuổi) vào file 'user.txt'.",
    example_code: `
with open("user.txt", "a", encoding="utf-8") as f:
    f.write("\\nTuổi: 30")
# Kiểm tra lại file user.txt`,
    language: "python",
  },

  // === C++ ===
  // Lesson 11: Chương trình C++ đầu tiên (ID: 11)
  {
    id: 25,
    lesson_id: 11,
    title: "Chương trình C++ đầu tiên",
    description:
      "Viết 1 chương trình C++ hoàn chỉnh (dùng '#include <iostream>', 'int main()') để in ra 'Hello C++' (sử dụng 'cout' và 'endl').",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    cout << "Hello C++" << endl;
    return 0;
}`,
    language: "cpp",
  },
  {
    id: 26,
    lesson_id: 11,
    title: "In nhiều dòng",
    description:
      "Viết 1 chương trình C++ in ra 3 dòng: Tên, Tuổi, Thành phố của bạn.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    cout << "Tên: An" << endl;
    cout << "Tuổi: 22" << endl;
    cout << "Thành phố: Hà Nội" << endl;
    return 0;
}`,
    language: "cpp",
  },

  // Lesson 12: Biến và Toán tử (ID: 12)
  {
    id: 27,
    lesson_id: 12,
    title: "Khai báo biến",
    description:
      "Khai báo 1 biến 'int' tên 'age' (giá trị 25), 1 biến 'double' tên 'gpa' (giá trị 3.5). In cả 2 ra màn hình.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    int age = 25;
    double gpa = 3.5;
    cout << "Tuổi: " << age << ", GPA: " << gpa << endl;
    return 0;
}`,
    language: "cpp",
  },
  {
    id: 28,
    lesson_id: 12,
    title: "Chia số nguyên và số thực",
    description:
      "Khai báo 'int a = 10', 'int b = 3'. In ra kết quả của 'a / b' (chia nguyên) và 'a / 3.0' (chia thực).",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    int a = 10;
    int b = 3;
    cout << "Chia nguyên (10 / 3): " << (a / b) << endl;
    cout << "Chia thực (10 / 3.0): " << (a / 3.0) << endl;
    return 0;
}`,
    language: "cpp",
  },

  // Lesson 13: Nhập dữ liệu (ID: 13)
  {
    id: 29,
    lesson_id: 13,
    title: "Nhập tuổi (cin)",
    description:
      "Viết chương trình C++ yêu cầu người dùng 'Nhập tuổi của bạn:', sau đó dùng 'cin' để đọc tuổi vào 1 biến 'int age', và cuối cùng in ra 'Bạn [age] tuổi.'.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    int age;
    cout << "Nhập tuổi của bạn: ";
    cin >> age;
    cout << "Bạn " << age << " tuổi." << endl;
    return 0;
}`,
    language: "cpp",
  },
  {
    id: 30,
    lesson_id: 13,
    title: "Tính tổng 2 số",
    description:
      "Viết chương trình yêu cầu người dùng nhập vào 2 số (lưu vào 'int a', 'int b'), sau đó in ra tổng của chúng.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    int a, b;
    cout << "Nhập số thứ nhất: ";
    cin >> a;
    cout << "Nhập số thứ hai: ";
    cin >> b;
    cout << "Tổng là: " << (a + b) << endl;
    return 0;
}`,
    language: "cpp",
  },

  // Lesson 14: Câu lệnh If-Else (ID: 14)
  {
    id: 31,
    lesson_id: 14,
    title: "Kiểm tra điểm (If-Else)",
    description:
      "Viết chương trình nhập vào 1 'double score'. Nếu 'score >= 5.0' thì in ra 'Đạt', ngược lại (else) thì in ra 'Trượt'.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    double score;
    cout << "Nhập điểm: ";
    cin >> score;
    if (score >= 5.0) {
        cout << "Đạt" << endl;
    } else {
        cout << "Trượt" << endl;
    }
    return 0;
}`,
    language: "cpp",
  },
  {
    id: 32,
    lesson_id: 14,
    title: "Kiểm tra Âm/Dương/Zero (If-Else If-Else)",
    description:
      "Viết chương trình nhập vào 1 'int number'. Dùng 'if-else if-else' để kiểm tra và in ra 'Số dương', 'Số âm', hoặc 'Số không'.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    int number;
    cout << "Nhập 1 số: ";
    cin >> number;
    if (number > 0) {
        cout << "Số dương" << endl;
    } else if (number < 0) {
        cout << "Số âm" << endl;
    } else {
        cout << "Số không" << endl;
    }
    return 0;
}`,
    language: "cpp",
  },

  // Lesson 15: Vòng lặp For (ID: 15)
  {
    id: 33,
    lesson_id: 15,
    title: "Đếm xuôi 1 đến 5",
    description:
      "Sử dụng vòng lặp 'for' (khởi tạo 'int i = 1', điều kiện 'i <= 5', cập nhật 'i++') để in ra các số từ 1 đến 5.",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}`,
    language: "cpp",
  },
  {
    id: 34,
    lesson_id: 15,
    title: "Tính tổng 1 đến 10",
    description:
      "Dùng vòng lặp 'for' để tính tổng các số từ 1 đến 10. (Khai báo 'int sum = 0' trước vòng lặp, và 'sum += i' trong vòng lặp).",
    example_code: `
#include <iostream>
using namespace std;
int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    cout << "Tổng từ 1 đến 10 là: " << sum << endl;
    return 0;
}`,
    language: "cpp",
  },

  // === Java ===
  // Lesson 16: Giới thiệu Java và JVM (ID: 16)
  {
    id: 35,
    lesson_id: 16,
    title: "Viết bình luận (Comment)",
    description:
      "Trong 1 lớp Java, hãy viết 1 bình luận (comment) 1 dòng và 1 bình luận nhiều dòng.",
    example_code: `
public class Comments {
    // Đây là bình luận 1 dòng
    
    /*
     Đây là
     bình luận
     trên nhiều dòng
    */
}`,
    language: "java",
  },

  // Lesson 17: Chương trình Java đầu tiên (ID: 17)
  {
    id: 36,
    lesson_id: 17,
    title: "Hello Java",
    description:
      "Viết 1 chương trình Java hoàn chỉnh (class Main, hàm main) để in ra 'Hello Java' (dùng 'System.out.println()').",
    example_code: `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}`,
    language: "java",
  },
  {
    id: 37,
    lesson_id: 17,
    title: "In và không xuống dòng",
    description:
      "Sử dụng 'System.out.print()' để in 'Dòng 1.' và 'System.out.println()' để in 'Dòng 2.' để thấy sự khác biệt.",
    example_code: `
public class PrintTest {
    public static void main(String[] args) {
        System.out.print("Dòng 1."); // Không xuống dòng
        System.out.println(" Dòng 2."); // In và xuống dòng
        System.out.println("Dòng 3.");
    }
}`,
    language: "java",
  },

  // Lesson 18: Biến và Kiểu dữ liệu (ID: 18)
  {
    id: 38,
    lesson_id: 18,
    title: "Khai báo 3 kiểu dữ liệu",
    description:
      "Trong hàm main, khai báo 1 'int age = 25', 1 'double gpa = 3.8', và 1 'String name = \"Java\"'. In cả 3 ra màn hình.",
    example_code: `
public class Variables {
    public static void main(String[] args) {
        int age = 25;
        double gpa = 3.8;
        String name = "Java";
        System.out.println("Tên: " + name + ", Tuổi: " + age + ", GPA: " + gpa);
    }
}`,
    language: "java",
  },
  {
    id: 39,
    lesson_id: 18,
    title: "Kiểu Boolean và Char",
    description:
      "Khai báo 1 'boolean isLearning = true' và 1 'char grade = 'A''. In cả 2 ra màn hình.",
    example_code: `
public class MoreVariables {
    public static void main(String[] args) {
        boolean isLearning = true;
        char grade = 'A';
        System.out.println("Đang học? " + isLearning);
        System.out.println("Xếp loại: " + grade);
    }
}`,
    language: "java",
  },

  // Lesson 19: Vòng lặp và Điều kiện (ID: 19)
  {
    id: 40,
    lesson_id: 19,
    title: "Vòng lặp For 0 đến 4",
    description:
      "Sử dụng vòng lặp 'for' (cú pháp giống C++) để in ra các số từ 0 đến 4.",
    example_code: `
public class ForLoop {
    public static void main(String[] args) {
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
    }
}`,
    language: "java",
  },
  {
    id: 41,
    lesson_id: 19,
    title: "Câu lệnh If-Else",
    description:
      "Khai báo 'int temp = 30'. Viết 'if-else' để kiểm tra: nếu 'temp > 25' thì in 'Trời nóng', ngược lại in 'Trời mát'.",
    example_code: `
public class Condition {
    public static void main(String[] args) {
        int temp = 30;
        if (temp > 25) {
            System.out.println("Trời nóng");
        } else {
            System.out.println("Trời mát");
        }
    }
}`,
    language: "java",
  },
  {
    id: 42,
    lesson_id: 19,
    title: "Câu lệnh Switch-Case",
    description:
      "Khai báo 'int choice = 2'. Viết 1 khối 'switch' cho 'choice'. Tạo 'case 1' (in 'Menu 1'), 'case 2' (in 'Menu 2'), và 'default' (in 'Lỗi'). (Nhớ dùng 'break;').",
    example_code: `
public class SwitchCase {
    public static void main(String[] args) {
        int choice = 2;
        switch (choice) {
            case 1:
                System.out.println("Menu 1");
                break;
            case 2:
                System.out.println("Menu 2");
                break;
            default:
                System.out.println("Lỗi");
        }
    }
}`,
    language: "java",
  },

  // Lesson 20: Lớp và Đối tượng (ID: 20)
  {
    id: 43,
    lesson_id: 20,
    title: "Định nghĩa Lớp (Class)",
    description:
      "Định nghĩa 1 lớp 'class Person' (bên ngoài lớp Main). Lớp này có 1 thuộc tính 'String name' và 1 phương thức 'void introduce()' in ra 'Xin chào, tôi là [name]'.",
    example_code: `
class Person {
    String name = "An"; // Gán giá trị mặc định

    void introduce() {
        System.out.println("Xin chào, tôi là " + name);
    }
}
// (Chương trình Main sẽ ở bài tập sau)`,
    language: "java",
  },
  {
    id: 44,
    lesson_id: 20,
    title: "Tạo Đối tượng (Object)",
    description:
      "Sử dụng lớp 'Person' (từ bài tập trước). Trong hàm 'main', tạo 1 đối tượng 'Person p1 = new Person();', thay đổi 'p1.name = \"Bình\"', và gọi phương thức 'p1.introduce()'.",
    example_code: `
// (Giả sử lớp Person đã được định nghĩa ở trên)
public class Main {
    public static void main(String[] args) {
        Person p1 = new Person();
        p1.name = "Bình"; // Thay đổi thuộc tính
        p1.introduce(); // Gọi phương thức
    }
}

class Person {
    String name = "An";
    void introduce() {
        System.out.println("Xin chào, tôi là " + name);
    }
}`,
    language: "java",
  },

  // === C# ===
  // Lesson 21: Giới thiệu C# và .NET (ID: 21)
  {
    id: 45,
    lesson_id: 21,
    title: "Viết bình luận C#",
    description:
      "Viết một chương trình C# (chỉ cần cấu trúc cơ bản) và thêm vào 1 bình luận 1 dòng, 1 bình luận nhiều dòng.",
    example_code: `
using System;
namespace Comments
{
    class Program 
    {
        // Đây là bình luận 1 dòng
        /*
         Và đây là
         bình luận nhiều dòng
        */
        static void Main(string[] args) {}
    }
}`,
    language: "csharp",
  },

  // Lesson 22: Chương trình Console đầu tiên (ID: 22)
  {
    id: 46,
    lesson_id: 22,
    title: "Hello C#",
    description:
      "Viết chương trình C# console hoàn chỉnh (dùng 'using System;', 'namespace', 'class', 'static void Main') để in ra 'Hello C#' (dùng 'Console.WriteLine()').",
    example_code: `
using System;
namespace HelloApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello C#!");
        }
    }
}`,
    language: "csharp",
  },
  {
    id: 47,
    lesson_id: 22,
    title: "Nội suy chuỗi (Interpolation)",
    description:
      "Khai báo 'int version = 10'. Dùng 'Console.WriteLine()' và kỹ thuật nội suy chuỗi (dấu '$' phía trước) để in ra 'Bạn đang học C# [version]'.",
    example_code: `
using System;
namespace Interpolation
{
    class Program
    {
        static void Main(string[] args)
        {
            int version = 10;
            // Dùng $ để nội suy
            Console.WriteLine($"Bạn đang học C# {version}"); 
        }
    }
}`,
    language: "csharp",
  },

  // Lesson 23: Biến, Kiểu dữ liệu, Nhập liệu (ID: 23)
  {
    id: 48,
    lesson_id: 23,
    title: "Kiểu 'decimal' (Tài chính)",
    description:
      "Khai báo 1 biến 'decimal' tên 'balance' với giá trị '1500.75m' (lưu ý hậu tố 'm'). In biến này ra.",
    example_code: `
using System;
namespace DecimalType
{
    class Program
    {
        static void Main(string[] args)
        {
            decimal balance = 1500.75m;
            Console.WriteLine($"Số dư của bạn: {balance}");
        }
    }
}`,
    language: "csharp",
  },
  {
    id: 49,
    lesson_id: 23,
    title: "Nhập liệu (ReadLine) và Chuyển đổi",
    description:
      "Viết chương trình hỏi 'Nhập tuổi của bạn:', dùng 'Console.ReadLine()' để đọc chuỗi, sau đó dùng 'Convert.ToInt32()' để chuyển sang 'int age'. Cuối cùng in ra 'Bạn [age] tuổi'.",
    example_code: `
using System;
namespace InputApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Nhập tuổi của bạn: ");
            string input = Console.ReadLine();
            
            int age = Convert.ToInt32(input);
            
            Console.WriteLine($"Bạn {age} tuổi.");
        }
    }
}`,
    language: "csharp",
  },

  // Lesson 24: Cấu trúc điều khiển (ID: 24)
  {
    id: 50,
    lesson_id: 24,
    title: "Kiểm tra chẵn lẻ (If-Else)",
    description:
      "Viết chương trình nhập 1 số 'int n'. Dùng 'if-else' và toán tử '% 2' để kiểm tra và in ra 'Số chẵn' hoặc 'Số lẻ'.",
    example_code: `
using System;
namespace EvenOdd
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Nhập 1 số nguyên: ");
            int n = Convert.ToInt32(Console.ReadLine());
            
            if (n % 2 == 0)
            {
                Console.WriteLine("Số chẵn");
            }
            else
            {
                Console.WriteLine("Số lẻ");
            }
        }
    }
}`,
    language: "csharp",
  },
  {
    id: 51,
    lesson_id: 24,
    title: "Switch-Case",
    description:
      "Viết chương trình nhập 1 'int day' (1-7). Dùng 'switch-case' để in ra 'Chủ Nhật' (case 1), 'Thứ Hai' (case 2), ..., và 'Không hợp lệ' (default).",
    example_code: `
using System;
namespace SwitchApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Nhập ngày (1-7): ");
            int day = Convert.ToInt32(Console.ReadLine());
            
            switch (day)
            {
                case 1: Console.WriteLine("Chủ Nhật"); break;
                case 2: Console.WriteLine("Thứ Hai"); break;
                // ... (thêm case 3-7)
                default: Console.WriteLine("Không hợp lệ"); break;
            }
        }
    }
}`,
    language: "csharp",
  },

  // Lesson 25: Vòng lặp (For, Foreach) (ID: 25)
  {
    id: 52,
    lesson_id: 25,
    title: "Vòng lặp For",
    description:
      "Sử dụng vòng lặp 'for' (cú pháp giống C++/Java) để in ra các số từ 1 đến 5.",
    example_code: `
using System;
namespace ForLoop
{
    class Program
    {
        static void Main(string[] args)
        {
            for (int i = 1; i <= 5; i++)
            {
                Console.Write(i + " ");
            }
        }
    }
}`,
    language: "csharp",
  },
  {
    id: 53,
    lesson_id: 25,
    title: "Vòng lặp Foreach",
    description:
      'Tạo 1 mảng \'string[] cars = { "Volvo", "BMW", "Ford" };\'. Dùng vòng lặp \'foreach\' để duyệt và in ra từng tên xe.',
    example_code: `
using System;
namespace ForeachLoop
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] cars = { "Volvo", "BMW", "Ford" };
            foreach (string car in cars)
            {
                Console.WriteLine(car);
            }
        }
    }
}`,
    language: "csharp",
  },

  // Lesson 26: Windows Forms (ID: 26)
  {
    id: 54,
    lesson_id: 26,
    title: "Hộp thoại (MessageBox)",
    description:
      "(Bài tập WinForms) Viết mã cho sự kiện 'button1_Click' để hiển thị một 'MessageBox.Show()' với nội dung 'Xin chào WinForms!'.",
    example_code: `
// (Trong file Form1.cs, sau khi click đúp vào nút)
private void button1_Click(object sender, EventArgs e)
{
    MessageBox.Show("Xin chào WinForms!");
}`,
    language: "csharp",
  },
  {
    id: 55,
    lesson_id: 26,
    title: "Thay đổi Label Text",
    description:
      "(Bài tập WinForms) Giả sử có 1 'Label' tên 'label1'. Viết mã cho 'button1_Click' để thay đổi 'label1.Text' thành 'Đã click!'.",
    example_code: `
// (Giả sử có 1 Label tên 'label1' trên Form)
private void button1_Click(object sender, EventArgs e)
{
    label1.Text = "Đã click!";
}`,
    language: "csharp",
  },

  // === Python Projects ===
  // Lesson 27: Project 1 - Máy tính (ID: 27)
  {
    id: 56,
    lesson_id: 27,
    title: "Máy tính (Cộng, Trừ)",
    description:
      "Hoàn thành 1 phần của dự án máy tính: Nhập 2 số 'float' (num1, num2) và 1 phép toán 'op'. Dùng 'if-elif' để xử lý 2 trường hợp 'op == \"+\"' và 'op == \"-\"'.",
    example_code: `
num1 = float(input("Số 1: "))
op = input("Phép toán (+ hoặc -): ")
num2 = float(input("Số 2: "))

if op == "+":
    print(f"Kết quả: {num1 + num2}")
elif op == "-":
    print(f"Kết quả: {num1 - num2}")
else:
    print("Chỉ hỗ trợ + hoặc -")`,
    language: "python",
  },
  {
    id: 57,
    lesson_id: 27,
    title: "Máy tính (Chia cho 0)",
    description:
      "Mở rộng bài tập trước. Thêm 'elif op == \"/\"'. Bên trong, dùng 1 'if' lồng nhau để kiểm tra 'if num2 == 0' thì in 'Lỗi chia cho 0', 'else' thì mới in kết quả.",
    example_code: `
num1 = float(input("Số 1: "))
op = input("Phép toán (/): ")
num2 = float(input("Số 2: "))

if op == "/":
    if num2 == 0:
        print("Lỗi: Không thể chia cho 0")
    else:
        print(f"Kết quả: {num1 / num2}")
else:
    print("Phép toán không hỗ trợ")`,
    language: "python",
  },

  // Lesson 28: Project 1 - Try/Except (ID: 28)
  {
    id: 58,
    lesson_id: 28,
    title: "Xử lý lỗi nhập liệu (Try-Except)",
    description:
      "Viết 1 đoạn mã yêu cầu người dùng 'Nhập tuổi của bạn:'. Đặt hàm 'int(input(...))' vào trong khối 'try', và tạo khối 'except ValueError' để in ra 'Lỗi: Phải nhập số!'.",
    example_code: `
try:
    age = int(input("Nhập tuổi của bạn: "))
    print(f"Bạn {age} tuổi")
except ValueError:
    print("Lỗi: Phải nhập số!")`,
    language: "python",
  },
  {
    id: 59,
    lesson_id: 28,
    title: "Vòng lặp bắt nhập (While True)",
    description:
      "Kết hợp 'while True' và 'try-except' (bài trước) để viết 1 vòng lặp: Chỉ 'break' (thoát lặp) khi người dùng nhập số thành công.",
    example_code: `
while True:
    try:
        age = int(input("Nhập tuổi của bạn: "))
        print(f"Bạn {age} tuổi")
        break # Thoát lặp nếu nhập đúng
    except ValueError:
        print("Lỗi: Phải nhập số! Thử lại.")`,
    language: "python",
  },

  // Lesson 29: Project 2 - Đoán số 1 (ID: 29)
  {
    id: 60,
    lesson_id: 29,
    title: "Số ngẫu nhiên",
    description:
      "Sử dụng 'import random'. Viết mã để in ra 1 số ngẫu nhiên trong khoảng từ 1 đến 6 (giống như tung xúc xắc).",
    example_code: `
import random
dice = random.randint(1, 6)
print(f"Xúc xắc ra số: {dice}")`,
    language: "python",
  },
  {
    id: 61,
    lesson_id: 29,
    title: "Đoán 1 lần",
    description:
      "Tạo 1 'secret_number' ngẫu nhiên (1-10). Yêu cầu người dùng 'Đoán số (1-10):'. Nhận 'guess'. Dùng 'if' để kiểm tra 'if guess == secret_number' và in 'Đúng' hoặc 'Sai'.",
    example_code: `
import random
secret_number = random.randint(1, 10)
guess = int(input("Đoán số (1-10): "))

if guess == secret_number:
    print(f"Đúng! Số bí mật là {secret_number}")
else:
    print(f"Sai! Số bí mật là {secret_number}")`,
    language: "python",
  },

  // Lesson 30: Project 2 - Đoán số 2 (ID: 30)
  {
    id: 62,
    lesson_id: 30,
    title: "Hoàn thành Game (Cao/Thấp)",
    description:
      "Hoàn thành trò chơi đoán số (như trong bài học), sử dụng 'while' để lặp lại, và 'if-elif' để đưa ra gợi ý 'Quá cao!' hoặc 'Quá thấp!'.",
    example_code: `
import random
secret = random.randint(1, 100)
guess = 0
print("Đoán số (1-100)")

while guess != secret:
    guess = int(input("Đoán của bạn: "))
    if guess < secret:
        print("Quá thấp!")
    elif guess > secret:
        print("Quá cao!")

print(f"Đúng rồi! Số đó là {secret}")`,
    language: "python",
  },
  {
    id: 63,
    lesson_id: 30,
    title: "Đếm số lần đoán",
    description:
      "Cải tiến bài tập trước: Tạo 1 biến 'count = 0' trước vòng lặp 'while'. Tăng 'count += 1' bên trong vòng lặp. Khi thắng, in ra 'Bạn đã đoán trong [count] lần'.",
    example_code: `
import random
secret = random.randint(1, 100)
guess = 0
count = 0
print("Đoán số (1-100)")

while guess != secret:
    guess = int(input("Đoán của bạn: "))
    count += 1 # Đếm số lần
    if guess < secret: print("Quá thấp!")
    elif guess > secret: print("Quá cao!")

print(f"Đúng! Số đó là {secret}. Bạn đoán trong {count} lần.")`,
    language: "python",
  },

  // Lesson 31: Project 3 - File (ID: 31)
  {
    id: 64,
    lesson_id: 31,
    title: "Ghi 3 dòng vào File",
    description:
      "Dùng 'with open(\"list.txt\", \"w\")' để ghi 3 tên (ví dụ: 'An', 'Bình', 'Cường') vào file. (Lưu ý thêm '\\n' để xuống dòng sau mỗi tên).",
    example_code: `
with open("list.txt", "w", encoding="utf-8") as f:
    f.write("An\\n")
    f.write("Bình\\n")
    f.write("Cường\\n")
print("Đã ghi file list.txt")`,
    language: "python",
  },
  {
    id: 65,
    lesson_id: 31,
    title: "Đọc file theo từng dòng (For loop)",
    description:
      "Dùng 'with open(\"list.txt\", \"r\")' và vòng lặp 'for line in f:' để đọc file (tạo ở bài trước). In ra từng dòng (sử dụng 'line.strip()' để xóa '\\n').",
    example_code: `
try:
    with open("list.txt", "r", encoding="utf-8") as f:
        print("Danh sách tên:")
        for line in f:
            print(f"- {line.strip()}")
except FileNotFoundError:
    print("Chưa có file list.txt")`,
    language: "python",
  },
  {
    id: 66,
    lesson_id: 31,
    title: "Đọc file và chuyển chữ hoa",
    description:
      "Đọc file 'list.txt', chuyển mỗi tên sang chữ hoa ('.upper()'), và ghi các tên đã chuyển sang chữ hoa vào 1 file mới 'list_upper.txt'.",
    example_code: `
try:
    with open("list.txt", "r", encoding="utf-8") as rf:
        with open("list_upper.txt", "w", encoding="utf-8") as wf:
            for line in rf:
                upper_name = line.strip().upper()
                wf.write(upper_name + "\\n")
    print("Đã tạo file list_upper.txt")
except FileNotFoundError:
    print("Chưa có file list.txt")`,
    language: "python",
  },
];
