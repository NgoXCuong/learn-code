export const mockLessons = [
  // === JavaScript (Course ID: 1) ===
  {
    id: 1,
    course_id: 1,
    chap: "Giới thiệu cơ bản",
    title: "Giới thiệu về JavaScript",
    content: `
JavaScript là một trong những ngôn ngữ lập trình phổ biến và quan trọng nhất trong thế giới công nghệ hiện nay. 
Ban đầu, JavaScript được tạo ra bởi Brendan Eich vào năm 1995 với mục đích giúp các trang web trở nên sống động hơn, có thể phản hồi và tương tác trực tiếp với người dùng. 
Trải qua hơn hai thập kỷ phát triển, JavaScript đã vượt xa vai trò ban đầu của nó và trở thành một công cụ không thể thiếu trong phát triển ứng dụng hiện đại.

Ngày nay, JavaScript không chỉ chạy trên trình duyệt web mà còn có thể hoạt động ở phía máy chủ (server-side) thông qua nền tảng Node.js, 
hoặc trong các ứng dụng di động, desktop và thậm chí cả thiết bị IoT. 
Điều này khiến JavaScript trở thành ngôn ngữ “đa năng” (versatile) mà bất kỳ lập trình viên nào cũng nên nắm vững.

Trong bài học này, bạn sẽ được tìm hiểu:

1. **JavaScript là gì?**
   - Là ngôn ngữ lập trình thông dịch, hướng đối tượng nhẹ, được thiết kế chủ yếu để thao tác với các phần tử HTML, CSS trên trang web.
   - Nó giúp trang web trở nên động (dynamic), ví dụ như hiển thị thông báo, xử lý sự kiện (event), xác thực biểu mẫu, hoặc thay đổi nội dung mà không cần tải lại trang.

2. **Vai trò của JavaScript trong phát triển web**
   - JavaScript là một trong **ba trụ cột** của phát triển web hiện đại:
     - **HTML**: Xây dựng cấu trúc trang web.
     - **CSS**: Thiết kế và định dạng giao diện.
     - **JavaScript**: Tạo logic, xử lý tương tác và hành vi của trang.
   - Kết hợp cả ba giúp xây dựng những ứng dụng web hoàn chỉnh, từ trang tĩnh đến các ứng dụng web động như Facebook, Gmail, hay YouTube.

3. **Cách chèn JavaScript vào trang HTML**
   - Có ba cách cơ bản để thêm mã JavaScript:
     - Viết trực tiếp trong thẻ " <
      script >
      " bên trong tệp HTML.
     - Liên kết tệp ".js" riêng bằng thuộc tính src.
     - Hoặc chèn inline trực tiếp vào thuộc tính HTML (ví dụ: "onclick", "onchange",…).

4. **Ứng dụng thực tế của JavaScript**
   - Xây dựng giao diện người dùng tương tác (UI/UX).
   - Phát triển ứng dụng web (React, Vue, Angular).
   - Xây dựng backend với Node.js.
   - Tạo ứng dụng di động (React Native, Ionic).
   - Phát triển game, ứng dụng máy tính, và AI đơn giản.

Kết thúc bài học này, bạn sẽ hiểu vì sao JavaScript lại được coi là “trái tim” của lập trình web hiện đại — 
và đây cũng sẽ là nền tảng vững chắc cho các bài học tiếp theo, nơi bạn bắt đầu viết và chạy những dòng mã JavaScript đầu tiên của mình.
`,
    example_code: `
// Thêm JavaScript vào file HTML bằng thẻ <script>
// <script>
//   alert("Xin chào!"); 
// </script>

// Hoặc viết trong file .js và liên kết:
// <script src="app.js"></script>

// Ví dụ trong console:
console.log("Hello JavaScript!");
console.log("Bạn có thể chạy mã này trong Console của trình duyệt (F12).");
    `,
    language: "javascript",
    readTime: "15 phút",
    difficulty: "Cơ bản",
    progress: 100,
  },
  {
    id: 2,
    course_id: 1,
    chap: "Giới thiệu cơ bản",
    title: "Biến và Kiểu dữ liệu",
    content: `
Biến là 'vùng chứa' được đặt tên để lưu trữ dữ liệu.
Chúng ta sử dụng 'var', 'let', và 'const' để khai báo biến.
- 'let': Dùng cho biến có thể thay đổi giá trị, có phạm vi khối (block-scoped).
- 'const': Dùng cho hằng số (biến không thể gán lại giá trị), có phạm vi khối.
- 'var': Cách khai báo cũ, có phạm vi hàm (function-scoped), nên hạn chế dùng.

Các kiểu dữ liệu cơ bản (primitive types):
- String: Chuỗi văn bản, ví dụ: "Hello"
- Number: Bất kỳ số nào, ví dụ: 100, 3.14
- Boolean: true hoặc false
- null: Đại diện cho 'không có gì', 'rỗng'.
- undefined: Biến đã được khai báo nhưng chưa được gán giá trị.
    `,
    example_code: `
// let (có thể thay đổi)
let message = "Xin chào";
message = "Tạm biệt"; // Hợp lệ
console.log(message);

// const (không thể gán lại)
const PI = 3.14;
// PI = 3.1415; // Lỗi!

// Kiểu dữ liệu
let name = "An"; // String
const age = 20; // Number
let isStudent = true; // Boolean
let car = null; // null (kiểu object)
let city; // undefined

console.log(typeof name); // "string"
console.log(typeof age); // "number"
    `,
    language: "javascript",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 40,
  },
  {
    id: 3,
    course_id: 1,
    chap: "Cấu trúc điều khiển",
    title: "Toán tử trong JavaScript",
    content: `
Toán tử cho phép chúng ta thực hiện các phép tính và so sánh.
- Toán tử số học: +, -, *, / (chia), % (chia lấy dư), ** (lũy thừa).
- Toán tử gán: = (gán), += (cộng và gán), -=, *=, /=.
- Toán tử so sánh:
  - == (so sánh bằng, tự động chuyển kiểu) - *Nên tránh*
  - === (so sánh bằng tuyệt đối, cả giá trị và kiểu) - *Nên dùng*
  - != (không bằng, tự động chuyển kiểu)
  - !== (không bằng tuyệt đối) - *Nên dùng*
  - >, <, >=, <=
- Toán tử logic:
  - && (VÀ - AND): Cả hai vế đều đúng thì trả về true.
  - || (HOẶC - OR): Một trong hai vế đúng thì trả về true.
  - ! (PHỦ ĐỊNH - NOT): Đảo ngược giá trị boolean.
    `,
    example_code: `
let a = 10;
let b = 5;
let c = "10";

// Số học
console.log(a + b); // 15
console.log(a % b); // 0 (10 chia 5 dư 0)

// Gán
a += 5; // Tương đương a = a + 5
console.log(a); // 15

// So sánh
console.log(a == c); // true (tự động chuyển "10" thành 10)
console.log(a === c); // false (vì a là number, c là string)
console.log(a > b); // true

// Logic
let isLoggedIn = true;
let isAdmin = false;

console.log(isLoggedIn && isAdmin); // false
console.log(isLoggedIn || isAdmin); // true
console.log(!isLoggedIn); // false
    `,
    language: "javascript",
    readTime: "15 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 4,
    course_id: 1,
    chap: "Cấu trúc điều khiển",
    title: "Hàm (Functions)",
    content: `
Hàm là một khối mã được thiết kế để thực hiện một tác vụ cụ thể. 
Hàm giúp tái sử dụng mã, làm cho chương trình dễ đọc và dễ bảo trì hơn.
Có 3 cách chính để khai báo hàm:
1. Function Declaration (Khai báo hàm): Dùng từ khóa 'function'.
2. Function Expression (Biểu thức hàm): Gán một hàm ẩn danh cho biến.
3. Arrow Function (Hàm mũi tên): Cú pháp ngắn gọn, thường dùng (ES6+).

Hàm có thể nhận đầu vào (gọi là 'tham số' - parameters) và trả về một giá trị (dùng từ khóa 'return').
    `,
    example_code: `
// 1. Function Declaration
function greet(name) {
  return "Xin chào " + name + "!";
}
console.log(greet("Bình")); // Gọi hàm

// 2. Function Expression
const add = function(a, b) {
  return a + b;
};
console.log("Tổng là: " + add(5, 3));

// 3. Arrow Function (ES6)
const subtract = (a, b) => {
  return a - b;
};
console.log("Hiệu là: " + subtract(10, 4));

// Arrow function ngắn gọn (nếu chỉ có 1 dòng return)
const multiply = (a, b) => a * b;
console.log("Tích là: " + multiply(6, 6));
    `,
    language: "javascript",
    readTime: "20 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 5,
    course_id: 1,
    chap: "Nâng cao",
    title: "Tương tác với DOM",
    content: `
DOM (Document Object Model) là cách mà trình duyệt biểu diễn cấu trúc của một trang HTML. Nó coi tài liệu HTML như một cây cấu trúc gồm các 'nút' (nodes).
JavaScript có thể tương tác với DOM để:
- Thay đổi nội dung HTML (ví dụ: thay đổi văn bản của một đoạn).
- Thay đổi thuộc tính (ví dụ: thay đổi 'src' của thẻ 'img').
- Thay đổi kiểu dáng CSS (ví dụ: thay đổi màu sắc).
- Phản hồi lại các sự kiện của người dùng (như click chuột, gõ phím).

Các phương thức phổ biến để chọn phần tử:
- document.getElementById('id'): Chọn phần tử theo ID.
- document.querySelector('selector'): Chọn phần tử đầu tiên khớp với CSS selector.
- document.querySelectorAll('selector'): Chọn tất cả phần tử khớp.
    `,
    example_code: `
/* Giả sử file HTML có:
<h1 id="title">Tiêu đề cũ</h1>
<button id="myButton">Click me</button>
*/

// 1. Chọn phần tử
const titleElement = document.getElementById("title");
const buttonElement = document.querySelector("#myButton");

// 2. Thay đổi nội dung
titleElement.textContent = "Tiêu đề mới!";

// 3. Thay đổi kiểu dáng (style)
titleElement.style.color = "blue";
titleElement.style.backgroundColor = "yellow";

// 4. Thêm sự kiện (Event Listener)
buttonElement.addEventListener("click", function() {
  alert("Bạn đã click vào nút!");
  titleElement.textContent = "Đã click!";
});
    `,
    language: "javascript",
    readTime: "22 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  // === Python (Course ID: 2) ===
  {
    id: 6,
    course_id: 2,
    chap: "Giới thiêu cơ bản",
    title: "Làm quen với Python",
    content: `
Python là ngôn ngữ lập trình bậc cao, thông dịch, nổi tiếng với cú pháp rõ ràng, dễ đọc.
Một điểm đặc biệt của Python là nó sử dụng 'thụt đầu dòng' (indentation) để xác định các khối mã (thay vì dùng dấu ngoặc nhọn {} như nhiều ngôn ngữ khác).
Python được sử dụng rộng rãi trong:
- Phát triển Web (với framework như Django, Flask).
- Khoa học dữ liệu, Machine Learning, AI.
- Tự động hóa (scripting).

Bài học này sẽ hướng dẫn bạn cách cài đặt Python và chạy chương trình đầu tiên.
    `,
    example_code: `
# Dùng hàm print() để in ra màn hình
print("Hello Python!")

# Khai báo biến (không cần khai báo kiểu)
name = "Python"
version = 3.10
print(f"Chào mừng bạn đến với {name} {version}") # f-string (cách định dạng chuỗi)
    `,
    language: "python",
    readTime: "12 phút",
    difficulty: "Cơ bản",
    progress: 60,
  },
  {
    id: 7,
    course_id: 2,
    chap: "Cấu trúc điều kiển",
    title: "Cấu trúc điều kiện và vòng lặp",
    content: `
Để kiểm soát luồng chương trình, ta dùng:
1. Cấu trúc điều kiện (if, elif, else):
   - 'if': Nếu điều kiện đúng, thực thi khối mã.
   - 'elif' (else if): Nếu 'if' trước đó sai, kiểm tra điều kiện này.
   - 'else': Nếu tất cả điều kiện trên đều sai, thực thi khối mã này.

2. Vòng lặp (for, while):
   - 'for': Dùng để lặp qua một chuỗi (sequence) như list, tuple, string, hoặc dùng với 'range()'.
   - 'while': Lặp lại khối mã chừng nào điều kiện còn đúng.
    `,
    example_code: `
# --- Điều kiện ---
age = 18

if age < 13:
    print("Bạn là trẻ em.")
elif age < 18:
    print("Bạn là thanh thiếu niên.")
else:
    print("Bạn là người lớn.")

# --- Vòng lặp For ---
print("Vòng lặp For với range:")
# range(5) tạo ra chuỗi số 0, 1, 2, 3, 4
for i in range(5):
    print(i)

print("Vòng lặp For với List:")
fruits = ["táo", "chuối", "cam"]
for fruit in fruits:
    print(fruit)

# --- Vòng lặp While ---
print("Vòng lặp While:")
count = 0
while count < 3:
    print(f"Số đếm: {count}")
    count += 1 # Tương đương count = count + 1
    `,
    language: "python",
    readTime: "20 phút",
    difficulty: "Trung bình",
    progress: 20,
  },
  {
    id: 8,
    course_id: 2,
    chap: "Cấu trúc điều kiển",
    title: "Cấu trúc dữ liệu: List",
    content: `
List (danh sách) là một cấu trúc dữ liệu cơ bản và mạnh mẽ trong Python.
- List có thứ tự, có thể thay đổi (mutable).
- List có thể chứa các phần tử thuộc nhiều kiểu dữ liệu khác nhau.
- List được định nghĩa bằng cặp dấu ngoặc vuông [].

Bạn sẽ học cách:
- Tạo list.
- Truy cập phần tử (indexing), kể cả chỉ số âm (bắt đầu từ -1 là phần tử cuối).
- Cắt list (slicing).
- Các phương thức phổ biến: .append(), .pop(), .sort(), .reverse().
- Dùng hàm len() để lấy độ dài list.
    `,
    example_code: `
# Tạo list
numbers = [1, 5, 2, 8, 4]
mixed_list = [1, "hello", True, 3.5]

# Truy cập phần tử (index bắt đầu từ 0)
print(f"Phần tử đầu tiên: {numbers[0]}") # 1
print(f"Phần tử cuối cùng: {numbers[-1]}") # 4

# Cắt list (slicing) [start:stop]
print(f"Từ index 1 đến 3: {numbers[1:4]}") # [5, 2, 8]

# Thêm phần tử vào cuối
numbers.append(10)
print(f"Sau khi append: {numbers}")

# Xóa phần tử cuối (hoặc tại index cụ thể)
last_item = numbers.pop()
print(f"Phần tử bị xóa: {last_item}")
print(f"Sau khi pop: {numbers}")

# Sắp xếp list (thay đổi list gốc)
numbers.sort()
print(f"Sau khi sort: {numbers}")

# Độ dài list
print(f"Độ dài list: {len(numbers)}")
    `,
    language: "python",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 9,
    course_id: 2,
    chap: "Kiến thức nâng cao",
    title: "Hàm (Functions) trong Python",
    content: `
Hàm (function) là khối mã có thể tái sử dụng, được định nghĩa bằng từ khóa 'def'.
- Hàm giúp chia chương trình thành các phần nhỏ, dễ quản lý.
- Hàm có thể nhận 'tham số' (parameters) và trả về giá trị bằng 'return'.
- Nếu hàm không có 'return', nó ngầm trả về 'None'.

Ta cũng có thể định nghĩa 'tham số mặc định' (default parameters) cho hàm.
    `,
    example_code: `
# Định nghĩa hàm đơn giản
def greet():
    print("Xin chào mọi người!")

# Gọi hàm
greet()

# Hàm có tham số
def greet_person(name):
    print(f"Xin chào, {name}! Rất vui được gặp bạn.")

greet_person("An")
greet_person("Bình")

# Hàm có giá trị trả về (return)
def add(a, b):
    return a + b

sum_result = add(10, 5)
print(f"Tổng là: {sum_result}")

# Hàm có tham số mặc định
def greet_person_default(name="bạn"):
    print(f"Xin chào, {name}!")

greet_person_default() # Dùng giá trị mặc định
greet_person_default("Hoa") # Dùng giá trị được truyền vào
    `,
    language: "python",
    readTime: "16 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 10,
    course_id: 2,
    chap: "Cấu trúc điều kiển",
    title: "Đọc và Ghi File",
    content: `
Làm việc với file là một tác vụ phổ biến. Python cung cấp hàm 'open()' để xử lý file.
Cú pháp tốt nhất để làm việc với file là dùng 'with open(...) as ...',
vì nó tự động đóng file sau khi hoàn thành, ngay cả khi có lỗi xảy ra.

Các chế độ (mode) mở file phổ biến:
- 'r' (Read): Mặc định. Đọc file (file phải tồn tại).
- 'w' (Write): Ghi file. Sẽ tạo file mới nếu chưa có, hoặc *xóa sạch* (overwrite) nội dung file cũ nếu đã tồn tại.
- 'a' (Append): Nối vào cuối file. Sẽ tạo file mới nếu chưa có.
- 'r+': Đọc và ghi.
    `,
    example_code: `
# --- Ghi file (Write) ---
# Chế độ 'w' sẽ tạo file 'greeting.txt' hoặc ghi đè nếu đã có
with open("greeting.txt", "w", encoding="utf-8") as f:
    f.write("Xin chào file!\n")
    f.write("Đây là dòng thứ hai.\n")

print("Đã ghi file greeting.txt")

# --- Nối file (Append) ---
# Chế độ 'a' sẽ thêm vào cuối file
with open("greeting.txt", "a", encoding="utf-8") as f:
    f.write("Đây là dòng được thêm vào.\n")

print("Đã thêm vào file greeting.txt")

# --- Đọc file (Read) ---
print("\nĐọc toàn bộ file:")
with open("greeting.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

print("\nĐọc file theo từng dòng:")
with open("greeting.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip()) # .strip() để xóa ký tự \n ở cuối dòng
    `,
    language: "python",
    readTime: "18 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  // === C++ (Course ID: 3) ===
  {
    id: 11,
    course_id: 3,
    chap: "Giới thiệu cơ bản",
    title: "Chương trình C++ đầu tiên",
    content: `
C++ là ngôn ngữ lập trình mạnh mẽ, hướng đối tượng, được phát triển từ C.
Nó được dùng để viết hệ điều hành, trình duyệt, game, và các ứng dụng hiệu năng cao.
Một chương trình C++ cơ bản bao gồm:
- '#include <iostream>': Chỉ thị tiền xử lý, yêu cầu trình biên dịch 'nạp' thư viện 'iostream' (Input/Output Stream) để sử dụng 'cout'.
- 'using namespace std;': Cho phép sử dụng các tên từ namespace (không gian tên) 'std' mà không cần tiền tố (ví dụ: dùng 'cout' thay vì 'std::cout').
- 'int main() { ... }': Hàm chính. Đây là nơi chương trình bắt đầu thực thi.
- 'cout << "..."': (Character Output) Dùng để in dữ liệu ra console.
- 'return 0;': Báo hiệu cho hệ điều hành rằng chương trình đã kết thúc thành công.
    `,
    example_code: `
// Bao gồm thư viện chuẩn để nhập/xuất
#include <iostream>

// Sử dụng không gian tên std
using namespace std;

// Hàm main - điểm bắt đầu của mọi chương trình C++
int main() {
    // cout là đối tượng dùng để in ra màn hình
    // << là toán tử chèn (insertion operator)
    // endl (end line) dùng để xuống dòng, tương tự \n
    cout << "Hello C++!" << endl;
    
    cout << "Bạn có thể in " << "nhiều giá trị " << "trên cùng 1 dòng." << endl;
    cout << "Số: " << 100 << endl;
    
    // Trả về 0 khi kết thúc thành công
    return 0;
}`,
    language: "cpp",
    readTime: "15 phút",
    difficulty: "Cơ bản",
    progress: 80,
  },
  {
    id: 12,
    course_id: 3,
    chap: "Giới thiệu cơ bản",
    title: "Biến và Toán tử trong C++",
    content: `
C++ là ngôn ngữ 'kiểu tĩnh' (statically typed), nghĩa là bạn phải khai báo kiểu dữ liệu của biến trước khi sử dụng.
Các kiểu dữ liệu cơ bản phổ biến:
- int: Số nguyên (ví dụ: 10, -5, 0)
- double / float: Số thực (ví dụ: 3.14, -0.5)
- char: Một ký tự (ví dụ: 'A', 'a')
- bool: Đúng (true) hoặc Sai (false)
- string: Chuỗi ký tự (cần '#include <string>')

Toán tử tương tự JavaScript:
- Số học: +, -, *, /, %
- So sánh: ==, !=, >, <, >=, <=
- Logic: && (VÀ), || (HOẶC), ! (PHỦ ĐỊNH)
    `,
    example_code: `
#include <iostream>
#include <string> // Cần thiết để dùng kiểu 'string'
using namespace std;

int main() {
    // Khai báo và khởi tạo biến
    int age = 25;
    double price = 19.99;
    char grade = 'A';
    bool isStudent = true;
    string name = "Nguyễn Văn A";

    cout << "Tên: " << name << ", Tuổi: " << age << endl;
    
    // Ví dụ toán tử
    int x = 10;
    int y = 3;
    
    cout << "x + y = " << (x + y) << endl;
    cout << "x / y = " << (x / y) << endl; // Phép chia số nguyên (kết quả là 3)
    cout << "x % y = " << (x % y) << endl; // Phép chia lấy dư (kết quả là 1)
    
    // Để chia số thực, ít nhất 1 vế phải là số thực
    cout << "x / 3.0 = " << (x / 3.0) << endl; // Kết quả là 3.333...

    return 0;
}`,
    language: "cpp",
    readTime: "16 phút",
    difficulty: "Cơ bản",
    progress: 30,
  },
  {
    id: 13,
    course_id: 3,
    course_id: 3,
    chap: "Giới thiệu cơ bản",
    title: "Nhập dữ liệu từ bàn phím",
    content: `
Chúng ta sử dụng 'cin' (Character Input) từ thư viện 'iostream' để nhận đầu vào từ người dùng qua bàn phím.
'cin' sử dụng toán tử trích xuất (extraction operator) '>>' để lấy dữ liệu từ console và lưu vào biến.

Lưu ý: 'cin' mặc định dừng đọc khi gặp ký tự khoảng trắng (space, tab, enter).
    `,
    example_code: `
#include <iostream>
#include <string>
using namespace std;

int main() {
    int age;
    
    cout << "Vui lòng nhập tuổi của bạn: ";
    cin >> age; // Dừng lại chờ người dùng nhập và nhấn Enter
    
    cout << "Năm sau, bạn sẽ " << (age + 1) << " tuổi." << endl;
    
    // Nhập nhiều giá trị
    int a, b;
    cout << "Nhập 2 số (cách nhau bằng khoảng trắng): ";
    cin >> a >> b;
    cout << "Tổng của chúng là: " << (a + b) << endl;
    
    // Lưu ý khi nhập string
    string name;
    cout << "Nhập tên của bạn: ";
    cin >> name; // Chỉ đọc được từ đầu tiên (ví dụ: "Nguyễn")
    cout << "Chào " << name << endl;

    // (Để đọc cả dòng, ta sẽ dùng hàm getline() - sẽ học sau)
    
    return 0;
}`,
    language: "cpp",
    readTime: "14 phút",
    difficulty: "Cơ bản",
    progress: 10,
  },
  {
    id: 14,
    course_id: 3,
    chap: "Cấu trúc",
    title: "Câu lệnh điều kiện If-Else",
    content: `
Câu lệnh 'if' cho phép chương trình rẽ nhánh, thực thi các khối mã khác nhau dựa trên một điều kiện logic (đúng hoặc sai).
- 'if (condition)': Nếu 'condition' là true, thực thi khối mã bên trong.
- 'else if (condition)': Nếu 'if' trước đó là false, kiểm tra 'condition' này.
- 'else': Nếu tất cả các 'if' và 'else if' trước đó đều là false, thực thi khối mã của 'else'.

Bạn có thể lồng (nest) các câu lệnh if-else vào nhau.
    `,
    example_code: `
#include <iostream>
using namespace std;

int main() {
    int diem;
    cout << "Nhập điểm của bạn (0-10): ";
    cin >> diem;

    // Cấu trúc if - else if - else
    if (diem >= 9) {
        cout << "Xuất sắc!" << endl;
    } 
    else if (diem >= 8) {
        cout << "Giỏi!" << endl;
    }
    else if (diem >= 6.5) {
        cout << "Khá!" << endl;
    }
    else if (diem >= 5) {
        cout << "Trung bình." << endl;
    }
    else {
        cout << "Yếu. Cần cố gắng thêm!" << endl;
    }

    // Ví dụ if lồng nhau
    int n = 10;
    if (n > 0) {
        cout << "n là số dương." << endl;
        if (n % 2 == 0) {
            cout << "Và n là số chẵn." << endl;
        } else {
            cout << "Và n là số lẻ." << endl;
        }
    }

    return 0;
}`,
    language: "cpp",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 15,
    course_id: 3,
    title: "Vòng lặp For",
    content: `
Vòng lặp 'for' là lựa chọn lý tưởng khi bạn biết trước số lần lặp.
Cú pháp của vòng lặp 'for' gồm 3 phần, phân cách bởi dấu chấm phẩy ';':
for ( [khởi tạo] ; [điều kiện] ; [cập nhật] ) {
    // Khối mã lặp lại
}

1. [khởi tạo]: Thực thi một lần duy nhất trước khi vòng lặp bắt đầu (thường dùng để khai báo biến đếm, ví dụ: 'int i = 0').
2. [điều kiện]: Được kiểm tra *trước* mỗi lần lặp. Nếu là true, khối mã được thực thi. Nếu là false, vòng lặp kết thúc.
3. [cập nhật]: Thực thi *sau* mỗi lần lặp (thường dùng để tăng/giảm biến đếm, ví dụ: 'i++', 'i--').
    `,
    example_code: `
#include <iostream>
using namespace std;

int main() {
    // Ví dụ 1: Đếm từ 0 đến 4
    cout << "Đếm xuôi:" << endl;
    for (int i = 0; i < 5; i++) {
        // i = 0 (đúng) -> in 0 -> i++ (i=1)
        // i = 1 (đúng) -> in 1 -> i++ (i=2)
        // ...
        // i = 4 (đúng) -> in 4 -> i++ (i=5)
        // i = 5 (sai) -> kết thúc
        cout << i << " ";
    }
    cout << endl; // Xuống dòng

    // Ví dụ 2: Đếm ngược từ 5 về 1
    cout << "Đếm ngược:" << endl;
    for (int i = 5; i >= 1; i--) {
        cout << i << " ";
    }
    cout << endl;
    
    // Ví dụ 3: Tính tổng các số từ 1 đến 10
    int tong = 0;
    for (int i = 1; i <= 10; i++) {
        tong += i; // tong = tong + i
    }
    cout << "Tổng từ 1 đến 10 là: " << tong << endl;
    
    return 0;
}`,
    language: "cpp",
    readTime: "18 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  // === Java (Course ID: 4) ===
  {
    id: 16,
    course_id: 4,
    title: "Giới thiệu Java và JVM",
    content: `
Java là ngôn ngữ lập trình hướng đối tượng, bậc cao, kiểu tĩnh mạnh.
Đặc điểm nổi tiếng nhất của Java là "Write Once, Run Anywhere" (Viết một lần, chạy mọi nơi).
Điều này đạt được nhờ Máy ảo Java (JVM - Java Virtual Machine).
Quy trình:
1. Bạn viết mã nguồn Java (file .java).
2. Trình biên dịch Java (javac) biên dịch mã nguồn thành 'bytecode' (file .class).
3. Bytecode là mã trung gian, không phải mã máy.
4. Khi bạn chạy chương trình, JVM trên máy của bạn (Windows, Mac, Linux) sẽ 'thông dịch' bytecode này thành mã máy cụ thể cho hệ điều hành đó.

Java được sử dụng để xây dựng ứng dụng doanh nghiệp lớn, ứng dụng Android, ứng dụng web (back-end), và nhiều hơn nữa.
    `,
    example_code: `
// Đây là một bình luận (comment) một dòng trong Java

/*
Đây là một bình luận
trên nhiều dòng.
Trình biên dịch sẽ bỏ qua nó.
*/

// Mọi chương trình Java đều phải nằm trong một 'class'.
public class Introduction {
    // Mã sẽ được đặt ở đây...
}
    `,
    language: "java",
    readTime: "12 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 17,
    course_id: 4,
    title: "Chương trình Java đầu tiên",
    content: `
Mọi ứng dụng Java đều bắt đầu thực thi từ hàm 'main'.
Cấu trúc cơ bản của một chương trình "Hello, World!":
- 'public class HelloWorld': Khai báo một 'lớp' (class) tên là 'HelloWorld'. Tên file *phải* trùng với tên lớp public (ví dụ: 'HelloWorld.java').
- 'public static void main(String[] args)': Đây là chữ ký (signature) bắt buộc của hàm main.
  - 'public': Có thể truy cập từ bất cứ đâu.
  - 'static': Phương thức thuộc về lớp, không cần tạo đối tượng để gọi.
  - 'void': Hàm này không trả về giá trị nào.
  - 'main': Tên hàm.
  - '(String[] args)': Tham số đầu vào, là một mảng các chuỗi (thường dùng cho tham số dòng lệnh).
- 'System.out.println(...)': Dùng để in một dòng ra console.
    `,
    example_code: `
// Tên file phải là HelloWorld.java
public class HelloWorld {

    // Đây là điểm bắt đầu của chương trình
    public static void main(String[] args) {
        
        // In ra "Hello Java!" và xuống dòng
        System.out.println("Hello Java!");
        
        // System.out.print() sẽ in nhưng không xuống dòng
        System.out.print("Đây là dòng 1.");
        System.out.print(" Đây là dòng 2.");
        
        System.out.println(); // In một dòng trống
        
        int number = 100;
        System.out.println("Bạn có thể in biến: " + number);
    }
}`,
    language: "java",
    readTime: "15 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 18,
    course_id: 4,
    title: "Biến và Kiểu dữ liệu nguyên thủy",
    content: `
Java là kiểu tĩnh, bạn phải khai báo kiểu dữ liệu cho biến.
Java có 8 kiểu dữ liệu nguyên thủy (primitive types):
- Số nguyên:
  - byte (8-bit)
  - short (16-bit)
  - int (32-bit) - *Phổ biến nhất*
  - long (64-bit) - Dùng 'L' ở cuối (ví dụ: 1000L)
- Số thực (dấu phẩy động):
  - float (32-bit) - Dùng 'f' ở cuối (ví dụ: 3.14f)
  - double (64-bit) - *Phổ biến nhất cho số thực*
- Ký tự:
  - char (16-bit, Unicode): Dùng dấu nháy đơn (ví dụ: 'A', '1')
- Logic:
  - boolean (true hoặc false)

'String' (chuỗi) KHÔNG phải là kiểu nguyên thủy, nó là một 'lớp' (Class), nhưng được sử dụng rất thường xuyên.
    `,
    example_code: `
public class Variables {
    public static void main(String[] args) {
        // Kiểu số nguyên
        int age = 25;
        long worldPopulation = 8000000000L;
        
        // Kiểu số thực
        double price = 19.99;
        float pi = 3.14f;
        
        // Kiểu ký tự
        char grade = 'A';
        
        // Kiểu logic
        boolean isJavaFun = true;
        
        // Kiểu chuỗi (Class)
        String name = "Java Developer";

        System.out.println("Tên: " + name);
        System.out.println("Tuổi: " + age);
        System.out.println("Điểm: " + grade);
        System.out.println("Giá: " + price);
        System.out.println("Java vui? " + isJavaFun);
        
        // Toán tử
        int a = 10;
        int b = 3;
        System.out.println("Phép chia nguyên: " + (a / b)); // Kết quả là 3
    }
}`,
    language: "java",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 19,
    course_id: 4,
    title: "Vòng lặp và Điều kiện",
    content: `
Giống như C++, Java sử dụng cú pháp tương tự cho điều kiện và vòng lặp.
- Điều kiện: 'if', 'else if', 'else'.
- Lựa chọn (Switch): 'switch', 'case', 'break', 'default'. Dùng để so sánh một biến với nhiều giá trị hằng số.
- Vòng lặp:
  - 'for': Khi biết trước số lần lặp.
  - 'while': Khi lặp chừng nào điều kiện còn đúng (kiểm tra điều kiện trước).
  - 'do-while': Thực thi ít nhất 1 lần, sau đó kiểm tra điều kiện.
    `,
    example_code: `
public class LoopsAndConditions {
    public static void main(String[] args) {
        
        // --- IF-ELSE ---
        int score = 85;
        if (score >= 90) {
            System.out.println("Tuyệt vời!");
        } else if (score >= 70) {
            System.out.println("Tốt!");
        } else {
            System.out.println("Cần cố gắng.");
        }
        
        // --- SWITCH-CASE ---
        int dayOfWeek = 1; // 1 = Thứ 2, 2 = Thứ 3, ...
        switch (dayOfWeek) {
            case 1:
                System.out.println("Hôm nay là Thứ 2.");
                break; // Rất quan trọng!
            case 2:
                System.out.println("Hôm nay là Thứ 3.");
                break;
            default:
                System.out.println("Một ngày khác trong tuần.");
        }

        // --- FOR LOOP ---
        System.out.println("Vòng lặp For:");
        for (int i = 0; i < 5; i++) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        // --- WHILE LOOP ---
        System.out.println("Vòng lặp While:");
        int count = 0;
        while (count < 3) {
            System.out.println("Count = " + count);
            count++;
        }
    }
}`,
    language: "java",
    readTime: "20 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 20,
    course_id: 4,
    title: "Giới thiệu Lớp và Đối tượng (OOP)",
    content: `
Java là ngôn ngữ Lập trình Hướng đối tượng (OOP). Mọi thứ trong Java đều liên quan đến Lớp (Class) và Đối tượng (Object).
- Lớp (Class): Là một 'bản thiết kế' hoặc 'khuôn mẫu' (blueprint) để tạo ra các đối tượng. Nó định nghĩa các 'thuộc tính' (attributes/fields - là các biến) và 'phương thức' (methods - là các hàm) mà đối tượng sẽ có.
- Đối tượng (Object): Là một 'thể hiện' (instance) của một lớp. Khi bạn tạo một đối tượng, nó sẽ có các thuộc tính và phương thức được định nghĩa trong lớp.

Ví dụ: 
- Lớp: 'Car' (Xe hơi)
- Thuộc tính: 'color' (màu sắc), 'brand' (hãng), 'currentSpeed' (tốc độ hiện tại)
- Phương thức: 'startEngine()' (khởi động máy), 'accelerate()' (tăng tốc)
- Đối tượng: 'myCar', 'yourCar' (là các chiếc xe cụ thể)
    `,
    example_code: `
// 1. Định nghĩa Lớp (thường trong file Car.java)
class Car {
    // Thuộc tính (Attributes/Fields)
    String color = "Đỏ";
    String brand = "Vinfast";
    int currentSpeed = 0;

    // Phương thức (Methods)
    void startEngine() {
        System.out.println("Động cơ đã khởi động!");
    }
    
    void accelerate(int amount) {
        currentSpeed += amount;
        System.out.println("Tăng tốc... Tốc độ hiện tại: " + currentSpeed + " km/h");
    }
}

// 2. Sử dụng Lớp để tạo Đối tượng (trong file Main.java)
public class Main {
    public static void main(String[] args) {
        // Tạo một đối tượng (một thể hiện) từ lớp Car
        Car myCar = new Car(); // 'new Car()' gọi constructor
        
        // Truy cập thuộc tính
        System.out.println("Màu xe của tôi: " + myCar.color);
        System.out.println("Tốc độ ban đầu: " + myCar.currentSpeed);
        
        // Gọi phương thức
        myCar.startEngine();
        myCar.accelerate(50);
        myCar.accelerate(20);
        
        // Tạo đối tượng thứ hai
        Car yourCar = new Car();
        yourCar.color = "Xanh"; // Thay đổi thuộc tính của đối tượng này
        System.out.println("Màu xe của bạn: " + yourCar.color);
    }
}`,
    language: "java",
    readTime: "25 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  // === C# (Course ID: 5) ===
  {
    id: 21,
    course_id: 5,
    title: "Giới thiệu C# và .NET",
    content: `
C# (phát âm là "C-Sharp") là ngôn ngữ lập trình hiện đại, hướng đối tượng, kiểu tĩnh, do Microsoft phát triển.
C# có cú pháp rất giống với Java và C++.
Nó chạy trên nền tảng .NET (trước đây là .NET Framework, nay là .NET Core/ .NET 5+), một môi trường thực thi và thư viện lớp phong phú.
Với C#, bạn có thể xây dựng:
- Ứng dụng Desktop (Windows Forms, WPF, MAUI).
- Ứng dụng Web (ASP.NET Core).
- Dịch vụ Web, Microservices.
- Game (rất phổ biến với Unity Engine).
- Ứng dụng di động (Xamarin, MAUI).
    `,
    example_code: `
// C# cũng dùng bình luận một dòng (//)
/*
Và bình luận
trên nhiều dòng.
*/

// Mọi thứ trong C# cũng được tổ chức bằng 'namespace' và 'class'.
// 'namespace' giúp tổ chức mã và tránh xung đột tên.
namespace MyFirstApp
{
    // 'class' là bản thiết kế cho đối tượng.
    class Program
    {
        // Đây là điểm bắt đầu của ứng dụng console.
        static void Main(string[] args)
        {
            // (Mã sẽ nằm ở đây)
        }
    }
}
    `,
    language: "csharp",
    readTime: "12 phút",
    difficulty: "Cơ bản",
    progress: 100,
  },
  {
    id: 22,
    course_id: 5,
    title: "Chương trình Console đầu tiên",
    content: `
Để viết chương trình C#, bạn thường dùng Visual Studio hoặc Visual Studio Code.
Một chương trình console cơ bản:
- 'using System;': Nạp thư viện 'System', nơi chứa các lớp cơ bản như 'Console'.
- 'namespace HelloWorld': Khai báo không gian tên cho dự án.
- 'class Program': Lớp chứa điểm vào của chương trình.
- 'static void Main(string[] args)': Hàm chính (giống hệt Java).
- 'Console.WriteLine(...)': Dùng để in một dòng ra console (tương tự 'System.out.println' của Java).
- 'Console.ReadLine()': Dùng để đọc một dòng từ người dùng (thường dùng để giữ cửa sổ console không bị đóng ngay).
    `,
    example_code: `
// Nạp thư viện System
using System;

// Khai báo không gian tên
namespace HelloWorld
{
    // Khai báo lớp
    class Program
    {
        // Hàm Main
        static void Main(string[] args)
        {
            // In ra console và xuống dòng
            Console.WriteLine("Hello C#!");
            
            // In nhưng không xuống dòng
            Console.Write("Đây là dòng 1.");
            Console.Write(" Đây là dòng 2.");
            Console.WriteLine(); // Xuống dòng
            
            // In biến
            int version = 10;
            // Dùng nội suy chuỗi (string interpolation) với dấu $
            Console.WriteLine($"Bạn đang dùng C# {version}"); 
            
            // Đọc một phím để giữ cửa sổ console
            Console.WriteLine("Nhấn Enter để thoát...");
            Console.ReadLine(); 
        }
    }
}`,
    language: "csharp",
    readTime: "15 phút",
    difficulty: "Cơ bản",
    progress: 70,
  },
  {
    id: 23,
    course_id: 5,
    title: "Biến, Kiểu dữ liệu và Nhập liệu",
    content: `
C# có hệ thống kiểu dữ liệu tương tự Java, nhưng có một số khác biệt về tên gọi:
- 'int', 'long', 'double', 'float', 'bool', 'char' (tương tự Java).
- 'string': Kiểu chuỗi (chú ý: 's' viết thường, khác với 'String' của Java).
- 'decimal': Kiểu số thực có độ chính xác rất cao (128-bit), chuyên dùng cho tính toán tài chính (dùng hậu tố 'm', ví dụ: 19.99m).

Để đọc dữ liệu từ người dùng, ta dùng 'Console.ReadLine()'. 
Lưu ý: 'Console.ReadLine()' luôn trả về một 'string'. Nếu bạn cần nhập số, bạn phải 'chuyển đổi' (convert/parse) nó.
    `,
    example_code: `
using System;
namespace InputTest
{
    class Program
    {
        static void Main(string[] args)
        {
            // Khai báo biến
            int age = 30;
            double weight = 65.5;
            decimal balance = 1000.75m; // Dùng 'm' cho decimal
            bool isActive = true;
            string fullName = "Trần Văn B";

            Console.WriteLine($"Tên: {fullName}, Số dư: {balance}");

            // --- Nhập liệu ---
            Console.Write("Vui lòng nhập tên của bạn: ");
            string nameInput = Console.ReadLine();

            Console.WriteLine($"Xin chào, {nameInput}!");

            // --- Nhập số (phải chuyển đổi) ---
            Console.Write("Vui lòng nhập tuổi của bạn: ");
            string ageInput = Console.ReadLine();
            
            // Chuyển đổi string sang int
            // (Cách an toàn hơn là dùng int.TryParse())
            int ageNumber = Convert.ToInt32(ageInput); 
            
            Console.WriteLine($"Năm sau bạn sẽ {ageNumber + 1} tuổi.");
        }
    }
}`,
    language: "csharp",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 20,
  },
  {
    id: 24,
    course_id: 5,
    title: "Cấu trúc điều khiển (If/Else, Switch)",
    content: `
Cú pháp 'if-else' trong C# giống hệt C++ và Java.
'switch' (hay 'switch-case') cũng rất giống, dùng để so sánh một biến với nhiều giá trị hằng.
Từ C# 7 trở đi, 'switch' đã được nâng cấp mạnh mẽ, cho phép so sánh kiểu, thêm điều kiện 'when' (Pattern Matching), nhưng ở mức cơ bản, chúng ta dùng nó cho các giá trị hằng.
    `,
    example_code: `
using System;
namespace ControlFlow
{
    class Program
    {
        static void Main(string[] args)
        {
            // --- IF-ELSE ---
            Console.Write("Nhập một số: ");
            int number = Convert.ToInt32(Console.ReadLine());

            if (number > 0)
            {
                Console.WriteLine("Số dương.");
            }
            else if (number < 0)
            {
                Console.WriteLine("Số âm.");
            }
            else
            {
                Console.WriteLine("Số không.");
            }
            
            // --- SWITCH-CASE ---
            Console.Write("Nhập 1 ngày trong tuần (1-7): ");
            int day = Convert.ToInt32(Console.ReadLine());
            string dayName;
            
            switch (day)
            {
                case 1:
                    dayName = "Chủ Nhật";
                    break;
                case 2:
                    dayName = "Thứ Hai";
                    break;
                case 3:
                    dayName = "Thứ Ba";
                    break;
                case 4:
                    dayName = "Thứ Tư";
                    break;
                case 5:
                    dayName = "Thứ Năm";
                    break;
                case 6:
                    dayName = "Thứ Sáu";
                    break;
                case 7:
                    dayName = "Thứ Bảy";
                    break;
                default:
                    dayName = "Không hợp lệ!";
                    break;
            }
            
            Console.WriteLine($"Hôm nay là: {dayName}");
        }
    }
}`,
    language: "csharp",
    readTime: "16 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 25,
    course_id: 5,
    title: "Vòng lặp (For, While, Foreach)",
    content: `
C# hỗ trợ các vòng lặp tiêu chuẩn:
- 'for': Cú pháp giống hệt C++/Java. Dùng khi biết số lần lặp.
- 'while': Cú pháp giống hệt C++/Java. Dùng khi lặp theo điều kiện.
- 'do-while': Cú pháp giống hệt C++/Java. Lặp ít nhất 1 lần.
- 'foreach': Rất hữu ích. Dùng để lặp qua tất cả các phần tử trong một 'tập hợp' (collection) như Mảng (Array) hoặc Danh sách (List) mà không cần quan tâm đến chỉ số (index).
    `,
    example_code: `
using System;
using System.Collections.Generic; // Cần cho List

namespace Loops
{
    class Program
    {
        static void Main(string[] args)
        {
            // --- FOR LOOP ---
            Console.WriteLine("Vòng lặp For:");
            for (int i = 0; i < 5; i++)
            {
                Console.Write(i + " ");
            }
            Console.WriteLine();
            
            // --- WHILE LOOP ---
            Console.WriteLine("Vòng lặp While:");
            int n = 0;
            while (n < 3)
            {
                Console.WriteLine($"n = {n}");
                n++;
            }
            
            // --- FOREACH LOOP ---
            Console.WriteLine("Vòng lặp Foreach với Mảng:");
            string[] names = { "An", "Bình", "Cường", "Dũng" };
            
            // "foreach (kiểu phần_tử tên_biến in tập_hợp)"
            foreach (string name in names)
            {
                Console.WriteLine($"Xin chào, {name}");
            }
            
            Console.WriteLine("Vòng lặp Foreach với List:");
            List<int> numbers = new List<int> { 10, 20, 30 };
            foreach (int num in numbers)
            {
                Console.WriteLine(num);
            }
        }
    }
}`,
    language: "csharp",
    readTime: "18 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 26,
    course_id: 5,
    title: "Giới thiệu Windows Forms (WinForms)",
    content: `
Windows Forms (WinForms) là một framework GUI (Giao diện đồ họa người dùng) của .NET để xây dựng các ứng dụng desktop cho Windows.
Nó cung cấp một trình thiết kế 'kéo-thả' (Drag-and-Drop) trực quan trong Visual Studio, cho phép bạn dễ dàng thêm các điều khiển (controls) như Nút (Button), Hộp văn bản (TextBox), Nhãn (Label) vào một 'Form' (cửa sổ).

Lập trình WinForms dựa trên 'sự kiện' (event-driven). Thay vì chạy từ trên xuống dưới, chương trình sẽ 'chờ' người dùng tương tác (ví dụ: click vào nút, gõ chữ) và sau đó thực thi mã tương ứng (gọi là 'event handler' - trình xử lý sự kiện).
    `,
    example_code: `
/*
Bạn không gõ mã này thủ công. 
Khi bạn ở trong trình thiết kế WinForms (ví dụ: Form1.cs [Design]), 
bạn kéo một Button (tên là button1) vào Form, 
sau đó click đúp vào Button đó.
Visual Studio sẽ tự động tạo ra hàm (trình xử lý sự kiện) này.
*/

using System;
using System.Windows.Forms;

public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
    }

    // Đây là trình xử lý sự kiện được tạo tự động
    private void button1_Click(object sender, EventArgs e)
    {
        // Mã này sẽ chạy KHI người dùng click vào button1
        
        // Giả sử bạn có 1 TextBox tên là 'textBox1'
        // và 1 Label tên là 'label1'
        
        string userName = textBox1.Text;
        label1.Text = "Xin chào, " + userName + "!";
        
        // Hiển thị một hộp thoại
        MessageBox.Show("Đã chào!");
    }
}
`,
    language: "csharp",
    readTime: "20 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  // === Python Projects (Course ID: 6) ===
  {
    id: 27,
    course_id: 6,
    title: "Dự án 1: Máy tính đơn giản",
    content: `
Bắt đầu dự án thực tế đầu tiên! Chúng ta sẽ xây dựng một máy tính bỏ túi cơ bản.
Yêu cầu:
1. Hỏi người dùng nhập số thứ nhất.
2. Hỏi người dùng nhập phép toán (+, -, *, /).
3. Hỏi người dùng nhập số thứ hai.
4. Thực hiện phép tính và in ra kết quả.

Để làm được bài này, bạn cần kết hợp:
- Hàm 'input()' để nhận dữ liệu (luôn trả về string).
- Hàm 'float()' (hoặc 'int()') để chuyển đổi string sang số.
- Cấu trúc 'if-elif-else' để quyết định thực hiện phép toán nào.
    `,
    example_code: `
# Bước 1: Nhận đầu vào (Input)
# Dùng float() để cho phép nhập số thực (ví dụ: 3.5)
try:
    num1 = float(input("Nhập số thứ nhất: "))
    op = input("Nhập phép toán (+, -, *, /): ")
    num2 = float(input("Nhập số thứ hai: "))

    # Bước 2: Xử lý (Process)
    if op == "+":
        result = num1 + num2
    elif op == "-":
        result = num1 - num2
    elif op == "*":
        result = num1 * num2
    elif op == "/":
        if num2 == 0:
            result = "Lỗi: Không thể chia cho 0"
        else:
            result = num1 / num2
    else:
        result = "Phép toán không hợp lệ"

    # Bước 3: Xuất kết quả (Output)
    print(f"Kết quả: {result}")

except ValueError:
    print("Lỗi: Vui lòng nhập số hợp lệ.")

    `,
    language: "python",
    readTime: "25 phút",
    difficulty: "Trung bình",
    progress: 50,
  },
  {
    id: 28,
    course_id: 6,
    title: "Dự án 1: Xử lý lỗi đầu vào (Try-Except)",
    content: `
Chương trình máy tính ở bài trước sẽ bị 'crash' (văng lỗi) nếu người dùng nhập chữ thay vì số.
Chúng ta có thể xử lý vấn đề này bằng khối 'try-except'.
- 'try': Đặt đoạn mã 'có nguy cơ' gây lỗi vào đây (ví dụ: 'float(input())').
- 'except': Nếu lỗi xảy ra trong khối 'try', chương trình sẽ nhảy đến khối 'except' thay vì dừng lại.
- 'ValueError': Đây là loại lỗi cụ thể xảy ra khi 'float()' hoặc 'int()' không thể chuyển đổi chuỗi (ví dụ: 'float("abc")').

Chúng ta có thể kết hợp 'try-except' với vòng lặp 'while True' để buộc người dùng nhập lại cho đến khi họ nhập đúng một số.
    `,
    example_code: `
# Hàm này sẽ hỏi cho đến khi nhận được số hợp lệ
def get_number(prompt):
    while True: # Vòng lặp vô hạn
        try:
            # Thử chuyển đổi đầu vào
            number = float(input(prompt))
            return number # Thoát hàm nếu thành công
        except ValueError:
            # Nếu thất bại (lỗi ValueError), in thông báo và lặp lại
            print("Đầu vào không hợp lệ. Vui lòng nhập một con số.")

# --- Chương trình chính ---
print("--- Máy tính nâng cao ---")
num1 = get_number("Nhập số thứ nhất: ")
op = input("Nhập phép toán (+, -, *, /): ")
num2 = get_number("Nhập số thứ hai: ")

# (Phần logic if-elif-else cho phép toán tương tự bài trước)
if op == "+":
    print(f"Kết quả: {num1 + num2}")
elif op == "-":
    print(f"Kết quả: {num1 - num2}")
elif op == "*":
    print(f"Kết quả: {num1 * num2}")
elif op == "/":
    if num2 == 0:
        print("Lỗi: Không thể chia cho 0")
    else:
        print(f"Kết quả: {num1 / num2}")
else:
    print("Phép toán không hợp lệ")
    `,
    language: "python",
    readTime: "20 phút",
    difficulty: "Trung bình",
    progress: 10,
  },
  {
    id: 29,
    course_id: 6,
    title: "Dự án 2: Trò chơi Đoán số",
    content: `
Chúng ta sẽ tạo một trò chơi đoán số đơn giản.
Quy tắc:
1. Máy tính sẽ 'nghĩ' ra một số ngẫu nhiên trong khoảng 1 đến 100.
2. Người dùng sẽ nhập vào một số để đoán.
3. Máy tính sẽ phản hồi "Quá cao!", "Quá thấp!" hoặc "Đoán đúng rồi!".
4. Trò chơi tiếp tục cho đến khi người dùng đoán đúng.

Để làm được điều này, chúng ta cần sử dụng thư viện 'random' của Python.
- 'import random': Nạp thư viện 'random' vào chương trình.
- 'random.randint(a, b)': Hàm này trả về một số nguyên ngẫu nhiên trong khoảng từ 'a' đến 'b' (bao gồm cả 'a' và 'b').
    `,
    example_code: `
# Nạp thư viện random
import random

# Bước 1: Máy tính chọn số
# random.randint(1, 100) chọn 1 số từ 1 đến 100
secret_number = random.randint(1, 100) 
guess = 0 # Khởi tạo biến đoán, đảm bảo nó không bằng secret_number ban đầu

print("--- Chào mừng đến với Trò chơi Đoán số! ---")
print("Tôi đã nghĩ một số từ 1 đến 100. Hãy đoán thử!")

# Bước 2: Bắt đầu vòng lặp trò chơi
# (Phần logic lặp và phản hồi sẽ ở bài tiếp theo)
# Bạn có thể thử in ra số bí mật để kiểm tra:
# print(f"(Debug: Số bí mật là {secret_number})")

# Chờ người dùng đoán lần đầu
try:
    guess = int(input("Đoán của bạn: "))
    print(f"Bạn đoán: {guess}")
    
    # (Logic so sánh sẽ ở bài sau)

except ValueError:
    print("Vui lòng nhập một số nguyên.")
    `,
    language: "python",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 30,
    course_id: 6,
    title: "Dự án 2: Vòng lặp và Phản hồi",
    content: `
Bây giờ, chúng ta sẽ hoàn thiện trò chơi đoán số bằng cách thêm vòng lặp 'while'.
Ý tưởng là: "Chừng nào ('while') số người dùng đoán ('guess') còn *khác* (!=) số bí mật ('secret_number'), thì còn tiếp tục lặp".

Trong mỗi lần lặp:
1. Yêu cầu người dùng nhập số đoán (nên dùng 'try-except'!).
2. So sánh số đoán với số bí mật:
   - Nếu đoán < bí mật: In "Quá thấp! Thử lại."
   - Nếu đoán > bí mật: In "Quá cao! Thử lại."
3. Vòng lặp sẽ tự động kết thúc khi điều kiện 'while guess != secret_number' bị sai (tức là 'guess == secret_number').
4. Sau khi vòng lặp kết thúc, in thông báo chiến thắng.
    `,
    example_code: `
import random

secret_number = random.randint(1, 100) 
guess = 0 # Khởi tạo biến đoán
guess_count = 0 # Biến đếm số lần đoán

print("--- Trò chơi Đoán số (Hoàn chỉnh) ---")
print("Tôi đã nghĩ một số từ 1 đến 100.")

# Vòng lặp chính của trò chơi
while guess != secret_number:
    
    # Nhận đầu vào và xử lý lỗi
    try:
        guess_input = input(f"Lần đoán thứ {guess_count + 1}: ")
        guess = int(guess_input)
    except ValueError:
        print("Đó không phải là số! Vui lòng nhập một số.")
        continue # Bỏ qua phần còn lại và lặp lại

    guess_count += 1 # Tăng số lần đoán

    # So sánh và phản hồi
    if guess < secret_number:
        print("Quá thấp! Thử lại.")
    elif guess > secret_number:
        print("Quá cao! Thử lại.")
    # Nếu không thấp, không cao, thì là BẰNG
    
# Khi vòng lặp kết thúc (vì guess == secret_number)
print("\n======================================")
print(f"Chúc mừng! Bạn đã đoán đúng số {secret_number}!")
print(f"Bạn đã mất {guess_count} lần đoán.")
print("======================================")
    `,
    language: "python",
    readTime: "22 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 31,
    course_id: 6,
    title: "Dự án 3: Xử lý dữ liệu nhỏ (Đọc/Ghi File)",
    content: `
Dự án cuối cùng ở cấp độ cơ bản là làm việc với file văn bản.
Giả sử chúng ta có một file 'data.txt' chứa một danh sách các tên, mỗi tên trên một dòng.
Nhiệm vụ:
1. Đọc nội dung từ file 'data.txt'.
2. Xử lý dữ liệu (ví dụ: đếm số lượng tên, hoặc chuyển tất cả sang chữ hoa).
3. Ghi kết quả đã xử lý ra một file mới tên là 'report.txt'.

Chúng ta sẽ sử dụng cú pháp 'with open(...)' để đọc và ghi file an toàn.
    `,
    example_code: `
# --- Bước 1: Chuẩn bị file dữ liệu (Bạn có thể tạo file data.txt thủ công) ---
# Chúng ta sẽ tự tạo file đó ở đây bằng chế độ 'w'
try:
    with open("data.txt", "w", encoding="utf-8") as f:
        f.write("An\n")
        f.write("Bình\n")
        f.write("Cường\n")
        f.write("dũng\n") # cố tình viết thường
    print("Đã tạo file data.txt")

    # --- Bước 2: Đọc và Xử lý ---
    names_uppercase = []
    line_count = 0

    print("Bắt đầu đọc data.txt...")
    with open("data.txt", "r", encoding="utf-8") as f:
        for line in f:
            line_count += 1
            # .strip() để xóa khoảng trắng và ký tự \n ở đầu/cuối
            # .upper() để chuyển sang chữ hoa
            processed_name = line.strip().upper()
            names_uppercase.append(processed_name)

    print(f"Đã đọc xong {line_count} dòng.")
    print(f"Dữ liệu đã xử lý: {names_uppercase}")
    
    # --- Bước 3: Ghi ra file mới ---
    print("Bắt đầu ghi report.txt...")
    with open("report.txt", "w", encoding="utf-8") as report_file:
        report_file.write("--- BÁO CÁO TÊN --- \n")
        report_file.write(f"Tổng số tên: {line_count}\n")
        report_file.write("-----------------------\n")
        
        for name in names_uppercase:
            report_file.write(name + "\n")
            
    print("Hoàn thành! Kiểm tra file report.txt.")

except IOError as e:
    print(f"Lỗi khi xử lý file: {e}")

    `,
    language: "python",
    readTime: "25 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
];
