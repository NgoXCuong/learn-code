export const mockExercises = [
  // ======================================================
  // CHƯƠNG 1: GIỚI THIỆU CƠ BẢN
  // ======================================================

  // Lesson 1: Giới thiệu về JavaScript
  {
    id: 1,
    lesson_id: 1,
    title: "Chương trình đầu tiên",
    description:
      "Sử dụng `console.log()` để in dòng chữ 'Hello JavaScript' ra màn hình console.",
    example_code: `console.log("Hello JavaScript");`,
    language: "javascript",
    input: null,
    output: "Hello JavaScript",
    hint: "Dùng hàm console.log() và đặt chuỗi ký tự trong dấu ngoặc kép hoặc ngoặc đơn.",
  },

  // Lesson 2: Biến và Kiểu dữ liệu
  {
    id: 2,
    lesson_id: 2,
    title: "Khai báo biến",
    description:
      "Khai báo biến `let age = 25` và hằng số `const name = 'F8'`. In cả hai ra console.",
    example_code: `let age = 25;\nconst name = "F8";\nconsole.log(name, age);`,
    language: "javascript",
    input: null,
    output: "F8 25",
    hint: "Bạn có thể truyền nhiều tham số vào console.log, cách nhau bởi dấu phẩy.",
  },
  {
    id: 3,
    lesson_id: 2,
    title: "Kiểm tra kiểu dữ liệu",
    description:
      "Tạo biến `isActive = true`. Sử dụng `typeof` để in ra kiểu dữ liệu của biến này.",
    example_code: `let isActive = true;\nconsole.log(typeof isActive);`,
    language: "javascript",
    input: "isActive = true",
    output: "boolean",
    hint: "Toán tử typeof trả về chuỗi mô tả kiểu dữ liệu (ví dụ: 'number', 'string', 'boolean').",
  },

  // ======================================================
  // CHƯƠNG 2: CẤU TRÚC ĐIỀU KHIỂN
  // ======================================================

  // Lesson 3: Toán tử trong JavaScript
  {
    id: 4,
    lesson_id: 3,
    title: "Toán tử số học",
    description:
      "Tính tổng, hiệu, tích, thương của `a = 20` và `b = 5`. In kết quả ra console.",
    example_code: `let a = 20, b = 5;\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);`,
    language: "javascript",
    input: "a = 20, b = 5",
    output: "25\n15\n100\n4",
    hint: "Sử dụng các toán tử +, -, *, / tương ứng.",
  },
  {
    id: 5,
    lesson_id: 3,
    title: "Toán tử so sánh",
    description:
      "So sánh xem `10` có bằng `'10'` không bằng toán tử `===`. In kết quả (true/false).",
    example_code: `console.log(10 === "10");`,
    language: "javascript",
    input: "10, '10'",
    output: "false",
    hint: "Toán tử === so sánh cả giá trị và kiểu dữ liệu (Strict comparison).",
  },

  // Lesson 4: Hàm (Functions)
  {
    id: 6,
    lesson_id: 4,
    title: "Tạo hàm tính tổng",
    description:
      "Viết hàm `sum(a, b)` trả về tổng của 2 tham số. Gọi hàm với giá trị 10 và 20.",
    example_code: `function sum(a, b) {\n  return a + b;\n}\nconsole.log(sum(10, 20));`,
    language: "javascript",
    input: "sum(10, 20)",
    output: "30",
    hint: "Nhớ sử dụng từ khóa 'return' để trả về giá trị trong hàm.",
  },

  // Lesson 5: Câu lệnh điều kiện If-Else
  {
    id: 7,
    lesson_id: 5,
    title: "Kiểm tra chẵn lẻ",
    description:
      "Viết hàm kiểm tra số `n`. Nếu `n` chia hết cho 2 thì in 'Chẵn', ngược lại in 'Lẻ'.",
    example_code: `let n = 7;\nif (n % 2 === 0) {\n  console.log("Chẵn");\n} else {\n  console.log("Lẻ");\n}`,
    language: "javascript",
    input: "n = 7",
    output: "Lẻ",
    hint: "Sử dụng toán tử chia lấy dư (%) để kiểm tra. n % 2 === 0 là số chẵn.",
  },

  // Lesson 6: Vòng lặp For và While
  {
    id: 8,
    lesson_id: 6,
    title: "Vòng lặp For",
    description: "Sử dụng vòng lặp `for` để in ra các số từ 1 đến 5.",
    example_code: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
    language: "javascript",
    input: null,
    output: "1\n2\n3\n4\n5",
    hint: "Cú pháp: for (khởi tạo; điều kiện; bước nhảy).",
  },
  {
    id: 9,
    lesson_id: 6,
    title: "Vòng lặp While",
    description: "Sử dụng vòng lặp `while` để in ra các số từ 5 về 1.",
    example_code: `let i = 5;\nwhile (i > 0) {\n  console.log(i);\n  i--;\n}`,
    language: "javascript",
    input: "i = 5",
    output: "5\n4\n3\n2\n1",
    hint: "Đừng quên giảm giá trị biến đếm (i--) để tránh vòng lặp vô hạn.",
  },

  // ======================================================
  // CHƯƠNG 3: NÂNG CAO
  // ======================================================

  // Lesson 7: Tương tác với DOM
  {
    id: 10,
    lesson_id: 7,
    title: "Truy xuất phần tử",
    description:
      "Giả sử HTML có `<h1 id='title'>Hello</h1>`. Viết code JS để đổi nội dung thành 'Hi DOM'.",
    example_code: `const element = document.getElementById("title");\nelement.textContent = "Hi DOM";`,
    language: "javascript",
    input: "<h1 id='title'>Hello</h1>",
    output: "<h1 id='title'>Hi DOM</h1>",
    hint: "Dùng document.getElementById('id') để lấy element và gán .textContent hoặc .innerText.",
  },

  // ======================================================
  // CHƯƠNG 4: CẤU TRÚC DỮ LIỆU
  // ======================================================

  // Lesson 8: Mảng (Arrays)
  {
    id: 11,
    lesson_id: 8,
    title: "Tạo và truy xuất Mảng",
    description: "Tạo mảng `cars = ['BMW', 'Honda']`. In ra phần tử đầu tiên.",
    example_code: `const cars = ["BMW", "Honda"];\nconsole.log(cars[0]);`,
    language: "javascript",
    input: "cars = ['BMW', 'Honda']",
    output: "BMW",
    hint: "Mảng trong JavaScript có chỉ số bắt đầu từ 0.",
  },
  {
    id: 12,
    lesson_id: 8,
    title: "Thêm phần tử vào Mảng",
    description:
      "Dùng `push()` để thêm 'Toyota' vào mảng `cars` ở trên. In mảng sau khi thêm.",
    example_code: `const cars = ["BMW"];\ncars.push("Toyota");\nconsole.log(cars);`,
    language: "javascript",
    input: "cars = ['BMW']",
    output: "['BMW', 'Toyota']",
    hint: "Phương thức push() thêm phần tử vào cuối mảng và thay đổi mảng gốc.",
  },

  // Lesson 9: Đối tượng (Objects)
  {
    id: 13,
    lesson_id: 9,
    title: "Tạo Đối tượng",
    description:
      "Tạo object `user` có thuộc tính `name` là 'Son' và `age` là 20. In ra `name`.",
    example_code: `const user = { name: "Son", age: 20 };\nconsole.log(user.name);`,
    language: "javascript",
    input: "{ name: 'Son', age: 20 }",
    output: "Son",
    hint: "Truy cập thuộc tính object bằng dấu chấm (.) hoặc ngoặc vuông ([]).",
  },

  // ======================================================
  // CHƯƠNG 5: HÀM NÂNG CAO
  // ======================================================

  // Lesson 10: Hàm nâng cao và Callback
  {
    id: 14,
    lesson_id: 10,
    title: "Callback Function",
    description:
      "Viết hàm `main(callback)` nhận vào một hàm khác và thực thi nó.",
    example_code: `function main(callback) {\n  callback();\n}\n\nmain(() => console.log("I am a callback"));`,
    language: "javascript",
    input: "Function main()",
    output: "I am a callback",
    hint: "Callback chỉ đơn giản là một function được truyền như một tham số cho function khác.",
  },

  // ======================================================
  // CHƯƠNG 6: BẤT ĐỒNG BỘ
  // ======================================================

  // Lesson 11: Promises và Async/Await
  {
    id: 15,
    lesson_id: 11,
    title: "Tạo Promise",
    description:
      "Tạo một Promise đơn giản trả về thành công (resolve) sau 1 giây.",
    example_code: `const myPromise = new Promise((resolve) => {\n  setTimeout(() => resolve("Success!"), 1000);\n});\nmyPromise.then(console.log);`,
    language: "javascript",
    input: null,
    output: "Success!",
    hint: "Sử dụng setTimeout bên trong Promise executor để giả lập độ trễ.",
  },
  {
    id: 16,
    lesson_id: 11,
    title: "Async/Await",
    description:
      "Viết một hàm `async` sử dụng `await` để đợi Promise trên hoàn thành.",
    example_code: `async function run() {\n  const result = await new Promise(r => setTimeout(() => r("Done"), 100));\n  console.log(result);\n}\nrun();`,
    language: "javascript",
    input: null,
    output: "Done",
    hint: "Từ khóa await chỉ có thể sử dụng bên trong một hàm async.",
  },

  // ======================================================
  // CHƯƠNG 7: ES6+ FEATURES
  // ======================================================

  // Lesson 12: Template Literals và Destructuring
  {
    id: 17,
    lesson_id: 12,
    title: "Template Literals",
    description:
      "Sử dụng backticks (``) để in chuỗi: 'Xin chào, tôi là [name]'.",
    example_code: `const name = "Tú";\nconsole.log(\`Xin chào, tôi là \${name}\`);`,
    language: "javascript",
    input: "name = 'Tú'",
    output: "Xin chào, tôi là Tú",
    hint: "Dùng cú pháp ${biến} bên trong dấu backtick để nội suy chuỗi.",
  },
  {
    id: 18,
    lesson_id: 12,
    title: "Destructuring Object",
    description:
      "Lấy `name` từ object `const user = { name: 'A', age: 10 }` bằng Destructuring.",
    example_code: `const user = { name: 'A', age: 10 };\nconst { name } = user;\nconsole.log(name);`,
    language: "javascript",
    input: "{ name: 'A', age: 10 }",
    output: "A",
    hint: "Cú pháp: const { prop1, prop2 } = object;",
  },

  // Lesson 13: Spread Operator và Rest Parameters
  {
    id: 19,
    lesson_id: 13,
    title: "Spread Operator Array",
    description:
      "Gộp 2 mảng `a = [1, 2]` và `b = [3, 4]` thành mảng mới dùng Spread `...`.",
    example_code: `const a = [1, 2];\nconst b = [3, 4];\nconst c = [...a, ...b];\nconsole.log(c);`,
    language: "javascript",
    input: "a=[1,2], b=[3,4]",
    output: "[1, 2, 3, 4]",
    hint: "Spread operator (...) giúp trải các phần tử của mảng ra.",
  },
  {
    id: 20,
    lesson_id: 13,
    title: "Rest Parameters",
    description:
      "Viết hàm `sum(...nums)` nhận vô số tham số và tính tổng của chúng.",
    example_code: `function sum(...nums) {\n  return nums.reduce((a, b) => a + b, 0);\n}\nconsole.log(sum(1, 2, 3, 4));`,
    language: "javascript",
    input: "1, 2, 3, 4",
    output: "10",
    hint: "Rest parameters gom các tham số truyền vào thành một mảng.",
  },

  // ======================================================
  // CHƯƠNG 8: MODULES
  // ======================================================

  // Lesson 14: Modules và Import/Export
  {
    id: 21,
    lesson_id: 14,
    title: "Export và Import",
    description:
      "Viết cú pháp export một hàm `hello` và import nó (chỉ viết code, không chạy được trực tiếp trên console đơn giản).",
    example_code: `// file1.js\nexport const hello = () => console.log("Hi");\n\n// file2.js\nimport { hello } from './file1.js';\nhello();`,
    language: "javascript",
    input: null,
    output: "Hi",
    hint: "Sử dụng 'export' trước khai báo hàm và 'import {} from ...' để lấy hàm đó.",
  },

  // ======================================================
  // CHƯƠNG 9: LỖI VÀ XỬ LÝ
  // ======================================================

  // Lesson 15: Try-Catch và Error Handling
  {
    id: 22,
    lesson_id: 15,
    title: "Bắt lỗi cơ bản",
    description:
      "Sử dụng `try-catch` để bắt lỗi khi gọi một hàm không tồn tại.",
    example_code: `try {\n  nonExistentFunction();\n} catch (error) {\n  console.error("Đã xảy ra lỗi:", error.message);\n}`,
    language: "javascript",
    input: "call invalid function",
    output: "Đã xảy ra lỗi: nonExistentFunction is not defined",
    hint: "Đặt code có khả năng gây lỗi trong block 'try', xử lý lỗi trong block 'catch'.",
  },

  // ======================================================
  // CHƯƠNG 10: BROWSER APIS
  // ======================================================

  // Lesson 16: LocalStorage và SessionStorage
  {
    id: 23,
    lesson_id: 16,
    title: "Lưu LocalStorage",
    description: "Lưu key 'token' với giá trị '12345' vào LocalStorage.",
    example_code: `localStorage.setItem("token", "12345");\nconsole.log(localStorage.getItem("token"));`,
    language: "javascript",
    input: "key='token', value='12345'",
    output: "12345",
    hint: "Dùng localStorage.setItem(key, value) để lưu và getItem(key) để lấy.",
  },

  // Lesson 17: Fetch API và AJAX
  {
    id: 24,
    lesson_id: 17,
    title: "Gọi API bằng Fetch",
    description:
      "Sử dụng `fetch()` để gọi API 'https://jsonplaceholder.typicode.com/todos/1' và in dữ liệu JSON.",
    example_code: `fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(response => response.json())\n  .then(json => console.log(json));`,
    language: "javascript",
    input: "URL API",
    output: "{ userId: 1, id: 1, title: '...', completed: false }",
    hint: "Hàm fetch trả về 1 Promise. Cần gọi .json() ở bước then đầu tiên để parse body.",
  },

  // ================= PYTHON =======================
  // Bài tập cho Lesson 18: If - Elif - Else
  {
    id: 25,
    lesson_id: 18,
    title: "Kiểm tra số âm dương",
    description:
      "Viết chương trình nhập vào một số `n = -5`. Sử dụng if/elif/else để in ra: 'Số dương', 'Số âm' hoặc 'Số không'.",
    example_code: `n = -5\nif n > 0:\n    print("Số dương")\nelif n < 0:\n    print("Số âm")\nelse:\n    print("Số không")`,
    language: "python",
    input: "n = -5",
    output: "Số âm",
    hint: "Sử dụng điều kiện n < 0 để kiểm tra số âm.",
  },
  {
    id: 26,
    lesson_id: 18,
    title: "Xếp loại điểm số",
    description:
      "Cho biến `score = 7.5`. Nếu điểm >= 8 in 'Giỏi', nếu >= 6.5 in 'Khá', còn lại in 'Trung bình'.",
    example_code: `score = 7.5\nif score >= 8:\n    print("Giỏi")\nelif score >= 6.5:\n    print("Khá")\nelse:\n    print("Trung bình")`,
    language: "python",
    input: "score = 7.5",
    output: "Khá",
    hint: "Python sử dụng elif (viết tắt của else if) để kiểm tra nhiều điều kiện.",
  },

  // Bài tập cho Lesson 19: Vòng lặp For
  {
    id: 27,
    lesson_id: 19,
    title: "Tính tổng dãy số",
    description:
      "Sử dụng vòng lặp `for` và hàm `range()` để tính tổng các số từ 1 đến 10. In kết quả ra màn hình.",
    example_code: `total = 0\nfor i in range(1, 11):\n    total += i\nprint(total)`,
    language: "python",
    input: "range(1, 11)",
    output: "55",
    hint: "Hàm range(start, stop) sẽ chạy đến stop - 1. Để chạy đến 10, cần range(1, 11).",
  },
  {
    id: 28,
    lesson_id: 19,
    title: "In bảng cửu chương 5",
    description:
      "Sử dụng vòng lặp for để in bảng cửu chương 5 (từ 5x1 đến 5x10).",
    example_code: `for i in range(1, 11):\n    print(f"5 x {i} = {5 * i}")`,
    language: "python",
    input: "Table 5",
    output:
      "5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25\n5 x 6 = 30\n5 x 7 = 35\n5 x 8 = 40\n5 x 9 = 45\n5 x 10 = 50",
    hint: "Sử dụng F-String f'...' để chèn biến vào chuỗi dễ dàng.",
  },

  // Bài tập cho Lesson 20: Vòng lặp While
  {
    id: 29,
    lesson_id: 20,
    title: "Nhập mật khẩu",
    description:
      "Tạo vòng lặp `while True` yêu cầu nhập mật khẩu. Nếu nhập đúng '123' thì in 'Thành công' và dùng `break` để thoát.",
    example_code: `while True:\n    pw = "123" # Giả lập input\n    if pw == "123":\n        print("Thành công")\n        break`,
    language: "python",
    input: "input='123'",
    output: "Thành công",
    hint: "Lệnh break dùng để thoát khỏi vòng lặp ngay lập tức.",
  },
  {
    id: 30,
    lesson_id: 20,
    title: "Bỏ qua số 5 (Continue)",
    description:
      "Dùng vòng lặp for chạy từ 1 đến 10. Nếu gặp số 5 thì dùng `continue` để bỏ qua, còn lại in ra số đó.",
    example_code: `for i in range(1, 11):\n    if i == 5:\n        continue\n    print(i)`,
    language: "python",
    input: "range(1, 11)",
    output: "1\n2\n3\n4\n6\n7\n8\n9\n10",
    hint: "Lệnh continue sẽ bỏ qua các dòng code bên dưới nó trong lần lặp hiện tại và chuyển sang lần lặp tiếp theo.",
  },

  // === BÀI TẬP CHO HÀM & MODULE (Lesson 21, 22, 23) ===

  // Bài tập cho Lesson 21: Hàm (Functions)
  {
    id: 31,
    lesson_id: 21,
    title: "Hàm tính diện tích HCN",
    description:
      "Viết hàm `calc_area(width, height)` trả về diện tích hình chữ nhật. Gọi hàm với width=5, height=10.",
    example_code: `def calc_area(w, h):\n    return w * h\n\nprint(calc_area(5, 10))`,
    language: "python",
    input: "w=5, h=10",
    output: "50",
    hint: "Sử dụng từ khóa def để định nghĩa hàm và return để trả về kết quả.",
  },
  {
    id: 32,
    lesson_id: 21,
    title: "Hàm kiểm tra chẵn lẻ",
    description:
      "Viết hàm `is_even(n)` trả về True nếu n là số chẵn, False nếu n là lẻ. Test với n=4.",
    example_code: `def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(4))`,
    language: "python",
    input: "n=4",
    output: "True",
    hint: "Phép chia lấy dư % (modulo). Nếu n % 2 == 0 nghĩa là chia hết cho 2.",
  },

  // Bài tập cho Lesson 22: Phạm vi biến (Scope)
  {
    id: 33,
    lesson_id: 22,
    title: "Sử dụng biến Global",
    description:
      "Khai báo biến toàn cục `count = 0`. Viết hàm `increment()` sử dụng từ khóa `global` để tăng biến count lên 1.",
    example_code: `count = 0\ndef increment():\n    global count\n    count += 1\n\nincrement()\nprint(count)`,
    language: "python",
    input: "count=0",
    output: "1",
    hint: "Để sửa đổi biến toàn cục bên trong hàm, phải khai báo 'global ten_bien' trước.",
  },

  // Bài tập cho Lesson 23: Modules
  {
    id: 34,
    lesson_id: 23,
    title: "Tính căn bậc 2",
    description:
      "Import thư viện `math` và sử dụng hàm `sqrt()` để tính căn bậc 2 của 64.",
    example_code: `import math\nprint(math.sqrt(64))`,
    language: "python",
    input: "64",
    output: "8.0",
    hint: "Hàm sqrt nằm trong module math, kết quả trả về thường là số thực (float).",
  },
  {
    id: 35,
    lesson_id: 23,
    title: "Tung xúc xắc",
    description:
      "Import thư viện `random` và dùng `randint(1, 6)` để mô phỏng việc tung xúc xắc.",
    example_code: `import random\nprint(random.randint(1, 6))`,
    language: "python",
    input: "range 1-6",
    output: "(Một số ngẫu nhiên từ 1 đến 6)",
    hint: "random.randint(a, b) trả về số nguyên N sao cho a <= N <= b.",
  },

  // === BÀI TẬP XỬ LÝ DỮ LIỆU & FILE (Lesson 24, 25, 26) ===

  // Bài tập cho Lesson 24: Xử lý chuỗi
  {
    id: 36,
    lesson_id: 24,
    title: "Làm sạch dữ liệu",
    description:
      "Cho chuỗi `s = '  admin  '`. Hãy dùng `.strip()` để xóa khoảng trắng thừa ở 2 đầu.",
    example_code: `s = "  admin  "\nprint(s.strip())`,
    language: "python",
    input: "'  admin  '",
    output: "admin",
    hint: "Phương thức .strip() loại bỏ whitespace ở đầu và cuối chuỗi.",
  },
  {
    id: 37,
    lesson_id: 24,
    title: "F-String Formatting",
    description:
      "Cho `name='Mai'` và `score=9`. Dùng F-String để in ra câu 'Mai đạt 9 điểm'.",
    example_code: `name = "Mai"\nscore = 9\nprint(f"{name} đạt {score} điểm")`,
    language: "python",
    input: "name='Mai', score=9",
    output: "Mai đạt 9 điểm",
    hint: "Đặt biến trong dấu ngoặc nhọn {} bên trong chuỗi có tiền tố f.",
  },

  // Bài tập cho Lesson 25: File Handling
  {
    id: 38,
    lesson_id: 25,
    title: "Ghi file log",
    description:
      "Sử dụng `with open(...)` mode 'w' để tạo file `log.txt` và ghi dòng chữ 'System started' vào đó.",
    example_code: `with open('log.txt', 'w') as f:\n    f.write('System started')`,
    language: "python",
    input: "content='System started'",
    output: "(File log.txt chứa: System started)",
    hint: "Mode 'w' dùng để ghi (write). Sử dụng 'with' để tự động đóng file sau khi dùng xong.",
  },
  {
    id: 39,
    lesson_id: 25,
    title: "Đọc file log",
    description:
      "Sử dụng `with open(...)` mode 'r' để đọc nội dung file `log.txt` và in ra màn hình.",
    example_code: `with open('log.txt', 'r') as f:\n    print(f.read())`,
    language: "python",
    input: "file content='System started'",
    output: "System started",
    hint: "Mode 'r' dùng để đọc (read). Hàm .read() đọc toàn bộ nội dung file.",
  },

  // Bài tập cho Lesson 26: Try - Except
  {
    id: 40,
    lesson_id: 26,
    title: "Xử lý lỗi chia cho 0",
    description:
      "Viết khối try-except để bắt lỗi `ZeroDivisionError` khi thực hiện phép chia `10 / 0`. In ra thông báo lỗi.",
    example_code: `try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("Không thể chia cho 0")`,
    language: "python",
    input: "10 / 0",
    output: "Không thể chia cho 0",
    hint: "Code có khả năng gây lỗi đặt trong block try, xử lý lỗi cụ thể trong block except.",
  },

  // === BÀI TẬP OOP (Lesson 27, 28, 29) ===

  // Bài tập cho Lesson 27: OOP - Class & Object
  {
    id: 41,
    lesson_id: 27,
    title: "Tạo Class Đơn giản",
    description:
      "Tạo class `Phone` có thuộc tính `brand = 'Apple'`. Tạo object `my_phone` và in thuộc tính brand.",
    example_code: `class Phone:\n    brand = 'Apple'\n\np = Phone()\nprint(p.brand)`,
    language: "python",
    input: "Class Phone",
    output: "Apple",
    hint: "Tạo object bằng cách gọi tên Class kèm ngoặc đơn: variable = ClassName().",
  },

  // Bài tập cho Lesson 28: OOP - Init & Method
  {
    id: 42,
    lesson_id: 28,
    title: "Constructor __init__",
    description:
      "Tạo class `Book` có hàm `__init__` nhận `title` và `author`. Tạo một cuốn sách và in tên sách.",
    example_code: `class Book:\n    def __init__(self, title):\n        self.title = title\n\nb = Book("Python Basic")\nprint(b.title)`,
    language: "python",
    input: "Book('Python Basic')",
    output: "Python Basic",
    hint: "__init__ là hàm khởi tạo, chạy tự động khi tạo object mới.",
  },
  {
    id: 43,
    lesson_id: 28,
    title: "Phương thức Class",
    description:
      "Trong class `Rectangle`, viết phương thức `area(self)` để tính diện tích dựa trên `self.width` và `self.height`.",
    example_code: `class Rect:\n    def __init__(self, w, h):\n        self.w = w\n        self.h = h\n    def area(self):\n        return self.w * self.h\n\nr = Rect(4, 5)\nprint(r.area())`,
    language: "python",
    input: "Rect(4, 5)",
    output: "20",
    hint: "Tham số đầu tiên của phương thức trong class luôn là 'self' để tham chiếu đến chính object đó.",
  },

  // Bài tập cho Lesson 29: OOP - Kế thừa
  {
    id: 44,
    lesson_id: 29,
    title: "Kế thừa Class",
    description:
      "Tạo class `Bird` có hàm `fly()`. Tạo class `Eagle` kế thừa `Bird`. Tạo object Eagle và gọi hàm `fly()`.",
    example_code: `class Bird:\n    def fly(self):\n        print("Flying...")\n\nclass Eagle(Bird):\n    pass\n\ne = Eagle()\ne.fly()`,
    language: "python",
    input: "Eagle inherits Bird",
    output: "Flying...",
    hint: "Cú pháp kế thừa: class ChildClass(ParentClass):",
  },

  // Bài tập cho Lesson 30: Project
  {
    id: 45,
    lesson_id: 30,
    title: "Mini Project: Thêm chi tiêu",
    description:
      "Viết hàm `add_expense(data, name, cost)` để thêm một dictionary `{'name': name, 'cost': cost}` vào list `data`.",
    example_code: `data = []\ndef add_expense(d, n, c):\n    d.append({'name': n, 'cost': c})\n\nadd_expense(data, 'Cà phê', 30)\nprint(data)`,
    language: "python",
    input: "name='Cà phê', cost=30",
    output: "[{'name': 'Cà phê', 'cost': 30}]",
    hint: "Sử dụng phương thức list.append() để thêm phần tử vào cuối danh sách.",
  },
];
