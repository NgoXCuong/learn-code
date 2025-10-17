// src/mock/exercises.js
export const mockExercises = [
  // Bài 1 - Giới thiệu về JavaScript
  {
    id: 1,
    lesson_id: 1,
    title: "Viết chương trình Hello World",
    description:
      "Hãy viết một chương trình JavaScript in ra 'Hello World' trên console.",
    example_code: `console.log("Hello World");`,
    language: "javascript",
  },
  {
    id: 2,
    lesson_id: 1,
    title: "Thử nghiệm biến và hằng số",
    description: "Tạo biến và hằng số, sau đó in giá trị ra console.",
    example_code: `
    let name = "Nguyen";
    const PI = 3.14;
    console.log(name, PI);`,
    language: "javascript",
  },

  // Bài 2 - Biến và Kiểu dữ liệu
  {
    id: 3,
    lesson_id: 2,
    title: "Khai báo biến",
    description: "Khai báo các biến sử dụng var, let, const và in ra console.",
    example_code: `
    var age = 25;
    let name = "An";
    const PI = 3.14;
    console.log(age, name, PI);`,
    language: "javascript",
  },
  {
    id: 4,
    lesson_id: 2,
    title: "Sử dụng các kiểu dữ liệu",
    description:
      "Tạo các biến Number, String, Boolean, Array, Object và in ra console.",
    example_code: `
    let isStudent = true;
    let score = 90;
    let colors = ["red","green","blue"];
    let person = {name:"An", age:20};
    console.log(isStudent, score, colors, person);`,
    language: "javascript",
  },

  // Bài 5 - Làm quen với Python
  {
    id: 5,
    lesson_id: 5,
    title: "In chuỗi ra màn hình",
    description: "Sử dụng print() để in chuỗi 'Hello Python'.",
    example_code: `print("Hello Python")`,
    language: "python",
  },

  // Bài 6 - Biến, Kiểu dữ liệu và Toán tử Python
  {
    id: 6,
    lesson_id: 6,
    title: "Khai báo biến và toán tử",
    description: "Tạo biến số và chuỗi, sau đó thực hiện các phép toán cơ bản.",
    example_code: `
    x = 10
    y = 5
    z = x + y
    print(z)`,
    language: "python",
  },

  // Thêm cho C++ - Bài 9
  {
    id: 7,
    lesson_id: 9,
    title: "Viết chương trình C++ đầu tiên",
    description: "Tạo một chương trình in 'Hello C++' ra màn hình.",
    example_code: `
    #include <iostream>
    using namespace std;
    int main() {
        cout << "Hello C++" << endl;
        return 0;
    }`,
    language: "cpp",
  },

  // Thêm cho Java - Bài 13
  {
    id: 8,
    lesson_id: 13,
    title: "Hello Java",
    description: "Viết chương trình Java in 'Hello Java'.",
    example_code: `
    public class Main {
      public static void main(String[] args) {
          System.out.println("Hello Java");
        }
    }`,
    language: "java",
  },

  // Thêm cho C# - Bài 17
  {
    id: 9,
    lesson_id: 17,
    title: "Hello C#",
    description: "Viết chương trình C# in 'Hello C#'.",
    example_code: `using System;
    class Program {
      static void Main() {
          Console.WriteLine("Hello C#");
            }
          }`,
    language: "csharp",
  },
];
