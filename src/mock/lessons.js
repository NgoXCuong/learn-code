export const mockLessons = [
  // === JavaScript Comprehensive Course (Course ID: 1) ===
  {
    id: 1,
    course_id: 1,
    chap: "Giới thiệu cơ bản",
    title: "Giới thiệu về JavaScript",
    content: `
JavaScript là ngôn ngữ lập trình phổ biến nhất thế giới, giúp các trang web trở nên sống động và có khả năng tương tác.
Nó chạy được trên trình duyệt (Client-side), Server (Node.js), Mobile App và cả IoT.

**1. Cách chèn JavaScript vào trang HTML**
Có 3 cách phổ biến để nhúng JS vào web:

- **Inline:** Viết trực tiếp trong thuộc tính HTML (ít dùng).
- **Internal:** Viết trong thẻ \`<script>\`.
- **External:** Viết ra file \`.js\` riêng và nhúng vào (Khuyên dùng).

\`\`\`javascript
<button onclick="alert('Hello!')">Click Me</button>

<script>
  console.log("Đây là JS trong file HTML");
</script>

<script src="main.js"></script>
\`\`\`

**2. Hello World và Console**
Hàm \`console.log()\` được sử dụng để in thông báo ra tab Console của trình duyệt (F12 -> Console), rất hữu ích để debug.

\`\`\`javascript
// In ra màn hình console
console.log("Hello JavaScript!");
console.warn("Đây là cảnh báo");
console.error("Đây là lỗi");
\`\`\`
`,
    example_code: ``,
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
Biến giống như những chiếc hộp để chứa dữ liệu. Trong JavaScript hiện đại, chúng ta ưu tiên dùng \`let\` và \`const\`.

**1. Khai báo biến**
- \`let\`: Dùng cho biến có thể thay đổi giá trị.
- \`const\`: Dùng cho hằng số (không thể gán lại).
- \`var\`: Cách cũ, hạn chế dùng do vấn đề về phạm vi (scope).

\`\`\`javascript
let age = 25;
age = 26; // OK

const PI = 3.14;
// PI = 3.15; // Lỗi! Không thể gán lại const

var name = "Old Style"; // Hạn chế dùng
\`\`\`

**2. Các kiểu dữ liệu cơ bản (Primitive Types)**
JavaScript là ngôn ngữ kiểu động (Dynamic typing), biến tự động hiểu kiểu dữ liệu.

\`\`\`javascript
let name = "An";        // String
let total = 100;        // Number
let isActive = true;    // Boolean
let emptyVal = null;    // Null (rỗng)
let notDefined;         // Undefined (chưa gán giá trị)

console.log(typeof name); // "string"
console.log(typeof total); // "number"
\`\`\`
`,
    example_code: ``,
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
Toán tử giúp thực hiện các phép tính và so sánh logic.

**1. Toán tử số học**
Bao gồm cộng, trừ, nhân, chia, chia lấy dư (%), và lũy thừa (**).

\`\`\`javascript
let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a % b); // 1 (Chia lấy dư)
console.log(b ** 2); // 9 (Lũy thừa)
\`\`\`

**2. Toán tử so sánh (Lưu ý quan trọng)**
- \`==\`: So sánh giá trị (Tự động ép kiểu - Không an toàn).
- \`===\`: So sánh cả giá trị VÀ kiểu dữ liệu (Khuyên dùng).

\`\`\`javascript
let x = 5;
let y = "5";

console.log(x == y);  // true (Dù một cái là số, một cái là chuỗi)
console.log(x === y); // false (Khác kiểu dữ liệu)
\`\`\`

**3. Toán tử Logic**
- \`&&\` (AND): Cả 2 đều đúng => Đúng.
- \`||\` (OR): Chỉ cần 1 cái đúng => Đúng.
- \`!\` (NOT): Phủ định.

\`\`\`javascript
let isAdult = true;
let hasTicket = false;

console.log(isAdult && hasTicket); // false
console.log(isAdult || hasTicket); // true
\`\`\`
`,
    example_code: ``,
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
Hàm giúp đóng gói các đoạn mã để tái sử dụng nhiều lần. Có 3 cách viết hàm phổ biến.

**1. Function Declaration (Khai báo truyền thống)**
Có tính chất *Hoisting* (có thể gọi trước khi khai báo).

\`\`\`javascript
console.log(sum(2, 3)); // 5

function sum(a, b) {
    return a + b;
}
\`\`\`

**2. Function Expression (Biểu thức hàm)**
Gán hàm vào một biến. Không có Hoisting.

\`\`\`javascript
const greet = function(name) {
    return "Xin chào " + name;
};
console.log(greet("Nam"));
\`\`\`

**3. Arrow Function (Hàm mũi tên - ES6)**
Cú pháp ngắn gọn, thường dùng trong lập trình hiện đại.

\`\`\`javascript
// Cách viết đầy đủ
const multiply = (a, b) => {
    return a * b;
};

// Cách viết tắt (nếu chỉ có 1 dòng return)
const subtract = (a, b) => a - b;

console.log(multiply(4, 5)); // 20
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "20 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 5,
    course_id: 1,
    chap: "Cấu trúc điều khiển",
    title: "Câu lệnh điều kiện If-Else",
    content: `
Câu lệnh rẽ nhánh giúp chương trình đưa ra quyết định dựa trên điều kiện đúng hoặc sai.

**1. Cấu trúc If - Else If - Else**

\`\`\`javascript
let score = 8.5;

if (score >= 9) {
    console.log("Xuất sắc");
} else if (score >= 7) {
    console.log("Khá");
} else if (score >= 5) {
    console.log("Trung bình");
} else {
    console.log("Yếu");
}
\`\`\`

**2. Toán tử 3 ngôi (Ternary Operator)**
Dùng để viết tắt cho \`if-else\` đơn giản. Cấu trúc: \`Điều kiện ? Giá trị đúng : Giá trị sai\`.

\`\`\`javascript
let age = 18;
let message = age >= 18 ? "Đủ tuổi" : "Chưa đủ tuổi";

console.log(message);
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 6,
    course_id: 1,
    chap: "Cấu trúc điều khiển",
    title: "Vòng lặp For và While",
    content: `
Vòng lặp giúp thực hiện một công việc lặp đi lặp lại nhiều lần.

**1. Vòng lặp For**
Dùng khi biết trước số lần lặp.

\`\`\`javascript
// In các số từ 1 đến 5
for (let i = 1; i <= 5; i++) {
    console.log("Lần lặp thứ: " + i);
}
\`\`\`

**2. Vòng lặp While**
Dùng khi không biết trước số lần lặp, chạy miễn là điều kiện còn đúng.

\`\`\`javascript
let i = 0;
while (i < 3) {
    console.log(i);
    i++; // Đừng quên tăng biến đếm để tránh lặp vô tận
}
\`\`\`

**3. Break và Continue**
- \`break\`: Thoát khỏi vòng lặp ngay lập tức.
- \`continue\`: Bỏ qua lần lặp hiện tại, nhảy sang lần tiếp theo.

\`\`\`javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) break; // Dừng khi i = 5
    console.log(i);
}
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "20 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 7,
    course_id: 1,
    chap: "Nâng cao",
    title: "Tương tác với DOM",
    content: `
DOM (Document Object Model) giúp JavaScript thay đổi nội dung, màu sắc, và cấu trúc của trang HTML.

**1. Chọn phần tử (Selectors)**

\`\`\`javascript
// Chọn theo ID
const title = document.getElementById("main-title");

// Chọn theo CSS Selector (Class, Tag...)
const btn = document.querySelector(".btn-submit");
const allItems = document.querySelectorAll("li");
\`\`\`

**2. Thay đổi nội dung và Style**

\`\`\`javascript
// Đổi nội dung chữ
title.innerText = "Nội dung mới";
title.innerHTML = "<span>Nội dung có HTML</span>";

// Đổi màu sắc (CSS)
title.style.color = "red";
title.style.backgroundColor = "#f0f0f0";
\`\`\`

**3. Bắt sự kiện (Events)**

\`\`\`javascript
btn.addEventListener("click", function() {
    alert("Bạn vừa bấm nút!");
    title.style.color = "blue";
});
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "22 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 8,
    course_id: 1,
    chap: "Cấu trúc dữ liệu",
    title: "Mảng (Arrays) trong JavaScript",
    content: `
Mảng dùng để lưu trữ danh sách dữ liệu. Nó cung cấp rất nhiều phương thức mạnh mẽ để xử lý dữ liệu.

**1. Thao tác cơ bản**

\`\`\`javascript
let fruits = ["Táo", "Cam", "Xoài"];

// Truy cập
console.log(fruits[0]); // "Táo"

// Thêm phần tử vào cuối
fruits.push("Nho");

// Xóa phần tử cuối
fruits.pop();

// Độ dài mảng
console.log(fruits.length);
\`\`\`

**2. Duyệt mảng (Map, Filter, Foreach)**
Đây là các hàm bậc cao rất quan trọng khi làm việc với React/Vue sau này.

\`\`\`javascript
let nums = [1, 2, 3, 4, 5];

// map(): Biến đổi mảng cũ thành mảng mới
let doubleNums = nums.map(n => n * 2);
console.log(doubleNums); // [2, 4, 6, 8, 10]

// filter(): Lọc các phần tử thỏa mãn điều kiện
let evenNums = nums.filter(n => n % 2 === 0);
console.log(evenNums); // [2, 4]
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "25 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 9,
    course_id: 1,
    chap: "Cấu trúc dữ liệu",
    title: "Đối tượng (Objects) trong JavaScript",
    content: `
Object giúp mô tả các thực thể cụ thể với các thuộc tính (key) và giá trị (value).

**1. Tạo và truy cập Object**

\`\`\`javascript
const user = {
    name: "Sơn Đặng",
    age: 28,
    isAdmin: true,
    // Phương thức (hàm trong object)
    sayHello: function() {
        return "Xin chào, tôi là " + this.name;
    }
};

// Lấy giá trị
console.log(user.name);       // Cách 1 (thường dùng)
console.log(user["age"]);     // Cách 2

// Gọi phương thức
console.log(user.sayHello());
\`\`\`

**2. Thêm và sửa thuộc tính**

\`\`\`javascript
user.email = "son@fullstack.edu.vn"; // Thêm mới
user.age = 29;                       // Sửa
delete user.isAdmin;                 // Xóa
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "28 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },
  {
    id: 10,
    course_id: 1,
    chap: "Hàm nâng cao",
    title: "Hàm nâng cao và Callback",
    content: `
Trong JS, hàm là "First-class citizens", nghĩa là hàm có thể được truyền như một tham số vào hàm khác.

**1. Callback Function**
Là hàm được truyền vào một hàm khác để được gọi lại sau đó.

\`\`\`javascript
function main(callback) {
    console.log("Xử lý chính...");
    // Gọi lại hàm callback
    callback();
}

function myCallback() {
    console.log("Xử lý xong!");
}

main(myCallback);
\`\`\`

**2. Ứng dụng thực tế của Callback**
Thường thấy trong xử lý sự kiện hoặc xử lý bất đồng bộ (như \`setTimeout\`).

\`\`\`javascript
setTimeout(() => {
    console.log("Dòng này hiện ra sau 2 giây");
}, 2000);
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "30 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 11,
    course_id: 1,
    chap: "Bất đồng bộ",
    title: "Promises và Async/Await",
    content: `
JavaScript chạy đơn luồng, nhưng nhờ cơ chế bất đồng bộ, nó có thể xử lý việc đọc file, gọi API mà không làm treo giao diện.

**1. Promise**
Đại diện cho một tác vụ có thể hoàn thành hoặc thất bại trong tương lai.

\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
    let success = true;
    if (success) resolve("Thành công!");
    else reject("Thất bại!");
});

myPromise
    .then(result => console.log(result))
    .catch(err => console.log(err));
\`\`\`

**2. Async / Await (Cú pháp hiện đại)**
Giúp viết code bất đồng bộ nhìn giống code đồng bộ, dễ đọc hơn.

\`\`\`javascript
async function fetchData() {
    try {
        // Giả lập gọi API chờ 1s
        let response = await myPromise; 
        console.log("Kết quả:", response);
    } catch (error) {
        console.log("Lỗi:", error);
    }
}

fetchData();
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "35 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 12,
    course_id: 1,
    chap: "ES6+ Features",
    title: "Template Literals và Destructuring",
    content: `
ES6 mang đến những cú pháp cực kỳ tiện lợi giúp code gọn gàng hơn.

**1. Template Literals (Chuỗi nội suy)**
Dùng dấu backtick (\`) thay vì dấu nháy đơn/kép. Cho phép chèn biến trực tiếp vào chuỗi.

\`\`\`javascript
const name = "Tú";
const age = 22;

// Cách cũ
console.log("Tôi là " + name + ", " + age + " tuổi.");

// Cách mới (ES6)
console.log(\`Tôi là \${name}, \${age} tuổi.\`);
\`\`\`

**2. Destructuring (Phân rã)**
Giúp lấy nhanh các phần tử của Array hoặc thuộc tính của Object.

\`\`\`javascript
const user = { username: "admin", role: "super" };

// Lấy thuộc tính username và role ra biến riêng
const { username, role } = user;

console.log(username); // "admin"
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "25 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 13,
    course_id: 1,
    chap: "ES6+ Features",
    title: "Spread Operator và Rest Parameters",
    content: `
Dấu ba chấm \`...\` trong JS có 2 tác dụng chính tùy vào ngữ cảnh.

**1. Spread Operator (Rải phần tử)**
Dùng để nối mảng hoặc copy object.

\`\`\`javascript
const arr1 = [1, 2];
const arr2 = [3, 4];

// Nối mảng
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Copy và sửa object
const user = { name: "A", age: 20 };
const updatedUser = { ...user, age: 21 }; 
\`\`\`

**2. Rest Parameters (Phần còn lại)**
Dùng trong tham số hàm để nhận vô số đối số.

\`\`\`javascript
function sum(...nums) {
    // nums bây giờ là một mảng chứa tất cả tham số truyền vào
    return nums.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "28 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 14,
    course_id: 1,
    chap: "Modules",
    title: "Modules và Import/Export",
    content: `
Modules giúp chia tách code thành các file nhỏ để dễ quản lý.

**1. Export (Xuất)**
Có thể export một biến, hàm hoặc class từ file này.

\`\`\`javascript
// file: math.js
export const PI = 3.14;

export function add(a, b) {
    return a + b;
}

// Default export (chỉ 1 cái mỗi file)
export default function multiply(a, b) {
    return a * b;
}
\`\`\`

**2. Import (Nhập)**
Sử dụng dữ liệu đã export ở file khác.

\`\`\`javascript
// file: main.js
import multiply, { PI, add } from './math.js';

console.log(add(2, 5)); // 7
console.log(multiply(2, 5)); // 10
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "30 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 15,
    course_id: 1,
    chap: "Lỗi và Xử lý",
    title: "Try-Catch và Error Handling",
    content: `
Để tránh việc chương trình bị "chết" (crash) khi gặp lỗi, chúng ta sử dụng khối \`try-catch\`.

**Cấu trúc Try-Catch-Finally**

\`\`\`javascript
try {
    // Code có thể gây lỗi
    let result = 10 / 0;
    console.log(undefinedVariable); // Lỗi ở đây
} catch (error) {
    // Code chạy khi có lỗi
    console.error("Đã xảy ra lỗi: ", error.message);
} finally {
    // Luôn chạy dù lỗi hay không
    console.log("Hoàn thành xử lý.");
}
\`\`\`

**Ném lỗi tùy ý (Throw Error)**

\`\`\`javascript
function checkAge(age) {
    if (age < 18) {
        throw new Error("Bạn chưa đủ tuổi!");
    }
    return "Đăng ký thành công";
}
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "25 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 16,
    course_id: 1,
    chap: "Browser APIs",
    title: "LocalStorage và SessionStorage",
    content: `
Trình duyệt cung cấp kho lưu trữ cục bộ để lưu dữ liệu người dùng (ví dụ: chế độ Dark mode, Token đăng nhập).

**1. LocalStorage**
Lưu trữ vĩnh viễn (đến khi người dùng xóa). Chỉ lưu được chuỗi (String).

\`\`\`javascript
// Lưu dữ liệu
localStorage.setItem("username", "nguyenvana");

// Lưu object (phải chuyển thành chuỗi JSON)
const setting = { theme: "dark" };
localStorage.setItem("config", JSON.stringify(setting));

// Lấy dữ liệu
const user = localStorage.getItem("username");

// Lấy object (chuyển ngược lại từ JSON)
const config = JSON.parse(localStorage.getItem("config"));
\`\`\`

**2. SessionStorage**
Tương tự LocalStorage nhưng dữ liệu sẽ mất khi đóng tab trình duyệt.
`,
    example_code: ``,
    language: "javascript",
    readTime: "20 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
  {
    id: 17,
    course_id: 1,
    chap: "Browser APIs",
    title: "Fetch API và AJAX",
    content: `
Fetch API là công cụ hiện đại để gọi API (lấy dữ liệu từ Server) thay thế cho AJAX cũ.

**1. Gọi API (Get Data)**

\`\`\`javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json()) // Chuyển phản hồi về JSON
    .then(data => {
        console.log("Dữ liệu nhận được:", data);
    })
    .catch(error => console.error("Lỗi:", error));
\`\`\`

**2. Sử dụng Async/Await (Khuyên dùng)**
Code sẽ gọn gàng và dễ đọc hơn.

\`\`\`javascript
async function getPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log("Lỗi kết nối API");
    }
}

getPosts();
\`\`\`
`,
    example_code: ``,
    language: "javascript",
    readTime: "35 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  // === Python Control Flow, Functions, Modules, File & OOP (ID 18 - 30) ===
  {
    id: 18,
    course_id: 2,
    chap: "Cấu trúc điều khiển",
    title: "Câu lệnh điều kiện (If - Elif - Else)",
    content: `
Trong lập trình, máy tính cần khả năng ra quyết định dựa trên dữ liệu. Python sử dụng từ khóa \`if\`, \`elif\`, và \`else\` với cú pháp dựa trên **thụt đầu dòng (indentation)**.

**1. Cấu trúc cơ bản**
Nếu điều kiện đúng, khối lệnh thụt vào sẽ được thực thi.

\`\`\`python
age = 20

if age >= 18:
    print("Bạn đủ tuổi xem phim này.")
else:
    print("Bạn chưa đủ tuổi.")
\`\`\`

**2. Kết hợp toán tử Logic**
Sử dụng \`and\`, \`or\`, \`not\` để kiểm tra nhiều điều kiện cùng lúc.

\`\`\`python
has_ticket = True

if age >= 18 and has_ticket:
    print("Mời vào rạp!");
elif age >= 18 and not has_ticket:
    print("Bạn cần mua vé trước.");
else:
    print("Không được phép vào.");
\`\`\`

**3. Mở rộng với elif (Else If)**
Dùng để kiểm tra nhiều trường hợp liên tiếp (ví dụ: xếp loại học lực).

\`\`\`python
score = 8.5

if score >= 9.0:
    print("Xuất sắc")
elif score >= 8.0:
    print("Giỏi")
elif score >= 6.5:
    print("Khá")
else:
    print("Trung bình")
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "15 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },

  {
    id: 19,
    course_id: 2,
    chap: "Cấu trúc điều khiển",
    title: "Vòng lặp For và Hàm range()",
    content: `
Vòng lặp For trong Python hoạt động như một bộ duyệt (iterator), chuyên dùng để duyệt qua các phần tử của một tập hợp (List, String, Range).

**1. Hàm range()**
Tạo ra một dãy số. Cú pháp: \`range(start, stop, step)\`.

\`\`\`python
# In các số từ 1 đến 5 (không bao gồm 6)
for i in range(1, 6):
    print("Lần thứ: " + str(i))

# In số chẵn từ 0 đến 10 (bước nhảy 2)
for i in range(0, 11, 2):
    print(i)
\`\`\`

**2. Duyệt qua Danh sách (List)**
Đây là cách dùng phổ biến nhất của vòng lặp for.

\`\`\`python
fruits = ["Táo", "Cam", "Xoài"]

for fruit in fruits:
    print("Tôi đang ăn: " + fruit)
\`\`\`

**3. Tính tổng (Accumulator)**
Sử dụng vòng lặp để cộng dồn giá trị.

\`\`\`python
total = 0
# Cộng các số từ 0 đến 10
for number in range(11):
    total += number

print("Tổng kết quả:", total) # 55
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "18 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },

  {
    id: 20,
    course_id: 2,
    chap: "Cấu trúc điều khiển",
    title: "Vòng lặp While & Break/Continue",
    content: `
Vòng lặp \`while\` chạy miễn là điều kiện còn đúng (\`True\`). Nó hữu ích khi bạn không biết trước số lần lặp.

**1. Vòng lặp While cơ bản**

\`\`\`python
count = 3
while count > 0:
    print(count)
    count -= 1 # Quan trọng: Phải thay đổi điều kiện để tránh lặp vô tận
print("Happy New Year!")
\`\`\`

**2. Lệnh Break**
Thoát khỏi vòng lặp ngay lập tức, bất kể điều kiện là gì.

\`\`\`python
# Tìm số 5 và dừng lại
for i in range(1, 10):
    if i == 5:
        print("Đã tìm thấy!")
        break
    print(i)
\`\`\`

**3. Lệnh Continue**
Bỏ qua lần lặp hiện tại, nhảy sang lần tiếp theo.

\`\`\`python
# Chỉ in số chẵn (Bỏ qua số lẻ)
for i in range(1, 6):
    if i % 2 != 0: 
        continue # Bỏ qua code bên dưới, quay lại đầu vòng lặp
    print("Số chẵn:", i)
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "15 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  {
    id: 21,
    course_id: 2,
    chap: "Hàm & Module",
    title: "Hàm (Function)",
    content: `
Hàm giúp tái sử dụng mã nguồn. Trong Python, chúng ta dùng từ khóa \`def\`.

**1. Định nghĩa và Gọi hàm**

\`\`\`python
def say_hello(name):
    print(f"Xin chào, {name}!")

say_hello("Sơn Đặng")
say_hello("F8 Learner")
\`\`\`

**2. Hàm có giá trị trả về (Return)**
Hàm có thể tính toán và trả kết quả lại cho nơi gọi nó.

\`\`\`python
def tinh_tong(a, b):
    return a + b

ket_qua = tinh_tong(10, 50)
print("Tổng là:", ket_qua) # 60
\`\`\`

**3. Hàm tính điểm trung bình**

\`\`\`python
def calc_average(math, lit, eng):
    return (math + lit + eng) / 3

print(calc_average(8, 7, 9)) # 8.0
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "20 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  {
    id: 22,
    course_id: 2,
    chap: "Hàm & Module",
    title: "Phạm vi biến (Scope)",
    content: `
Hiểu về **Local** (Cục bộ) và **Global** (Toàn cục) giúp bạn tránh các lỗi logic khó tìm.

**1. Local vs Global**
- Biến tạo trong hàm là Local (chỉ dùng trong hàm đó).
- Biến tạo ngoài hàm là Global (dùng ở đâu cũng được).

\`\`\`python
player_name = "Dragon" # Global

def show_info():
    level = 1 # Local
    print(f"Tên: {player_name}, Level: {level}")

show_info()
# print(level) -> Lỗi! Vì level chỉ tồn tại trong hàm
\`\`\`

**2. Từ khóa Global**
Để thay đổi giá trị biến toàn cục *từ bên trong* một hàm, bạn cần khai báo \`global\`.

\`\`\`python
score = 0

def increase_score():
    global score # Báo cho Python biết ta muốn dùng biến score ở ngoài
    score += 10

increase_score()
print("Điểm mới:", score) # 10
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "15 phút",
    difficulty: "Nâng cao",
    progress: 0,
  },

  {
    id: 23,
    course_id: 2,
    chap: "Hàm & Module",
    title: "Modules và Thư viện",
    content: `
Python nổi tiếng với triết lý "Batteries Included" - Mọi thứ bạn cần đều có sẵn.

**1. Module Math (Toán học)**

\`\`\`python
import math

print(math.pi)       # 3.14159...
print(math.sqrt(16)) # 4.0 (Căn bậc 2)
\`\`\`

**2. Module Random (Ngẫu nhiên)**
Rất hữu ích để làm game hoặc bốc thăm.

\`\`\`python
import random

lucky_num = random.randint(1, 100)
print("Số may mắn:", lucky_num)

items = ["Kiếm", "Cung", "Gậy"]
print("Nhặt được:", random.choice(items))
\`\`\`

**3. Module Datetime (Thời gian)**

\`\`\`python
from datetime import datetime

now = datetime.now()
print("Giờ hiện tại:", now.strftime("%H:%M:%S"))
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "12 phút",
    difficulty: "Cơ bản",
    progress: 0,
  },

  {
    id: 24,
    course_id: 2,
    chap: "Làm việc với dữ liệu",
    title: "Xử lý Chuỗi (Strings)",
    content: `
Python xử lý văn bản cực mạnh. Dưới đây là các kỹ thuật quan trọng nhất.

**1. Làm sạch và Biến đổi**

\`\`\`python
text = "   Xin Chào Python   "

# Xóa khoảng trắng thừa và viết hoa
clean = text.strip().upper()
print(clean) # "XIN CHÀO PYTHON"

# Thay thế từ
msg = "I love Java"
print(msg.replace("Java", "Python"))
\`\`\`

**2. Tách và Gộp (Split & Join)**
Thường dùng khi xử lý dữ liệu CSV.

\`\`\`python
data = "User1,User2,User3"
users = data.split(",") 
print(users) # ['User1', 'User2', 'User3']
\`\`\`

**3. F-String (Format String)**
Cách chèn biến vào chuỗi hiện đại và dễ đọc nhất.

\`\`\`python
name = "Huy"
score = 95

print(f"Học viên {name} đạt {score} điểm.")
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "18 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  {
    id: 25,
    course_id: 2,
    chap: "Làm việc với dữ liệu",
    title: "Đọc và Ghi File",
    content: `
Lưu trữ dữ liệu lâu dài bằng cách ghi ra file. Luôn sử dụng \`with open()\` để file tự động đóng sau khi dùng xong.

**1. Ghi file (Mode 'w')**
Lưu ý: Mode 'w' sẽ xóa sạch nội dung cũ của file.

\`\`\`python
with open('data.txt', 'w', encoding='utf-8') as f:
    f.write("Dòng 1: Hello World\n")
    f.write("Dòng 2: Python rất thú vị\n")
\`\`\`

**2. Ghi nối tiếp (Mode 'a')**
Thêm nội dung vào cuối file mà không xóa dữ liệu cũ.

\`\`\`python
with open('data.txt', 'a', encoding='utf-8') as f:
    f.write("Dòng 3: Được thêm vào sau.\n")
\`\`\`

**3. Đọc file (Mode 'r')**

\`\`\`python
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "20 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  {
    id: 26,
    course_id: 2,
    chap: "Nâng cao",
    title: "Xử lý lỗi (Try - Except)",
    content: `
Giúp chương trình không bị "Crash" khi gặp lỗi (ví dụ: chia cho 0, nhập sai kiểu dữ liệu).

**Cấu trúc Try - Except - Finally**

\`\`\`python
try:
    age = int(input("Nhập tuổi: ")) # Có thể lỗi nếu nhập chữ
    res = 100 / age              # Có thể lỗi nếu nhập 0
    print(f"Kết quả: {res}")

except ValueError:
    print("Lỗi: Bạn phải nhập số!")

except ZeroDivisionError:
    print("Lỗi: Không thể chia cho 0!")

except Exception as e:
    print(f"Lỗi không xác định: {e}")

finally:
    print("Kết thúc xử lý.")
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "15 phút",
    difficulty: "Trung bình",
    progress: 0,
  },

  {
    id: 27,
    course_id: 2,
    chap: "Lập trình hướng đối tượng (OOP)",
    title: "OOP Phần 1: Class và Object",
    content: `
OOP giúp mô hình hóa các vật thể thực tế vào code.
- **Class (Lớp):** Bản thiết kế (Khuôn mẫu).
- **Object (Đối tượng):** Thực thể được tạo ra từ Class.

\`\`\`python
# Định nghĩa Class
class Car:
    brand = "Toyota"
    color = "White"

# Tạo Object
my_car = Car()
my_car.brand = "Mazda" # Thay đổi thuộc tính
my_car.color = "Red"

your_car = Car() # Vẫn giữ giá trị mặc định

print(f"Xe tôi: {my_car.brand} - {my_car.color}")
print(f"Xe bạn: {your_car.brand} - {your_car.color}")
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "20 phút",
    difficulty: "Nâng cao",
    progress: 0,
  },

  {
    id: 28,
    course_id: 2,
    chap: "Lập trình hướng đối tượng (OOP)",
    title: "OOP Phần 2: Hàm khởi tạo (__init__)",
    content: `
Hàm \`__init__\` (Constructor) chạy ngay khi đối tượng được tạo, giúp thiết lập các giá trị ban đầu.
Tham số \`self\` đại diện cho chính đối tượng đang được thao tác.

\`\`\`python
class Student:
    # Hàm khởi tạo
    def __init__(self, name, score):
        self.name = name
        self.score = score

    # Phương thức (Hành động)
    def check_pass(self):
        if self.score >= 5.0:
            return "Đậu"
        return "Trượt"

# Tạo đối tượng với dữ liệu ban đầu
sv1 = Student("Nam", 8.5)
sv2 = Student("Lan", 4.0)

print(f"{sv1.name}: {sv1.check_pass()}") # Nam: Đậu
print(f"{sv2.name}: {sv2.check_pass()}") # Lan: Trượt
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "25 phút",
    difficulty: "Nâng cao",
    progress: 0,
  },

  {
    id: 29,
    course_id: 2,
    chap: "Lập trình hướng đối tượng (OOP)",
    title: "OOP Phần 3: Kế thừa (Inheritance)",
    content: `
Kế thừa cho phép Class con dùng lại code của Class cha.

\`\`\`python
# Class Cha
class Animal:
    def __init__(self, name):
        self.name = name
    
    def eat(self):
        print(f"{self.name} đang ăn...")

# Class Con kế thừa Animal
class Dog(Animal):
    def bark(self):
        print("Gâu gâu!")

# Sử dụng
milu = Dog("Milu")
milu.eat()  # Dùng lại hàm của cha
milu.bark() # Hàm riêng của con
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "20 phút",
    difficulty: "Nâng cao",
    progress: 0,
  },

  {
    id: 30,
    course_id: 2,
    chap: "Tổng kết & Thực hành",
    title: "Project: Quản lý chi tiêu",
    content: `
Chúng ta sẽ tổng hợp kiến thức (List, Dictionary, Function) để làm tool quản lý chi tiêu đơn giản.

**Chức năng:** Thêm khoản chi và xem báo cáo tổng.

\`\`\`python
expenses = []

def add_expense(name, amount):
    item = {"name": name, "amount": amount}
    expenses.append(item)
    print(f"Đã thêm: {name} ({amount}đ)")

def show_report():
    total = 0
    print("\n--- BÁO CÁO ---")
    for item in expenses:
        print(f"- {item['name']}: {item['amount']}đ")
        total += item['amount']
    print(f"TỔNG: {total}đ")

# Chương trình chính
while True:
    print("\n1. Thêm  2. Xem  3. Thoát")
    choice = input("Chọn: ")

    if choice == '1':
        n = input("Tên khoản chi: ")
        a = int(input("Số tiền: "))
        add_expense(n, a)
    elif choice == '2':
        show_report()
    elif choice == '3':
        break
    else:
        print("Sai cú pháp!")
\`\`\`
`,
    example_code: ``,
    language: "python",
    readTime: "30 phút",
    difficulty: "Trung bình",
    progress: 0,
  },
];
